import { MongoClient, ObjectId } from 'mongodb';

export const getUsers = async userId => {
  const client = new MongoClient(getURI());
  let query = { }, options = { }, data = undefined;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('users');
    
    if (userId) {
      data = await collection.findOne({ _id: ObjectId(userId) });
    } else {
      data = await collection.find(query, options).toArray();
    }
    
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }  

  if (!data) {
    return null;
  }
  
  return mapUserData(data);
};

const getURI = () => `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hhxotqv.mongodb.net/?retryWrites=true&w=majority`;

const mapUserData = users => {
  /* if user data is an array */
  if (users.length > 0) {
    return users.map(user => ({
      first_name: user.first_name, last_name: user.last_name, username: user.username, type: user.type, nfts_owned: user.nfts_owned,
      id: user._id.toString()
    }));
  }

  return {
    first_name: users.first_name, last_name: users.last_name, username: users.username, type: users.type, nfts_owned: users.nfts_owned,
    id: users._id.toString()
  };
};

export const getNFTs = async (nftId, limit) => {
  /* By default, limit is 25 */
  limit = limit ? parseInt(limit) : 25;

  const client = new MongoClient(getURI());
  let data = undefined;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('nfts');
    const lookup = {
      $lookup: {
        from: "users",
        localField: "artist",
        foreignField: "_id",
        as: "artist_info"
      }
    };
    
    if (nftId) {
      data = await collection.aggregate([
        { $match : { _id : ObjectId(nftId) } },
        lookup
    ]).toArray();
    } else {
      data = await collection.aggregate([lookup, { $limit: limit }]).toArray();
    }

    
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }  

  if (!data) {
    return null;
  }

  const nfts = data.map(nft => {
    const artist = nft.artist_info[0];
    return {
      id: nft._id.toString(), description: nft.description, image: nft.image, name: nft.name, price: nft.price,
      artist: { id: artist._id.toString(), first_name: artist.first_name, last_name: artist.last_name, username: artist.username }
    };    
  });  
  return nfts;
};

/* PUT */
export const putNftToUser = async ({ userId, nftId }) => {
  const user = await getUsers(userId);
  if (!user) {
    return { status: 400, message: 'user not found' };
  }

  const nft = await getNFTs(nftId);
  if (!nft) {
    return { status: 400, message: 'NFT not found' };
  }

  /* check if nft doesn't belong to a user */
  const users = await getUsers();
  const owner = users.find(user => {
    for (const nft_owned of user.nfts_owned) {
      if (nft_owned === nftId) {
        return user;
      }
    }
  });

  if (owner && owner.id === userId) {
    return { status: 200, message: 'NFT already belongs to the user' };
  }

  if (owner && owner.id !== userId) {
    return { status: 200, message: 'NFT already belongs to another user' };
  }

  /* nft can now be safely assigned to the user */
  const put = await addNftToUser({ userId, nftId });

  if (put) {
    return { status: 200, user: { ...put }, message: '' };
  }

  return { status: 400, message: 'some error occured' };

};

const addNftToUser = async ({ userId, nftId }) => {
  const client = new MongoClient(getURI());
  let data = null;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const users = db.collection('users');
    
    // create a filter for a user to update
    const filter = { _id: ObjectId(userId) };

    // instruct the method to not create a document if no documents match the filter
    const options = { upsert: false };

    // create a document that appends the nftId to nfts_owned
    const updateDoc = {
      $push: {
        nfts_owned: nftId
      },
    };

    const result = await users.updateOne(filter, updateDoc, options);
    const { modifiedCount } = result;
    
    if (modifiedCount === 1) {
      const user = await getUsers(userId);
      data =  { userId, nfts_owned: user.nfts_owned };
    }
    
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }

  return data;
};

export const verifyToken = async token => {
  const jwksClient = require('jwks-rsa');
  const jwt = require('jsonwebtoken');
  const client = jwksClient({ jwksUri: process.env.AUTH0_JWKSURI });

  const getKey = (header, callback) => {
    client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  };

  const options = { algorithms: ['RS256'] };
  return new Promise(async response => {
    jwt.verify(token, getKey, options, function(err, decoded) {
      if (err) {
        console.log(err);
        return response(null);
      }
      return response(decoded);
    });
  });
};
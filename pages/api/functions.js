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

export const getNFTs = async nftId => {
  const client = new MongoClient(getURI());
  let query = { }, options = { }, data = undefined;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('nfts');
    
    if (nftId) {
      // data = await collection.findOne({ _id: ObjectId(userId) });
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
  
  return mapNFTData(data);
};

const mapNFTData = nfts => {
  /* if nft data is an array */
  if (nfts.length > 0) {
    return nfts.map(nft => ({
      id: nft._id.toString(), description: nft.description, image: nft.image, name: nft.name, price: nft.price
    }));
  }

  // return {
  //   first_name: users.first_name, last_name: users.last_name, username: users.username, type: users.type, nfts_owned: users.nfts_owned,
  //   id: users._id.toString()
  // };
};
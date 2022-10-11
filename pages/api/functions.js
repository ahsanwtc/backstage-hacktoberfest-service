import { MongoClient } from 'mongodb';

export const getUsers = async id => {
  const client = new MongoClient(getURI());
  let query = { }, options = { }, data = undefined;

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('users');
    data = await collection.find(query, options).toArray();

  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }  

  if (id) {
    options = { _id: id };
  } 
  

  return data.map(user => ({
    first_name: user.first_name, last_name: user.last_name, username: user.username, type: user.type, nfts_owned: user.nfts_owned
  }));
};

const getURI = () => `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hhxotqv.mongodb.net/?retryWrites=true&w=majority`;
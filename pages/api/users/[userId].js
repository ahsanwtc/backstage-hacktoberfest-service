import { getUsers } from '../functions';

export default async function handler(req, res) {
  const { query: { userId }, method } = req;
  
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);      
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const user = await getUsers(userId);

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.status(200).json({ user });
}
import { getUsers } from '../functions';

export default async function handler(req, res) {
  const { method } = req;
  let message = '';

  switch (method) {
    case 'GET': {
      const users = await getUsers();
      if (users) {
        return res.status(200).json({ users, message });
      }
      return res.status(400).json({ message: 'not found' });
    }
    default:
      res.setHeader('Allow', ['GET']);      
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

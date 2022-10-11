import { getUsers } from '../functions';

export default async function handler(req, res) {
  let message = '';

  switch (req.method) {
    case 'GET': {
      const users = await getUsers();
      if (users) {
        return res.status(200).json({ users, message });
      }
      return res.status(400).json({ message: 'not found' });
    }
    default:
      return res.status(404).json({ message: 'invalid request' });
  }
}

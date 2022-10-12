import { getUsers, putNftToUser } from '../functions';

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
    case 'PUT': {
      const { body: { userId, nftId }} = req;

      if (!userId || !nftId) {
        return res.status(400).json({ message: 'invalid request' });
      }

      const updated = await putNftToUser({ userId, nftId });
      return res.status(updated.status).json({ user: updated.user, message: updated.message });
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

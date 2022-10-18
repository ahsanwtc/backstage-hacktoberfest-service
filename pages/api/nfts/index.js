import { getNFTs } from '../functions';

export default async function handler(req, res) {
  const { method, query: { limit }} = req;
  let message = '';

  switch (method) {
    case 'GET': {
      const nfts = await getNFTs(undefined, limit);
      if (nfts) {
        return res.status(200).json({ nfts, message });
      }
      return res.status(400).json({ message: 'not found' });
    }
    default:
      res.setHeader('Allow', ['GET']);      
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
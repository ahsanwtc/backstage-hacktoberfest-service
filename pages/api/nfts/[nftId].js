import { getNFTs } from '../functions';

export default async function handler(req, res) {
  const { query: { nftId }, method } = req;
  
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);      
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const nft = await getNFTs(nftId);

  if (!nft) {
    return res.status(404).json({
      status: 404,
      message: 'Not Found'
    });
  }

  return res.status(200).json({ nft });
}
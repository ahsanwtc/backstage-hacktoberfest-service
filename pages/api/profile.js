import { auth } from 'express-oauth2-jwt-bearer';

// import { getUsers } from '../functions';

export default async function handler(req, res) {
  const checkJwt = auth({
    audience: 'http://localhost:3000/api/',
    issuerBaseURL: `https://ahsanwtc.eu.auth0.com/`,
  });

  const token = await checkJwt();
  console.log(token);
  
  // const { query: { userId }, method } = req;
  
  // if (method !== 'GET') {
  //   res.setHeader('Allow', ['GET']);      
  //   return res.status(405).end(`Method ${method} Not Allowed`);
  // }

  // const user = await getUsers(userId);

  // if (!user) {
  //   return res.status(404).json({
  //     status: 404,
  //     message: 'Not Found'
  //   });
  // }

  // return res.status(200).json({ user });
  return res.status(200).json({ message: 'ok' });
}

/**
 * https://auth0.com/docs/api/authentication#login
 * https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow
 */
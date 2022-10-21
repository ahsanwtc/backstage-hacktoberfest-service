import { verifyToken, getUsers } from './functions';

export default async function handler(req, res) {
  const { query: { access_token }} = req;
  const decoded = await verifyToken(access_token);
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!decoded) {
    return res.status(400).json({ message: 'invalid token' });
  }

  const { sub } = decoded;
  
  const user = await getUsers(sub);

  return res.status(200).json({ user });
}

/**
 * https://auth0.com/docs/api/authentication#login
 * https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow
 * https://ahsanwtc.eu.auth0.com/login?state=authorization-code&client=LpfwDeMU9OectsdzuYBroOVQmyuAU6wr&protocol=oauth2&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=openid%20profile%20email&audience=mongo-db-auth
 */
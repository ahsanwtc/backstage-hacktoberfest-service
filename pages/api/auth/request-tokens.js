export default async function handler(req, res) {
  const { query: { code }, method } = req;
  
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);      
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!code) {
    return res.status(405).end(`Grant code missing`);
  }

  const body = {
    grant_type: "authorization_code",
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code,
    redirect_uri: "http://localhost:3000/api/auth/callback"
  };

  try {
    const result = await fetch('https://ahsanwtc.eu.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const response = await result.json();
    const { access_token, error } = response;

    if (error) {
      return res.status(500).json({ error, message: response.error_description });
    }

    return res.status(200).json({ access_token }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error }); 
  }
};
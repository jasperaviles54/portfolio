export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { email, message } = req.body;
    console.log('Received:', email, message);
    res.status(200).json({ success: true, message: 'Message received!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

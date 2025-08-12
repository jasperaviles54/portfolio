export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body;
    console.log('Received:', email, message);
    res.status(200).json({ success: true, message: 'Message received!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

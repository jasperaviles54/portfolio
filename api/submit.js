export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://jasperaviles54.github.io");
  res.setHeader("Access-Control-Allow-Origin", "portfolio-opal-zeta-50.vercel.app");
  res.setHeader("Access-Control-Allow-Origin", "https://portfolio-git-main-jasper-aviles-projects.vercel.app");
  res.setHeader("Access-Control-Allow-Origin", "https://portfolio-akrn7yrk0-jasper-aviles-projects.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === 'POST') {
    const { email, message } = req.body;
    console.log('Received:', email, message);
    res.status(200).json({ success: true, message: 'Message received!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
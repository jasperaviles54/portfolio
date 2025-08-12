export default function handler(req, res) {
  const allowedOrigins = [
    "https://jasperaviles54.github.io",
    "https://portfolio-opal-zeta-50.vercel.app",
    "https://portfolio-git-main-jasper-aviles-projects.vercel.app",
    "https://portfolio-akrn7yrk0-jasper-aviles-projects.vercel.app"
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight response
  }

  if (req.method === "POST") {
    const { email, message } = req.body;
    console.log("Received:", email, message);
    return res.status(200).json({ success: true, message: "Message received!" });
  }

  res.status(405).json({ error: "Method not allowed" });
}

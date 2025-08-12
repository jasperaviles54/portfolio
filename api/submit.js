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

  // ✅ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ✅ Handle POST request
  if (req.method === "POST") {
    const { email, message } = req.body;
    console.log("Received:", email, message);
    res.status(200).json({ success: true, message: "Message received!" });
    return;
  }

  // ❌ Method not allowed
  res.status(405).json({ error: "Method not allowed" });
}

export default async function handler(req, res) {
  const allowedOrigin = "https://jasperaviles54.github.io";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(204).end(); // No content
    return;
  }

  if (req.method === "POST") {
    try {
      const { email, message } = req.body;

      if (!email || !message) {
        return res.status(400).json({ error: "Missing email or message" });
      }

      const { error } = await supabase
        .from("submissions")
        .insert([{ email, message, timestamp: new Date().toISOString() }]);

      if (error) throw error;

      res.setHeader("Access-Control-Allow-Origin", allowedOrigin); // Repeat for POST response
      res.status(200).json({ success: true, message: "Message received!" });
    } catch (err) {
      console.error("Supabase insert failed:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

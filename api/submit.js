import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://jasperaviles54.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.setHeader("Content-Length", "0");
    res.setHeader("Vary", "Origin");
    return res.status(204).end();
  }

  if (req.method === "POST") {
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({ error: "Invalid content type" });
    }

    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Missing email or message" });
    }

    try {
      const { error } = await supabase
        .from("submissions")
        .insert([{ email, message, timestamp: new Date().toISOString() }]);

      if (error) throw error;

      res.status(200).json({ success: true, message: "Message received!" });
    } catch (failed) {
      console.error("Supabase insert failed:", failed.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

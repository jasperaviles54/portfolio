import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Lightweight query to keep the Supabase project active.
// Triggered by Vercel Cron every 5 days (well within the 7-day window).
export default async function handler(req, res) {
  // Only allow Vercel Cron to call this endpoint
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { count, error } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return res.status(200).json({
      ok: true,
      message: "Supabase is alive",
      submissions: count,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Keep-alive failed:", err.message);
    return res.status(500).json({ error: "Keep-alive failed", detail: err.message });
  }
}

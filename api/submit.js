import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── In-memory rate limiter (5 submissions per hour per IP) ──
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipLog.get(ip);

  if (!entry) {
    ipLog.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Window expired — reset
  if (now - entry.firstRequest > RATE_WINDOW_MS) {
    ipLog.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Within window — check count
  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://jasperaviles54.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { email, message, website } = req.body;

    // ── Honeypot check — bots fill this hidden field, humans never see it ──
    if (website) {
      // Silently accept so bots think it worked
      return res.status(200).json({ success: true, message: "Message received!" });
    }

    // ── Rate limiting ──
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim()
             || req.socket?.remoteAddress
             || "unknown";

    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many submissions. Please try again later." });
    }

    // ── Input validation ──
    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required." });
    }

    console.log("Received:", email, message);
    try {
      const { error } = await supabase
        .from("submissions")
        .insert([{ email, message, timestamp: new Date().toISOString() }]);

      if (error) throw error;

      try {
        const notifyTo = process.env.NOTIFY_TO_EMAIL;
        if (notifyTo && process.env.RESEND_API_KEY) {
          await resend.emails.send({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: notifyTo,
            subject: `New message from ${email}`,
            text: [
              `From: ${email}`,
              `Date: ${new Date().toISOString()}`,
              ``,
              `Message:`,
              message
            ].join("\n")
          });
        }
      } catch (emailError) {
        console.error("Email notification failed:", emailError.message);
      }

      res.status(200).json({ success: true, message: "Message received!" });
    } 
  
    catch (failed) {
      console.error("Supabase insert failed:", failed.message);
      res.status(500).json({ error: "Internal server error" });
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
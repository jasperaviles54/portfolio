const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const DEPLOYMENT_URL = "https://your-project.vercel.app"; // Replace with your actual URL
const LOG_DIR = path.join(__dirname, "logs");
const INTERVAL = 5 * 60 * 1000; // 5 minutes

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

function fetchLogs() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logFile = path.join(LOG_DIR, `logs_${timestamp}.json`);

  exec(`vercel logs ${DEPLOYMENT_URL} --json`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error fetching logs:", error);
      return;
    }

    try {
      const logs = stdout
        .split("\n")
        .map(line => line.trim())
        .filter(line => line)
        .map(line => JSON.parse(line));

      const extracted = logs
        .map(log => {
          const { email, message } = log?.payload?.body || {};
          if (email && message) {
            return { email, message, timestamp: log.timestamp };
          }
          return null;
        })
        .filter(entry => entry !== null);

      if (extracted.length > 0) {
        fs.writeFileSync(logFile, JSON.stringify(extracted, null, 2));
        console.log(`✅ Saved ${extracted.length} entries to ${logFile}`);
      } else {
        console.log("⚠️ No matching entries found.");
      }
    } catch (parseError) {
      console.error("Failed to parse logs:", parseError);
    }
  });
}

setInterval(fetchLogs, INTERVAL);
fetchLogs(); // Run immediately on start

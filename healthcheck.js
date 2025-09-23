// Simple HTTP healthcheck. Can be extended to check DB, uptime, etc.
import http from 'http';

const port = Number(process.env.PORT || process.env.CLIENT_PORT || process.env.SERVER_PORT || 3000);
const path = process.env.HEALTHCHECK_PATH || '/health';
const timeoutMs = Number(process.env.HEALTHCHECK_TIMEOUT_MS || 5000);

function check() {
  const req = http.get({ host: 'localhost', port, path }, (res) => {
    // Expect 200 OK by default (matches previous inline check)
    if (res.statusCode === 200) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  });

  req.setTimeout(timeoutMs, () => {
    req.destroy(new Error('Healthcheck timeout'));
  });

  req.on('error', () => process.exit(1));
}

check();

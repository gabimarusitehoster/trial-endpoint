
const express = require('express');
const https   = require('https');
const fetch   = require('node-fetch');
const app     = express();
const PORT    = process.env.PORT || 3000;

// ——— CONFIG —————————————————————————————————————————————
const EXPIRATION_DATE = '2025-07-01T00:00:00Z';
const SELF_URL        = process.env.SELF_URL
                      || 'https://trial-endpoint.onrender.com/trial'; // ← update
// Base URL for waifu.pics NSFW endpoint  
const WAIFU_API_BASE  = 'https://api.waifu.pics/nsfw/waifu';  //[43dcd9a7-70db-4a1f-b0ae-981daa162054](https://publicapi.dev/waifu-pics-api?citationMarker=43dcd9a7-70db-4a1f-b0ae-981daa162054 "1")
// ——————————————————————————————————————————————————————————

app.get('/', (_req, res) => {
  res.send(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Kunle Trial & API</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link 
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
    rel="stylesheet" 
    integrity="sha384-…"
    crossorigin="anonymous">
</head>
<body class="bg-light">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Kunle Trial & APIS</a>
    </div>
  </nav>
  <main class="container py-5">
    <h1 class="mb-4">Welcome to Kunle APIS & Trial Controller</h1>
    <p>This service provides:</p>
    <ul>
      <li><code>/trial</code> → JSON with your trial expiration date</li>
      <li><code>/waifu</code> → JSON with a random SFW waifu image URL</li>
    </ul>
    <div class="mt-5">
      <h2>Try it out</h2>
      <p><a href="/trial" class="btn btn-outline-primary me-2">View Trial</a>
         <a href="/waifu" class="btn btn-outline-success">Fetch Waifu</a>
      </p>
    </div>
  </main>
  <footer class="text-center text-muted py-3">
    🔗 <a href="https://github.com/gabimaru-dev">GitHub</a> · 
    <a href="https://wa.me/2349012834275">WhatsApp</a>
  </footer>
</body>
</html>
  `);
});

app.get('/trial', (_req, res) => {
  res.json({ expiration: EXPIRATION_DATE });
});

app.get('/waifu', async (_req, res) => {
  try {
    const apiRes = await fetch(WAIFU_API_BASE);
    if (!apiRes.ok) throw new Error(`Status ${apiRes.status}`);
    const { url } = await apiRes.json();
    res.json({ url });
  } catch (err) {
    console.error('❌ Waifu API error:', err);
    res.status(502).json({ error: 'Could not fetch waifu' });
  }
});

app.listen(PORT, () => {
  console.log(`📡 Trial API live: http://localhost:${PORT}/trial`);
  console.log(`🌐 Homepage:          http://localhost:${PORT}/`);
});

// Uptiming logic
setInterval(() => {
  https.get(SELF_URL)
    .on('response', r => {
      console.log(`🟢 Self-ping @ ${new Date().toISOString()} | ${r.statusCode}`);
    })
    .on('error', e => {
      console.error('🔴 Self-ping failed:', e.message);
    });
}, 14 * 60 * 1000);

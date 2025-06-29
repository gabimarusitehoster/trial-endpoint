const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Update this whenever you like 
const expirationDate = '2025-07-01T00:00:00Z';

app.get('/trial', (req, res) => {
  res.json({ expiration: expirationDate });
});

app.listen(port, () => {
  console.log(`📡 Trial endpoint live at http://localhost:${port}/trial`);
});

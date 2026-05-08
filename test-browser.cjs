const { chromium } = require('playwright');
const { exec } = require('child_process');

(async () => {
  console.log("Starting server...");
  const server = exec('npm run dev');
  
  await new Promise(r => setTimeout(r, 4000));
  
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  console.log("Navigating...");
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  } catch(e) {
    console.log("Navigation error:", e);
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  server.kill();
  console.log("Done.");
  process.exit(0);
})();

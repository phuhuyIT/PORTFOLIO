import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BUDGET = {
  initialJsGzip: 200, // Hard limit in KB
  threeJsGzip: 300,   // Hard limit in KB (estimated from plan)
};

function getGzipSize(filePath) {
  try {
    const output = execSync(`gzip -c ${filePath} | wc -c`).toString();
    return parseInt(output.trim()) / 1024;
  } catch (e) {
    return 0;
  }
}

const distPath = path.resolve('dist/assets');
if (!fs.existsSync(distPath)) {
  console.error('Dist path not found. Run npm run build first.');
  process.exit(1);
}

const files = fs.readdirSync(distPath);
const indexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const threeVendorJs = files.find(f => f.startsWith('three-vendor-') && f.endsWith('.js'));

console.log('--- Performance Budget Check ---');

if (indexJs) {
  const size = getGzipSize(path.join(distPath, indexJs));
  console.log(`Initial JS (Gzip): ${size.toFixed(2)} KB (Limit: ${BUDGET.initialJsGzip} KB)`);
  if (size > BUDGET.initialJsGzip) {
    console.error('❌ Initial JS exceeds budget!');
  } else {
    console.log('✅ Initial JS within budget.');
  }
}

if (threeVendorJs) {
  const size = getGzipSize(path.join(distPath, threeVendorJs));
  console.log(`Three.js Vendor (Gzip): ${size.toFixed(2)} KB (Limit: ${BUDGET.threeJsGzip} KB)`);
  if (size > BUDGET.threeJsGzip) {
    console.error('❌ Three.js Vendor exceeds budget!');
  } else {
    console.log('✅ Three.js Vendor within budget.');
  }
}

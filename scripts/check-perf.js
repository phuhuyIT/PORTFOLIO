import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BUDGET = {
  initialJsGzip: 200, // Hard limit in KB
  threeJsGzip: 300,   // Hard limit in KB (estimated from plan)
  toneJsGzip: 80,
  howlerJsGzip: 30, // Rough estimate
  maxAssetSize: 150, // Hard limit for any single image asset in KB
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
const toneJs = files.find(f => f.startsWith('tone-') && f.endsWith('.js'));
const howlerJs = files.find(f => f.startsWith('howler-') && f.endsWith('.js'));

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

if (toneJs) {
  const size = getGzipSize(path.join(distPath, toneJs));
  console.log(`Tone.js (Gzip): ${size.toFixed(2)} KB (Limit: ${BUDGET.toneJsGzip} KB)`);
  if (size > BUDGET.toneJsGzip) {
    console.error('❌ Tone.js exceeds budget!');
  } else {
    console.log('✅ Tone.js within budget.');
  }
}

if (howlerJs) {
  const size = getGzipSize(path.join(distPath, howlerJs));
  console.log(`Howler.js (Gzip): ${size.toFixed(2)} KB (Limit: ${BUDGET.howlerJsGzip} KB)`);
  if (size > BUDGET.howlerJsGzip) {
    console.error('❌ Howler.js exceeds budget!');
  } else {
    console.log('✅ Howler.js within budget.');
  }
}

console.log('\n--- Asset Size Check ---');
const assetsPath = path.resolve('src/assets');
if (fs.existsSync(assetsPath)) {
  const assets = fs.readdirSync(assetsPath);
  assets.forEach(asset => {
    if (asset.endsWith('.png') || asset.endsWith('.jpg') || asset.endsWith('.webp')) {
      const stats = fs.statSync(path.join(assetsPath, asset));
      const sizeKB = stats.size / 1024;
      console.log(`${asset}: ${sizeKB.toFixed(2)} KB (Limit: ${BUDGET.maxAssetSize} KB)`);
      if (sizeKB > BUDGET.maxAssetSize) {
        console.error(`❌ ${asset} exceeds budget! Consider converting to WebP or compressing.`);
      } else {
        console.log(`✅ ${asset} within budget.`);
      }
    }
  });
}

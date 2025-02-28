const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "../src");
const buildDir = path.join(__dirname, "../build");

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Read index.html from src
const indexPath = path.join(srcDir, "index.html");
let indexHtml = fs.readFileSync(indexPath, "utf-8");

// Find and replace partials
const partialRegex = /<div id="import-partial-([a-zA-Z0-9-]+)"><\/div>/g;
indexHtml = indexHtml.replace(partialRegex, (match, section) => {
  const partialPath = path.join(srcDir, `partials/section-${section}.html`);

  if (fs.existsSync(partialPath)) {
    console.log(`Injecting ${partialPath}...`);
    return fs.readFileSync(partialPath, "utf-8");
  } else {
    console.warn(`Warning: ${partialPath} not found. Keeping placeholder.`);
    return match; // Keep placeholder if partial is missing
  }
});

// Save modified index.html to build directory
// const buildIndexPath = path.join(buildDir, "index.html");
// fs.writeFileSync(buildIndexPath, indexHtml);
// console.log("✅ Build complete: index.html generated in build/");

// Save a copy to src/index-live.html
const liveIndexPath = path.join(srcDir, "index-live.html");
fs.writeFileSync(liveIndexPath, indexHtml);
console.log("✅ Live version saved: index-live.html generated in src/");

// Function to copy static assets
function copyAssets(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyAssets(srcPath, destPath); // Recursively copy folders
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copy assets (CSS, JS, images, etc.)
const assets = ["images", "css", "js", "fonts"]; // Add other asset folders if needed
assets.forEach((folder) => {
  const assetSrc = path.join(srcDir, folder);
  const assetDest = path.join(buildDir, folder);
  
  if (fs.existsSync(assetSrc)) {
    copyAssets(assetSrc, assetDest);
    console.log(`✅ Copied ${folder}/ to build/${folder}/`);
  } else {
    console.warn(`⚠️  Warning: ${folder}/ not found in src/. Skipping.`);
  }
});

console.log("🎉 Build process complete!");
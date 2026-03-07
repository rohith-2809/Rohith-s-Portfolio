import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Target sizes are roughly 2x the displayed dimensions reported by Lighthouse to ensure crispness on retina screens
const images = [
  { name: 'Docker.webp', width: 336, height: 190 },
  { name: 'Node.js_logo.svg.webp', width: 168, height: 102 },
  { name: 'Figma-logo.webp', width: 224, height: 336 },
  { name: 'React.webp', width: 168, height: 168 },
  { name: 'logo.webp', width: 308, height: 256 },
  { name: 'Tailwind_CSS_Logo.webp', width: 336, height: 206 },
  { name: 'gcp.webp', width: 336, height: 190 },
  { name: 'HuggingFace.webp', width: 336, height: 224 },
  { name: 'express-js.webp', width: 168, height: 168 },
];

async function resizeImages() {
  for (const img of images) {
    const inputPath = path.join('public', img.name);
    if (fs.existsSync(inputPath)) {
      try {
        const outputPath = path.join('public', `opt_${img.name}`);
        const buffer = await sharp(inputPath)
          .resize(img.width, img.height, { fit: 'inside', withoutEnlargement: true })
          .toBuffer();
        fs.writeFileSync(outputPath, buffer);
        console.log(`Successfully resized ${img.name} to opt_${img.name}`);
      } catch (err) {
        console.error(`Error resizing ${img.name}:`, err);
      }
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
}

resizeImages();

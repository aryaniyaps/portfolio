import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseGIF, decompressFrames } from 'gifuct-js';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GIF_PATH = join(ROOT, '..', 'bg.gif');
const OUT_DIR = join(ROOT, 'public', 'frames');

function compositeFrames(frames) {
  const dims = frames[0].dims;
  const width = dims.width;
  const height = dims.height;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const composited = [];

  let lastDisposal = 0;
  let savedCanvas = null;

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];

    // Handle previous frame's disposal
    if (lastDisposal === 2) {
      // Restore to background (clear the area)
      if (savedCanvas) {
        ctx.drawImage(savedCanvas, 0, 0);
      }
    } else if (lastDisposal === 3) {
      // Restore to previous
      if (savedCanvas) {
        ctx.drawImage(savedCanvas, 0, 0);
      }
    }

    // Save state before drawing if this frame disposes
    if (frame.disposalType === 2 || frame.disposalType === 3) {
      savedCanvas = createCanvas(width, height);
      savedCanvas.getContext('2d').drawImage(canvas, 0, 0);
    } else {
      savedCanvas = null;
    }

    lastDisposal = frame.disposalType;

    // Draw patch onto main canvas
    const patchCanvas = createCanvas(frame.dims.width, frame.dims.height);
    const patchCtx = patchCanvas.getContext('2d');
    const imgData = patchCtx.createImageData(frame.dims.width, frame.dims.height);
    imgData.data.set(new Uint8ClampedArray(frame.patch));
    patchCtx.putImageData(imgData, 0, 0);

    ctx.drawImage(patchCanvas, frame.dims.left, frame.dims.top);

    // Capture composited frame
    const frameCanvas = createCanvas(width, height);
    frameCanvas.getContext('2d').drawImage(canvas, 0, 0);
    composited.push(frameCanvas);
  }

  return composited;
}

async function main() {
  if (!existsSync(GIF_PATH)) {
    console.error(`GIF not found at ${GIF_PATH}`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  console.log('Parsing GIF...');
  const buf = readFileSync(GIF_PATH);
  const gif = parseGIF(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  const frames = decompressFrames(gif, true);

  console.log(`Total frames: ${frames.length}`);

  const dims = frames[0].dims;
  console.log(`Dimensions: ${dims.width}x${dims.height}`);

  console.log('Compositing frames...');
  const composited = compositeFrames(frames);

  console.log('Exporting frames as PNGs...');
  for (let i = 0; i < composited.length; i++) {
    const pngBuf = composited[i].toBuffer('image/png');
    const padded = String(i + 1).padStart(4, '0');
    const outPath = join(OUT_DIR, `frame_${padded}.png`);
    writeFileSync(outPath, pngBuf);

    if ((i + 1) % 20 === 0 || i === composited.length - 1) {
      console.log(`  Exported ${i + 1}/${composited.length}`);
    }
  }

  const manifest = {
    frameCount: composited.length,
    width: dims.width,
    height: dims.height,
  };
  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Manifest written: ${JSON.stringify(manifest)}`);
  console.log('Done!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
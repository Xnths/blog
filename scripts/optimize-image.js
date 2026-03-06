const sharp = require('sharp')
const fs = require('fs')

async function optimize() {
  const input = '/home/xnths/blog/public/hero-image.png'
  const outWebp = '/home/xnths/blog/public/hero-image.webp'

  if (!fs.existsSync(input)) {
    console.log('No input file')
    return
  }

  // 1. Convert to optimized WebP for Next.js image and Open Graph
  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true }) // reasonable max width for hero
    .webp({ quality: 80, effort: 6 })
    .toFile(outWebp)

  // 2. Overwrite the original PNG with an optimized WebP but named .png? Wait, let's keep it .webp
  // since WEBP is well supported for Open Graph too, or we can save an optimized JPEG.
  const outOg = '/home/xnths/blog/public/hero-image-og.jpg'
  await sharp(input)
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outOg)

  console.log('Optimization complete')
}

optimize().catch(console.error)

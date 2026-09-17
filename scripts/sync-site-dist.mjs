import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const frontendDist = resolve(projectRoot, 'frontend', 'dist')
const sitesDist = resolve(projectRoot, 'dist')

// The root Sites manifest expects dist/. Vercel uses frontend/dist/ directly.
if (sitesDist !== join(projectRoot, 'dist')) {
  throw new Error('Invalid Sites output directory')
}
await stat(join(frontendDist, 'index.html'))
await rm(sitesDist, { recursive: true, force: true })
await mkdir(sitesDist, { recursive: true })
await cp(frontendDist, sitesDist, { recursive: true })
console.log('Copied frontend/dist to dist for Sites hosting.')

import { readdirSync, utimesSync } from 'node:fs'
import { join } from 'node:path'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, type Plugin } from 'vite'

// With SOURCE_DATE_EPOCH set, make the server output byte-reproducible: drop the absolute
// project root that Start embeds in its manifest and pin public-asset mtimes that Nitro records.
function reproducible(epoch = process.env.SOURCE_DATE_EPOCH): Plugin | false {
  if (epoch === undefined) return false
  let root = ''
  return {
    name: 'reproducible',
    configResolved: (config) => void (root = config.root + '/'),
    buildStart() {
      if (this.environment.name !== 'nitro') return
      const publicDir = join(root, '.output/public')
      for (const file of readdirSync(publicDir, { recursive: true, encoding: 'utf8' }))
        utimesSync(join(publicDir, file), +epoch, +epoch)
    },
    renderChunk: (code) => (code.includes(root) ? code.replaceAll(root, '') : null),
  }
}

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tanstackStart(),
    // Traced deps are copied from Bazel's read-only store; make the copies writable.
    nitro({ traceOpts: { chmod: 0o644 } }),
    viteReact(),
    reproducible(),
  ],
})

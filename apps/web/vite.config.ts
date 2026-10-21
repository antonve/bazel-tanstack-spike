import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tanstackStart(),
    // Traced deps are copied from Bazel's read-only store; make the copies writable.
    nitro({ traceOpts: { chmod: 0o644 } }),
    viteReact(),
  ],
})

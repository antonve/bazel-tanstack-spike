// `vite build` for Bazel. The TanStack router plugin regenerates src/routeTree.gen.ts
// during the build; in the sandbox that write is silently dropped, so fail if it differs.
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { createBuilder } from 'vite'

// Sandbox inputs are symlinks into the execroot. Vite resolves them to paths outside src/routes,
// so the router plugin stops treating them as route files (no code splitting). Use real files.
for (const name of readdirSync('src', { recursive: true, encoding: 'utf8' })) {
  const file = `src/${name}`
  if (statSync(file).isDirectory()) continue
  const content = readFileSync(file)
  unlinkSync(file)
  writeFileSync(file, content)
}

const routeTree = 'src/routeTree.gen.ts'
const committed = readFileSync(routeTree, 'utf8')

const builder = await createBuilder({}, null)
await builder.buildApp()

if (readFileSync(routeTree, 'utf8') !== committed) {
  console.error(`${routeTree} is stale. Run \`pnpm build\` or \`pnpm dev\` and commit the result.`)
  process.exit(1)
}

// Nitro stamps the build time into nitro.json; pin it for reproducible output.
const info = JSON.parse(readFileSync('.output/nitro.json', 'utf8'))
info.date = new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000).toJSON()
writeFileSync('.output/nitro.json', JSON.stringify(info, null, 2))

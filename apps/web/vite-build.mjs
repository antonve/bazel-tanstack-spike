// `vite build` for Bazel. The TanStack router plugin regenerates src/routeTree.gen.ts
// during the build; in the sandbox that write is silently dropped, so fail if it differs.
import { readFileSync } from 'node:fs'
import { createBuilder } from 'vite'

const routeTree = 'src/routeTree.gen.ts'
const committed = readFileSync(routeTree, 'utf8')

const builder = await createBuilder({}, null)
await builder.buildApp()

if (readFileSync(routeTree, 'utf8') !== committed) {
  console.error(`${routeTree} is stale. Run \`pnpm build\` or \`pnpm dev\` and commit the result.`)
  process.exit(1)
}

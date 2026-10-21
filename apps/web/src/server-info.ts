import { createMiddleware, createServerFn } from '@tanstack/react-start'

const requestId = createMiddleware({ type: 'function' }).server(({ next }) =>
  next({ context: { requestId: crypto.randomUUID() } }),
)

export const getServerInfo = createServerFn()
  .middleware([requestId])
  .handler(({ context }) => ({
    node: process.version,
    requestId: context.requestId,
    // Only the server bundle may contain this string.
    marker: 'server-only:7f3a',
  }))

import { createCsrfMiddleware, createMiddleware, createStart } from '@tanstack/react-start'
import { setResponseHeader } from '@tanstack/react-start/server'

const poweredBy = createMiddleware().server(({ next }) => {
  setResponseHeader('x-powered-by', 'tanstack-start')
  return next()
})

// Defining start.ts replaces Start's default CSRF protection for server functions, so add it back.
const csrf = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === 'serverFn' })

export const startInstance = createStart(() => ({ requestMiddleware: [csrf, poweredBy] }))

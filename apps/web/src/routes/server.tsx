import { createFileRoute } from '@tanstack/react-router'
import { getServerInfo } from '../server-info'

export const Route = createFileRoute('/server')({
  loader: () => getServerInfo(),
  component: ServerInfo,
})

function ServerInfo() {
  const info = Route.useLoaderData()
  return (
    <main>
      <h1>Server</h1>
      <p>
        Node <span data-testid="node">{info.node}</span>, request{' '}
        <span data-testid="request-id">{info.requestId}</span>
      </p>
    </main>
  )
}

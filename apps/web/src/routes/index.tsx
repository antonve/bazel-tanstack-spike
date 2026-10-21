import { createFileRoute } from '@tanstack/react-router'
import { Badge, greeting } from '@spike/ui'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <h1>{greeting('TanStack Start')}</h1>
      <p>
        Build channel: <Badge>{import.meta.env.VITE_BUILD_CHANNEL ?? 'unset'}</Badge>
      </p>
    </main>
  )
}

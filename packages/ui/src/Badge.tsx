import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span data-ui="badge" style={{ padding: '0 .4em', border: '1px solid', borderRadius: 4 }}>
      {children}
    </span>
  )
}

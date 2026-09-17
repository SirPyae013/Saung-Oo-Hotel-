import { Suspense } from 'react'
import type { ReactNode } from 'react'

export function Page({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="page-loader" role="status">
          <span />
          Preparing your escape…
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

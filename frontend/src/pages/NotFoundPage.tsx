import { Link } from 'react-router-dom'
import { ArrowLeft, Sun } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="container empty-state not-found">
      <Sun size={54} strokeWidth={1} />
      <span className="eyebrow">A SMALL DETOUR · 404</span>
      <h1>
        Let’s get you <em>back home.</em>
      </h1>
      <p>We couldn’t find that page, but a lovely stay is still waiting.</p>
      <Link className="button button-dark" to="/">
        <ArrowLeft size={18} /> Back to Saung Oo
      </Link>
    </div>
  )
}

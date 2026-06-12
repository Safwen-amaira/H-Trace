import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
      <h1 className="text-6xl font-bold gradient-text">404</h1>
      <p className="text-gray-600 dark:text-gold-300/70 mt-4">Page not found</p>
      <Link to="/" className="btn-primary mt-6">Go Home</Link>
    </div>
  )
}

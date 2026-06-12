import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gold-500/10 bg-white dark:bg-gray-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gold-600">
          © {new Date().getFullYear()} H‑Trace. Made with <Heart size={14} className="inline text-red-400" /> in Tunisia.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/login" className="text-sm hover:underline">Login</Link>
          <a href="https://github.com/Safwen-amaira/H-Trace" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

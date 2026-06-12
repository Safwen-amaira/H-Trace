import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Plus, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Events() {
  const { token } = useAuth()
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get('/api/events', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEvents(res.data))
      .catch(console.error)
  }, [token])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
        <Link to="/events/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Event
        </Link>
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gold-300 mb-2">{event.info}</h2>
                <p className="text-sm text-gray-500 dark:text-gold-600">
                  {event.attributes.length} attributes • {new Date(event.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.threat_level === 'high' || event.threat_level === 'critical'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                  : event.threat_level === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
              }`}>
                {event.threat_level}
              </span>
            </div>
            <Link to={`/events/${event.id}`} className="text-gold-500 hover:underline inline-flex items-center mt-4 text-sm">
              View details <ChevronRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

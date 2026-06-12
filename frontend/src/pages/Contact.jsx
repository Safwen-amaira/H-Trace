import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, send to backend or email service
    console.log('Form submitted:', form)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gold-300/70">
          Get in touch with the H‑Trace team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-gold-500" />
            <span className="text-gray-700 dark:text-gold-300">Tunis, Tunisia</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-gold-500" />
            <a href="mailto:contact@h-trace.tn" className="text-gray-700 dark:text-gold-300 hover:underline">
              contact@h-trace.tn
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-gold-500" />
            <span className="text-gray-700 dark:text-gold-300">+216 XX XXX XXX</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {sent && <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded">Message sent!</div>}
          <input type="text" placeholder="Your Name" required value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <input type="email" placeholder="Your Email" required value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <textarea rows="5" placeholder="Your Message" required value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none"
          />
          <button type="submit" className="btn-primary w-full py-3">Send Message</button>
        </form>
      </div>
    </div>
  )
}

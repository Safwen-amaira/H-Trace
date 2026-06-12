import { Shield, Zap, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About H‑Trace</h1>
        <p className="text-lg text-gray-600 dark:text-gold-300/70 max-w-2xl mx-auto">
          Built by Tunisian cybersecurity experts to protect our nation’s digital borders.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card text-center">
          <Shield className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gold-300 mb-2">Our Mission</h2>
          <p className="text-gray-600 dark:text-gold-500/80">
            Provide a collaborative, AI‑powered platform to share threat intelligence among Tunisian organizations.
          </p>
        </div>
        <div className="card text-center">
          <Zap className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gold-300 mb-2">Technology</h2>
          <p className="text-gray-600 dark:text-gold-500/80">
            Microservices architecture, real‑time feeds, and machine learning for accurate threat detection.
          </p>
        </div>
        <div className="card text-center">
          <Globe className="w-12 h-12 text-gold-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-gold-300 mb-2">Community</h2>
          <p className="text-gray-600 dark:text-gold-500/80">
            Join a growing network of SOC analysts, CERT‑TN partners, and security researchers.
          </p>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Shield, Zap, Globe, BarChart3, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <Zap className="w-6 h-6 text-gold-500" />,
    title: 'AI‑Driven Intelligence',
    desc: 'Extract IOCs from Arabic, French, and English reports with our state‑of‑the‑art NLP models.'
  },
  {
    icon: <Globe className="w-6 h-6 text-gold-500" />,
    title: 'Real Threat Feeds',
    desc: 'Integrate AbuseIPDB, URLhaus, PhishTank and many more – all configurable via .env.'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-gold-500" />,
    title: 'Advanced Analytics',
    desc: 'Interactive dashboards, charts, and 3D visualizations to monitor threats in real time.'
  },
  {
    icon: <Shield className="w-6 h-6 text-gold-500" />,
    title: 'Multi‑Tenant Plans',
    desc: 'Free, Pro, and Enterprise tiers with rate limiting and source gating built‑in.'
  }
]

const plans = [
  { name: 'Free', price: '0 DT', features: ['1 Threat Source', '1,000 req/mo', 'Basic IOC Search', 'Community Support'] },
  { name: 'Pro', price: '29 DT/mo', features: ['5 Threat Sources', '10,000 req/mo', 'IOC Export', 'Basic Sharing', 'Priority Support'], popular: true },
  { name: 'Enterprise', price: 'Custom', features: ['All Sources', 'Unlimited Requests', 'Sharing Circles', 'API Access', '24/7 Support'] }
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Tunisia’s <span className="gradient-text">Threat Intelligence</span> Platform
            </h1>
            <p className="text-lg text-gray-600 dark:text-gold-300/80 mb-8 max-w-xl">
              Built by Tunisians, for Tunisians. Monitor, share, and act on cyber threats targeting .tn domains and local infrastructure – powered by AI.
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-4">Get Started Free</Link>
              <Link to="/login" className="px-8 py-4 border border-gray-300 dark:border-gold-500/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-lg">Login</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex-1 flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl shadow-2xl shadow-gold-500/20 flex items-center justify-center">
              <Shield className="w-32 h-32 text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Why H‑Trace?</h2>
            <p className="mt-4 text-gray-600 dark:text-gold-300/70">Designed for Tunisian SOC teams, CERT‑TN, and cybersecurity researchers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="card">
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gold-300">{f.title}</h3>
                <p className="text-gray-600 dark:text-gold-500/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-gray-600 dark:text-gold-300/70">Choose the plan that fits your organization’s needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`relative card flex flex-col ${plan.popular ? 'border-gold-500 ring-2 ring-gold-500/20' : ''}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold mb-2 dark:text-gold-300">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6 dark:text-white">{plan.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-600 dark:text-gold-500/80">
                      <CheckCircle size={16} className="text-gold-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`btn-primary text-center ${plan.popular ? '' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to protect Tunisian cyberspace?</h2>
          <p className="text-gray-800 mb-8">Join hundreds of organizations that trust H‑Trace for threat intelligence.</p>
          <Link to="/register" className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition">Start Free Trial</Link>
        </div>
      </section>
    </>
  )
}

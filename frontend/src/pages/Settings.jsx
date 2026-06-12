import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { CheckCircle } from 'lucide-react'

const plans = [
  { name: 'Free', price: '0 DT', features: ['1 source', '1,000 req/mo', 'Basic IOC search'], plan: 'free' },
  { name: 'Pro', price: '29 DT/mo', features: ['5 sources', '10,000 req/mo', 'IOC export', 'Basic sharing'], plan: 'pro' },
  { name: 'Enterprise', price: 'Custom', features: ['All sources', 'Unlimited requests', 'Sharing circles', 'API access'], plan: 'enterprise' }
]

export default function Settings() {
  const { user, token } = useAuth()
  const [selected, setSelected] = useState(user?.plan)
  const [msg, setMsg] = useState('')

  const upgrade = (plan) => {
    axios.put(`/api/admin/users/${user.id}/plan`, { plan }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => { setSelected(plan); setMsg(`Successfully upgraded to ${plan}!`) })
      .catch(() => setMsg('Upgrade failed.'))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Plan & Billing</h1>
        {msg && <div className="bg-gold-500/10 border border-gold-500/30 text-gold-500 p-4 rounded-lg mb-6">{msg}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.plan} className={`card flex flex-col ${selected === p.plan ? 'border-gold-500 ring-2 ring-gold-500/20' : ''}`}>
              <h3 className="text-2xl font-bold mb-2 dark:text-gold-300">{p.name}</h3>
              <p className="text-4xl font-bold mb-4 dark:text-white">{p.price}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f => <li key={f} className="flex items-center gap-2 text-gray-600 dark:text-gold-500/80"><CheckCircle size={16} className="text-gold-500" />{f}</li>)}
              </ul>
              {selected === p.plan ? (
                <button disabled className="btn-primary opacity-50 cursor-not-allowed">Current Plan</button>
              ) : (
                <button onClick={() => upgrade(p.plan)} className="btn-primary">Upgrade to {p.name}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

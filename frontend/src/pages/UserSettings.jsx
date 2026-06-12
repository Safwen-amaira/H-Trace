import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { CheckCircle } from 'lucide-react'

const plans = [
  { name: 'Free', price: '0 DT', features: ['1 source', '1,000 req/mo', 'Basic IOC search'], plan: 'free' },
  { name: 'Pro', price: '29 DT/mo', features: ['5 sources', '10,000 req/mo', 'IOC export', 'Basic sharing'], plan: 'pro' },
  { name: 'Enterprise', price: 'Custom', features: ['All sources', 'Unlimited requests', 'Sharing circles', 'API access'], plan: 'enterprise' },
]

export default function UserSettings() {
  const { user, token } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(user?.plan)
  const [message, setMessage] = useState('')

  const upgradePlan = (plan) => {
    axios.put('/api/admin/users/' + user.id + '/plan', { plan }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setMessage(`Successfully upgraded to ${plan}! Reload to refresh.`)
      setSelectedPlan(plan)
    }).catch(err => setMessage('Upgrade failed.'))
  }

  return (
    <div className="h-screen bg-dark-950 text-gold-300 flex">
      <aside className="w-64 bg-dark-900 p-6 border-r border-gold-600/20">
        <h1 className="text-2xl font-bold text-gold-400 mb-8">Settings</h1>
        <nav className="space-y-1">
          <a className="flex items-center gap-3 py-2 px-3 rounded bg-dark-800 text-gold-400 border border-gold-500/20">
            Plan & Billing
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-gold-300 mb-6">Choose Your Plan</h2>
        {message && <div className="bg-gold-600/20 border border-gold-500/30 text-gold-300 p-4 rounded-lg mb-6">{message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.plan} className={`bg-dark-900 rounded-xl p-6 border ${selectedPlan === p.plan ? 'border-gold-400 shadow-lg shadow-gold-500/10' : 'border-gold-600/20'} flex flex-col`}>
              <h3 className="text-xl font-bold text-gold-400 mb-2">{p.name}</h3>
              <p className="text-3xl font-bold text-gold-300 mb-4">{p.price}</p>
              <ul className="mb-6 space-y-2 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-gold-500">
                    <CheckCircle size={16} className="text-gold-400" />
                    {f}
                  </li>
                ))}
              </ul>
              {selectedPlan === p.plan ? (
                <button disabled className="mt-auto bg-dark-800 text-gold-600 py-2 rounded border border-gold-600/20 cursor-not-allowed">
                  Current Plan
                </button>
              ) : (
                <button onClick={() => upgradePlan(p.plan)} className="mt-auto bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold py-2 rounded transition">
                  Upgrade to {p.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

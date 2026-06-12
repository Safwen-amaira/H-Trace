import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { CreditCard, CheckCircle } from 'lucide-react'

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
    // In real app, would call payment gateway; here we simulate
    axios.put('/api/admin/users/' + user.id + '/plan', { plan }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setMessage(`Upgraded to ${plan}! Refresh to see changes.`)
      setSelectedPlan(plan)
    })
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex">
      <aside className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-green-400 mb-8">Settings</h1>
        <nav className="space-y-2">
          <a className="block py-2 px-3 rounded bg-gray-800 text-green-300">Plan</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800">Profile</a>
          <a className="block py-2 px-3 rounded hover:bg-gray-800">Security</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">Plan & Billing</h2>
        {message && <div className="bg-green-800 p-4 rounded mb-4">{message}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.plan} className={`bg-gray-900 rounded-xl p-6 border ${selectedPlan === p.plan ? 'border-green-400' : 'border-gray-700'} flex flex-col`}>
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-3xl font-bold mb-4">{p.price}</p>
              <ul className="mb-6 space-y-2">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    {f}
                  </li>
                ))}
              </ul>
              {selectedPlan === p.plan ? (
                <button disabled className="mt-auto bg-gray-700 py-2 rounded">Current Plan</button>
              ) : (
                <button onClick={() => upgradePlan(p.plan)} className="mt-auto bg-green-500 hover:bg-green-600 py-2 rounded font-bold">
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

import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

export default function StaffDashboard() {
  const [apps, setApps] = useState([])

  async function load() {
    const snap = await getDocs(collection(db, 'applications'))
    setApps(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  useEffect(()=>{ load() }, [])

  async function updateStatus(id, status) {
    await updateDoc(doc(db, 'applications', id), { status })
    load()
  }

  return (
    <div className="page text-white space-y-6">

      <h1 className="text-4xl font-bold text-center">Staff Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {apps.map(app => (
          <div key={app.id} className="glass p-6">
            <h2 className="text-xl font-bold">{app.name}</h2>
            <p>Email: {app.email}</p>
            <p>Service: {app.service}</p>
            <p>Status: {app.status}</p>

            <div className="flex gap-3 mt-4">
              <button onClick={()=>updateStatus(app.id,'processing')} className="btn-outline flex-1">
                Processing
              </button>
              <button onClick={()=>updateStatus(app.id,'completed')} className="btn-primary flex-1">
                Completed
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

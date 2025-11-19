import React, { useEffect, useState } from 'react'
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
    <div className='p-10'>

      <h1 className='text-3xl font-bold mb-6'>Staff Dashboard</h1>

      {apps.length === 0 && (
        <p>No applications available.</p>
      )}

      <div className='space-y-4'>
        {apps.map(a => (
          <div key={a.id} className='glass p-6'>
            <h2 className='text-xl font-semibold'>{a.name}</h2>
            <p>Email: {a.email}</p>
            <p>Service: {a.service}</p>
            <p>Details: {a.details}</p>

            <p className='mt-2'><strong>Status:</strong> {a.status}</p>

            <div className='flex gap-2 mt-4'>
              <button onClick={()=>updateStatus(a.id, 'processing')} className='btn-outline flex-1'>
                Mark Processing
              </button>
              <button onClick={()=>updateStatus(a.id, 'completed')} className='btn-primary flex-1'>
                Mark Completed
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

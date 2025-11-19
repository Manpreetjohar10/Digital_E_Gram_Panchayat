import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { db } from '../../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

export default function ApplicationsAdmin() {
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
    <div className='flex'>
      <AdminSidebar active='applications'/>

      <div className='flex-1 p-10'>
        <h1 className='text-3xl font-bold mb-6'>Applications</h1>

        <div className='space-y-4'>
        {apps.length === 0 ? (
          <p className='text-gray-600'>No applications found.</p>
        ) : (
          apps.map(a => (
            <div key={a.id} className='glass p-6'>
              <h2 className='text-xl font-semibold'>{a.name}</h2>
              <p className='text-gray-700'>Email: {a.email}</p>
              <p className='text-gray-700'>Service: {a.service}</p>
              <p className='text-gray-700'>Details: {a.details}</p>

              <div className='mt-4 text-sm'>
                <span className='font-semibold'>Status:</span> {a.status}
              </div>

              <div className='flex gap-2 mt-4'>
                <button onClick={()=>updateStatus(a.id, 'approved')} className='btn-primary flex-1'>
                  Approve
                </button>
                <button onClick={()=>updateStatus(a.id, 'rejected')} className='btn-outline flex-1'>
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
        </div>

      </div>

    </div>
  )
}

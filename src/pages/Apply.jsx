import React, { useState } from 'react'
import { db, auth } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default function Apply() {
  const [form, setForm] = useState({ name:'', email:'', service:'', details:'' })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'applications'), {
        userId: auth.currentUser?.uid || null,
        ...form,
        status:'pending',
        submittedAt: serverTimestamp()
      })

      alert('Application submitted successfully!')
      setForm({ name:'', email:'', service:'', details:'' })
    }
    catch(err) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <div className='glass p-8 max-w-xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Apply for a Service</h1>

      <form onSubmit={submit} className='space-y-4'>

        <input
          className='w-full p-3 border rounded'
          placeholder='Full Name'
          value={form.name}
          onChange={e=>setForm({...form, name:e.target.value})}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Email'
          value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Service Name'
          value={form.service}
          onChange={e=>setForm({...form, service:e.target.value})}
        />

        <textarea
          className='w-full p-3 border rounded'
          placeholder='Details'
          value={form.details}
          onChange={e=>setForm({...form, details:e.target.value})}
        />

        <button className='btn-primary w-full' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>

      </form>
    </div>
  )
}

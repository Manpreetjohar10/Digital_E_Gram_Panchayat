import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [loading, setLoading] = useState(false)

  async function register(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const uid = res.user.uid

      await setDoc(doc(db, 'users', uid), {
        name: form.name,
        email: form.email,
        role: 'citizen'
      })

      alert('Account created successfully!')
      nav('/')
    }
    catch(err) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <div className='glass p-10 max-w-md mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>

      <form onSubmit={register} className='space-y-4'>

        <input
          className='w-full p-3 border rounded'
          placeholder='Full Name'
          value={form.name}
          onChange={e=>setForm({...form, name:e.target.value})}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Email'
          type='email'
          value={form.email}
          onChange={e=>setForm({...form, email:e.target.value})}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Password'
          type='password'
          value={form.password}
          onChange={e=>setForm({...form, password:e.target.value})}
        />

        <button disabled={loading} className='btn-primary w-full'>
          {loading ? 'Creating...' : 'Register'}
        </button>

      </form>
    </div>
  )
}

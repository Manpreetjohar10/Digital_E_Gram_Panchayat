import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function login(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      const uid = res.user.uid

      const snap = await getDoc(doc(db, 'users', uid))
      const role = snap.data()?.role || 'citizen'

      if (role === 'admin') nav('/admin')
      else if (role === 'staff') nav('/staff')
      else nav('/')

    } catch (err) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <div className='glass p-10 max-w-md mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-6'>Login</h1>

      <form onSubmit={login} className='space-y-4'>
        <input
          className='w-full p-3 border rounded'
          placeholder='Email'
          type='email'
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className='w-full p-3 border rounded'
          placeholder='Password'
          type='password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button disabled={loading} className='btn-primary w-full'>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

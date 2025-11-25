import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'' })

  async function register(e) {
    e.preventDefault()
    const res = await createUserWithEmailAndPassword(auth, form.email, form.password)

    await setDoc(doc(db, 'users', res.user.uid), {
      name: form.name,
      email: form.email,
      role: 'citizen'
    })

    nav('/login')
  }

  return (
    <div className="page flex justify-center items-center min-h-screen">
      <div className="glass p-10 w-full max-w-md text-white">

        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        <form onSubmit={register} className="space-y-4">
          <input className="w-full p-3 rounded text-black" placeholder="Name"
            value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />

          <input className="w-full p-3 rounded text-black" placeholder="Email"
            value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />

          <input type="password" className="w-full p-3 rounded text-black" placeholder="Password"
            value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />

          <button className="btn-primary w-full">Register</button>
        </form>

      </div>
    </div>
  )
}

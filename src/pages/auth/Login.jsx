import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login(e) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      nav('/')
    } catch(err) {
      alert(err.message)
    }
  }

  return (
    <div className="page flex justify-center items-center min-h-screen">
      <div className="glass p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={login} className="space-y-4">
          <input
            className="w-full p-3 rounded text-black"
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded text-black"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />

          <button className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  )
}

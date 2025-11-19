import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, role }) {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)

      setUserRole(snap.data()?.role || 'citizen')
      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading) return <div className='text-center p-10'>Loading...</div>

  if (role && userRole !== role) return <Navigate to='/' />

  return children
}

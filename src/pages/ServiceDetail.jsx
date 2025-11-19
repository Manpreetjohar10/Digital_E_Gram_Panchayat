import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function ServiceDetail() {
  const { id } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'services', id))
      setService(snap.data())
    }
    load()
  }, [id])

  if (!service) return <div>Loading...</div>

  return (
    <div className='glass p-8'>
      <h1 className='text-3xl font-bold'>{service.title}</h1>
      <p className='mt-4'>{service.description}</p>

      <div className='mt-6'>
        <Link to='/apply' className='btn-primary'>Apply Now</Link>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { getDocs, collection } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, 'services'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setServices(data)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Available Services</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {services.map(s => (
          <div key={s.id} className='glass p-6'>
            <h2 className='text-xl font-semibold'>{s.title}</h2>
            <p className='text-gray-700 mt-2'>{s.description}</p>

            <div className='mt-4 flex gap-2'>
              <Link to={'/services/' + s.id} className='btn-outline'>View</Link>
              <Link to='/apply' className='btn-primary'>Apply</Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

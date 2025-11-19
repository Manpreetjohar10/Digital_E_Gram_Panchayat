import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function AdminDashboard() {
  const [apps, setApps] = useState([])
  const [services, setServices] = useState([])

  useEffect(() => {
    async function load() {
      const appsSnap = await getDocs(collection(db, 'applications'))
      setApps(appsSnap.size)

      const servSnap = await getDocs(collection(db, 'services'))
      setServices(servSnap.size)
    }
    load()
  }, [])

  return (
    <div className='flex'>
      <AdminSidebar active='dashboard'/>

      <div className='flex-1 p-10'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

          <div className='glass p-6'>
            <h2 className='text-xl font-semibold'>Total Applications</h2>
            <p className='mt-4 text-4xl font-bold text-blue-700'>{apps}</p>
          </div>

          <div className='glass p-6'>
            <h2 className='text-xl font-semibold'>Total Services</h2>
            <p className='mt-4 text-4xl font-bold text-blue-700'>{services}</p>
          </div>

          <div className='glass p-6'>
            <h2 className='text-xl font-semibold'>System Status</h2>
            <p className='mt-4 text-green-600 text-xl'>All Systems Operational</p>
          </div>

        </div>
      </div>

    </div>
  )
}

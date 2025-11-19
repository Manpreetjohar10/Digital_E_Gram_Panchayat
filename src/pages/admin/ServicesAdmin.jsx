import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { db } from '../../firebase'
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'

export default function ServicesAdmin() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState({ title:'', description:'' })

  async function load() {
    const snap = await getDocs(collection(db, 'services'))
    setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  useEffect(() => { load() }, [])

  async function addService() {
    if (!form.title) return alert('Title required')

    await addDoc(collection(db, 'services'), form)
    setForm({ title:'', description:'' })
    load()
  }

  async function remove(id) {
    await deleteDoc(doc(db, 'services', id))
    load()
  }

  return (
    <div className='flex'>
      <AdminSidebar active='services'/>

      <div className='flex-1 p-10'>

        <h1 className='text-3xl font-bold mb-6'>Manage Services</h1>

        <div className='glass p-6 max-w-xl'>
          <h2 className='text-xl font-semibold'>Add New Service</h2>

          <input
            className='w-full p-3 border rounded mt-4'
            placeholder='Service Title'
            value={form.title}
            onChange={e=>setForm({...form, title:e.target.value})}
          />

          <textarea
            className='w-full p-3 border rounded mt-3'
            placeholder='Service Description'
            value={form.description}
            onChange={e=>setForm({...form, description:e.target.value})}
          />

          <button onClick={addService} className='btn-primary mt-4 w-full'>
            Add Service
          </button>
        </div>

        <h2 className='text-2xl font-bold mt-10 mb-4'>Existing Services</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {services.map(s => (
          <div key={s.id} className='glass p-6'>
            <h3 className='text-xl font-semibold'>{s.title}</h3>
            <p className='text-gray-700 mt-2'>{s.description}</p>

            <button
              onClick={()=>remove(s.id)}
              className='btn-outline mt-4 w-full'
            >
              Delete
            </button>
          </div>
        ))}
        </div>

      </div>

    </div>
  )
}

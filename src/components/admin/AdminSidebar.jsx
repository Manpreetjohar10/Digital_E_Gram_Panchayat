import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar({ active }) {
  const menu = [
    { id:'dashboard', label:'Dashboard', to:'/admin' },
    { id:'services', label:'Manage Services', to:'/admin/services' },
    { id:'applications', label:'Applications', to:'/admin/applications' }
  ]

  return (
    <div className='w-64 bg-blue-900 text-white p-6 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6'>Admin Panel</h2>

      {menu.map(m => (
        <Link key={m.id} to={m.to}>
          <div className={
            'p-3 rounded mb-2 cursor-pointer ' +
            (active===m.id ? 'bg-blue-700' : 'hover:bg-blue-800')
          }>
            {m.label}
          </div>
        </Link>
      ))}
    </div>
  )
}

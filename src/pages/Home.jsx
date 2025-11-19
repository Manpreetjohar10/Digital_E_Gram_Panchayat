import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>

      {/* Hero Section */}
      <div className='glass p-10 text-center bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg'>
        <h1 className='text-4xl font-bold text-blue-900'>
          {t('welcome')}
        </h1>
        <p className='mt-4 text-gray-700 max-w-2xl mx-auto'>
          Apply for government services quickly and securely.
        </p>
        <div className='mt-6'>
          <Link to='/services' className='btn-primary text-lg px-6 py-3'>Explore Services</Link>
        </div>
      </div>

      {/* Features Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        <div className='glass p-6'>
          <h3 className='font-bold text-xl'>Online Applications</h3>
          <p className='mt-2 text-gray-700'>Submit forms from anywhere.</p>
        </div>

        <div className='glass p-6'>
          <h3 className='font-bold text-xl'>Track Status</h3>
          <p className='mt-2 text-gray-700'>Check your application progress.</p>
        </div>

        <div className='glass p-6'>
          <h3 className='font-bold text-xl'>Secure Data</h3>
          <p className='mt-2 text-gray-700'>Your information stays protected.</p>
        </div>

      </div>

    </div>
  )
}

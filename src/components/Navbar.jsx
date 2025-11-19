import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()

  return (
    <header className='glass sticky top-0 z-50 p-4 flex justify-between items-center'>
      <Link to='/' className='text-2xl font-bold text-blue-800'>
        E-Gram Panchayat
      </Link>

      <nav className='flex items-center gap-4'>
        <Link to='/services' className='hover:text-blue-700'>{t('services')}</Link>
        <Link to='/apply' className='hover:text-blue-700'>{t('apply')}</Link>
        <Link to='/contact' className='hover:text-blue-700'>{t('contact')}</Link>

        <Link to='/login' className='btn-outline'>{t('login')}</Link>
        <Link to='/register' className='btn-primary'>{t('register')}</Link>

        <select
          className='border rounded p-1'
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value='en'>EN</option>
          <option value='hi'>HI</option>
          <option value='pa'>PA</option>
        </select>
      </nav>
    </header>
  )
}

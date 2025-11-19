import React from 'react'

export default function Contact() {
  return (
    <div className='glass p-10'>
      <h1 className='text-3xl font-bold'>Contact Us</h1>
      <p className='mt-4 text-gray-700'>
        Reach out to the Panchayat office for inquiries.
      </p>

      <h2 className='mt-6 text-xl font-semibold'>Official Document</h2>
      <a
        href='/documents/_Digital E Gram Panchayat .docx.pdf'
        className='text-blue-700 underline'
        download
      >
        Download Panchayat Document
      </a>
    </div>
  )
}

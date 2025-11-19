import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Apply from './pages/Apply'
import Contact from './pages/Contact'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

import AdminDashboard from './pages/admin/AdminDashboard'
import ApplicationsAdmin from './pages/admin/ApplicationsAdmin'
import ServicesAdmin from './pages/admin/ServicesAdmin'

import StaffDashboard from './pages/staff/StaffDashboard'

import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Layout>
      <Routes>

        {/* Citizen Pages */}
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/:id' element={<ServiceDetail />} />
        <Route path='/apply' element={<Apply />} />
        <Route path='/contact' element={<Contact />} />

        {/* Auth Pages */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Admin */}
        <Route path='/admin' element={
          <ProtectedRoute role='admin'>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path='/admin/services' element={
          <ProtectedRoute role='admin'>
            <ServicesAdmin />
          </ProtectedRoute>
        } />

        <Route path='/admin/applications' element={
          <ProtectedRoute role='admin'>
            <ApplicationsAdmin />
          </ProtectedRoute>
        } />

        {/* Staff */}
        <Route path='/staff' element={
          <ProtectedRoute role='staff'>
            <StaffDashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </Layout>
  )
}

import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../assets/css/registration.css'
import RegistrationNavbar from './RegistrationNavbar'

export default function RegistrationLayout() {
  return (
    <div className='body w-full h-fit'>
      <div className='w-full flex flex-col items-center justify-center backdrop-blur-sm bg-green-300/20'>
        <RegistrationNavbar/>
        <Outlet/>
      </div>
    </div>
  )
}

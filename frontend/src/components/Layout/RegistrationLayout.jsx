import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../assets/css/registration.css'
import RegistrationNavbar from './RegistrationNavbar'
import bg from '../../../public/undraw_country_side_re_0dou.svg'

export default function RegistrationLayout() {
  return (
    <div className='body w-full bg-gray-100'>
      <div className='w-full'>
        <RegistrationNavbar/>
        <div className='grid grid-cols-2'>
          <div className='h-full w-full'>
            <img src={bg} alt="" className='h-[550px] w-[500px] fixed right-[60%] top-[20%]'/>
          </div>
          <Outlet/>
        </div>
        
      </div>
    </div>
  )
}

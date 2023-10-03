import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {FiShoppingCart, FiEye,FiUserPlus, FiHome, FiArchive, FiAnchor, FiUsers } from "react-icons/fi";
import RecentlyAdded from '../components/RecentlyAdded';
import { useStateContext } from '../Context/ContextProvider';
import axiosClient from '../axiosClient';
import Widgets from './Reports/Components/Widgets';
import Menu from '../components/Menu';
import Announcements from './Announcement/Announcements';

export default function Dashboard() {

  const [numberData, setNumberData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useStateContext();
  const link = '/get-passengers'
  const announcementLink = '/announcement/published/'
  const title = 'Requests'

  useEffect(() =>{
    axiosClient.get('/dashboard')
      .then(({data}) => {
        setNumberData(data.numberData)
      })
      .catch(() => {
        alert("Server Error! Please Try Again Later!")
      })
  }, [loading])

  return (
    <div>
     
      {user.role === 'admin' ? <>
        <h1 className='text-xl mb-4 font-bold tracking-wide'>Dashboard</h1>
        <div className='dashboard grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-2 mb-5' id='dashboard_widgets'>

          <div className='bg-white shadow-md border-b-2 border-sky-500 px-3 py-2 flex flex-col grid_dashboard'>

            <div className='flex gap-2'>
              <span className='text-sky-500 title text-lg font-medium'>
                <FiUserPlus/>
              </span>
              <h1 className='title text-lg'>Barangays</h1>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-xl font-sm text_number font-medium tracker-wide'>{numberData.barangays}</span>
              <Link to={'/dashboard'} className='text-sky-500'><FiEye/></Link>
            </div>
          </div>

          <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col grid_dashboard'>
              <div className='flex gap-2'>
                <span className='text-yellow-500 title text-lg font-medium'>
                  <FiUserPlus/>
                </span>
                <h1 className='title text-lg'>Departments</h1>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-xl font-sm text_number font-medium tracker-wide'>{numberData.departments}</span>
                <Link to={'/dashboard'} className='text-yellow-500'><FiEye/></Link>
              </div>
          </div>

          <div className='bg-white shadow-md border-b-2 border-red-500 px-3 py-2 flex flex-col grid_dashboard'>
              <div className='flex gap-2'>
                <span className='text-red-500 title text-lg font-medium'>
                  <FiUserPlus/>
                </span>
                <h1 className='title text-lg'>Seniors</h1>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-xl font-sm text_number font-medium tracker-wide'>{numberData.seniors}</span>
                <Link to={'/dashboard'} className='text-red-500'><FiEye/></Link>
              </div>
          </div>

          <div className='bg-white shadow-md border-b-2 border-pink-500 px-3 py-2 flex flex-col grid_dashboard'>
            <div className='flex gap-2'>
                <span className='text-pink-500 title text-lg font-medium'>
                  <FiUserPlus/>
                </span>
                <h1 className='title text-lg'>Admins</h1>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-xl font-sm text_number font-medium tracker-wide'>{numberData.admins}</span>
                <Link to={'/dashboard'} className='text-pink-500'><FiEye/></Link>
              </div>
            </div>
        </div>
      </> : null}

      {user.role === 'admin' || user.role === 'barangay' ? <>
        <RecentlyAdded link={link} title={title}/>

        <div className='mt-5'>
          <Announcements
            link={announcementLink}
          />
        </div>
      </> : null}


      {user.role === 'admin' ? <>
      <div class="mt-3">
        <Widgets/>
      </div>
      </> : null}

      {user.role === 'department' || user.role === 'department_staff' ? <>
        <Menu/>

      </> : null}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Navigate ,Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import { useStateContext } from '../../Context/ContextProvider'
import axiosClient from '../../axiosClient';
import { ToastContainer, toast } from 'react-toastify';

export default function MainLayout() {
  const {user_token, setUser, user, passengers, setPassengers, notification} = useStateContext();
  const [loading, setLoading] = useState(true);

   

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
        setLoading(false)
      })
  }, [loading])

  return (
    <div>

        {loading ? 
          <div className='flex items-center justify-center'>
            <dotlottie-player 
             style={{width: "300px", height: "300px"}}
             src="https://lottie.host/94c197c5-081c-41f0-a6e0-cc8938fbfbc6/HtchuuwPvF.json"
             background="transparent" speed="1" 
             loop autoplay></dotlottie-player>
          </div> :

          <>
            <SideBar user={user}>
              <Outlet/>
            </SideBar>
            <ToastContainer/>
          </>
        }

        
      
    </div>
  )
}

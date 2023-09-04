import React, { useState } from 'react'
import * as FaIcon from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axiosClient from '../../axiosClient';
import withReactContent from 'sweetalert2-react-content'

export default function StaffHeaderProfiletab({tab, user}) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const approve = () => {
    Swal.fire({
      title: 'Approve Registration?',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: 'red',
    }).then((result) => {
     
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        setLoading(true)

        axiosClient.put(`/approve-registration?id=${passenger.id}`)
          .then(({response}) => {
            setLoading(false)
            console.log(response)
            // Swal.fire('Registration approved successfully', '', 'success')

            Swal.fire({
              title: 'Registration approved successfully',
              icon: 'success',
              confirmButtonColor: '#4f46e5',
            }).then((result) => {
              if(result.isConfirmed){
                window.location.reload()
              }
            })

          })
          .catch(error => {
            setLoading(false)
            Swal.fire('There was an error, please try again later!', '', 'error')
          })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  const loadingToast = (title) => {
    Swal.fire({
      title: title,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  if(loading){     
    loadingToast('Processing...')
  }

  return (
    <div className='border-b border-gray-200 w-full mt-[100px] px-[100px]'>
        <ul className='flex gap-7 text-md font-medium text-gray-500 uppercase'>
            <li className={(tab == 'details' && 'border-b-4 border-black') + ' tracker-wider py-3'}><Link to={`/staff/profile/${user.id}/details`}>Staff Details</Link></li>
            <li className={(tab == 'history' && 'border-b-4 border-black') + ' tracker-wider py-3'}><Link to={`/staff/profile/${user.id}/history`}>History</Link></li>
        </ul>
    </div>
  )
}

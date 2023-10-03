import React, { useState } from 'react'
import * as FaIcon from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axiosClient from '../../axiosClient';
import withReactContent from 'sweetalert2-react-content'
import UpdateAdminModal from '../../view/Staff/Components/Modals/UpdateAdminModal';

export default function StaffHeaderProfiletab({tab, user, handleLoading}) {

  const [loading, setLoading] = useState(false)
  const [editProfileModal, setEditProfileModal] = useState(false)
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

  const handleHideModal = () => {
    setEditProfileModal(false)
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
            <li className={(tab == 'details' && 'border-b-4 border-black') + ' tracker-wider py-3'}><Link to={`/staff/profile/${user.user_id}/details`}>Staff Details</Link></li>
            <li className={(tab == 'history' && 'border-b-4 border-black') + ' tracker-wider py-3'}><Link to={`/staff/profile/${user.user_id}/history`}>History</Link></li>
            {
              user.role === 'admin' && <>
                 <li className={' tracker-wider py-3'}>
                 <button
                      type="submit"
                      onClick={ev => setEditProfileModal(true)}
                      className="ml-1 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                      <FaIcon.FaEdit/>
                  </button>
                 </li>

                 <UpdateAdminModal
                  show={editProfileModal}
                  hideModal={handleHideModal}
                  user={user}
                  handleLoading={handleLoading}
                />
              </>
            }
        </ul>
    </div>
  )
}

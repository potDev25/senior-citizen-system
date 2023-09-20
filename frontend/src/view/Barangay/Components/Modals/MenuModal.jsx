import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
    TEInput 
  } from "tw-elements-react";
import  Swal  from 'sweetalert2/dist/sweetalert2';
import AddStaff from '../../AddStaff';
import { Link } from 'react-router-dom';


export default function MenuModal({handleLoading, show, hideModal, admin, passenger, loading, provinces, numberData}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const [tab, setTab] = useState('details')
  const [manifest_id, setManifestId] = useState(null)

  const successAlert = (text) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
      })
  }

  const errorlert = (text) => {
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: text,
          showConfirmButton: false,
          timer: 1500
        })
  }

  const handleTab = (ev) => {
    setTab(ev)
  }
   

  const loadingToast = (title) => {
    Swal.fire({
      title: title,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  const hideLoadingToast = () => {
    Swal.fire({
      showConfirmButton: false,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
  }

  const alertMessage = (text, icon) =>{
    Swal.fire({
      icon: icon,
      text: text,
      showConfirmButton: true,
      confirmButtonColor: 'red'
    })
  }


  const handleHideModal = () => {
    setShowModal(false)
    hideModal(false)
  }

  return (
      <>
        {/* <!-- Modal --> */}
        <TEModal show={show} setShow={handleHideModal} scrollable staticBackdrop>
          <TEModalDialog size='lg' centered >
            <TEModalContent>
              <TEModalHeader className='bg-white text-white'>
                {/* <!--Modal title--> */}
                    <h1 className='uppercase text-2xl text-gray-900 flex items-center'><FaIcon.FiMenu/> &nbsp;Brgy. {passenger.designation}</h1>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content text-gray-500 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={handleHideModal}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </TEModalHeader>
              {/* <!--Modal body--> */}

              <TEModalBody>
                <div className=''>
                {
                  loading ? <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  :
                  <>
                    {admin ? <><p className='text-lg font-semibold text-gray-700 mb-3 uppercase flex items-center gap-2'> 
                      <img className="rounded-t-lg h-[50px] w-[50px] rounded-md" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${admin.photo}`} alt="" />
                      <span>
                        <Link to={`/staff/profile/${admin.id}/details`}>
                        {admin.last_name + ' ' + admin.first_name}</Link> <br />
                        <p className='text-xs'>Assigned Admin</p>
                      </span>
                    </p>
                    </>
                    : <span className='text-lg font-semibold text-gray-700 mb-5 uppercase'>No Assigned Admin|
                        <Link to={'/staff'} className='text-blue-700 capitalize text-sm'> Assign Admin</Link>
                      </span>
                    }
                  </>
                }
                </div>

                <div className='grid grid-cols-2 gap-5'>
                  <div className='rounded-md border border-gray-300 shadow-lg h-28 w-full hover:shadow-2xl p-2 text-center'>
                    <Link
                      to={`/barangay-seniors/${passenger.barangay}`}
                    >

                      <h1 className='text-xl font-semibold uppercase flex justify-center items-center gap-2'><FaIcon.FiUserPlus/> Senior Citizens</h1>
                      <p className='text-4xl text-green-500 mt-3'>
                        {
                          loading ? <div className='flex items-center justify-center'>
                            <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                          </div> : <>{numberData.seniors}</>
                        }
                      </p>

                    </Link>
                  </div>
                  <div className='rounded-md border border-gray-300 shadow-lg h-28 w-full hover:shadow-2xl p-2 text-center'>
                    <Link 
                      to={`/barangay-scanned-seniors/${passenger.barangay}`}
                    >
                      <h1 className='text-xl font-semibold uppercase flex justify-center items-center gap-2'><FaIcon.FiCamera/> Scanned Senior Citizens</h1>
                      <p className='text-4xl text-green-500 mt-3'>
                        {
                          loading ? <div className='flex items-center justify-center'>
                            <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                          </div> : <>{numberData.scanned}</>
                        }
                      </p>
                    </Link>
                  </div>
                </div>
              </TEModalBody>

            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

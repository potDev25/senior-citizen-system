import React, { useEffect, useState } from 'react'
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
import axiosClient from '../../axiosClient';
import  Swal  from 'sweetalert2/dist/sweetalert2';
import ProfileTab from '../../view/Tabs/ProfileTab';
import IndentificationTab from '../../view/Tabs/IndentificationTab';

export default function ProfileModal({handleLoading, show, hideModal, dateId, passenger, manifest_data_id, setChair}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const [tab, setTab] = useState('details')

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

  const handleNext = () => {

    var data = {}

    Swal.fire({
      text: 'Continue Booking as?',
      input: 'select',
      inputOptions: {
        'Student' : 'Student',
        'Regular' : 'Rugular',
        'Senior' : 'Senior',
        'PWD' : 'PWD',
      },
      inputPlaceholder: passenger.type,
      showCancelButton: true,
      cancelButtonColor: 'red',
      confirmButtonColor: 'blue',
      confirmButtonText: 'Continue',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== '') {
            //value has change
            data = {
              'passengers_id': passenger.id,
              'manifest_dates_id': dateId,
              'type': value
            }
            
          } else {
            //no change of value
            data = {
              'passengers_id': passenger.id,
              'manifest_dates_id': dateId,
              'type': passenger.type
            }
          } 
          axiosClient.post('/store-manifest-data', data)
            .then(({data}) => { 
              resolve()
              setChair(data.id)
              handleHideModal()
            })
            .catch((err) => {
              console.log(err)
              alertMessage('Something went wrong, please try again!', 'warning')
            })

        })
      }
    })
  }

  const handleHideModal = () => {
    setShowModal(false)
    hideModal(false)
  }

  return (
      <>
        {/* <!-- Modal --> */}
        <TEModal show={show} setShow={handleHideModal}>
          <TEModalDialog size='lg' centered>
            <TEModalContent>
              <TEModalHeader className='bg-blue-500 text-white'>
                {/* <!--Modal title--> */}
                <h5 className="text-xl font-medium leading-normal dark:text-neutral-200 uppercase">
                  <span className='capitalize'>{passenger.name + ' ' + passenger.middle_initial}</span>
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
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

              <div className='w-full bg-white shadow-md '>
                    <div className='flex flex-col items-center justify-center bg-yellow-300 py-2'>
                        <img src={passenger.selfie} alt="" className='border border-5 border-white rounded-full h-[200px] w-[2  00px]' />

                        <div className='px-2 py-1 text-center'>
                            <h1 className='text-black text-2xl font-lg font-bold capitalize'>{passenger.name} {passenger.middle_initial}</h1>
                            <p className='text-white text-sm'>{passenger.email}</p>
                        </div>
                    </div>

                    <div className='rounded mt-5 w-full overflow-auto'>
                        <div className='w-full'>
                            <ul className='flex items-center justify-center gap-5 uppercase'>
                                <li className={(tab == 'details' && 'border-b-4 border-blue-500') + ' tracker-wider py-3 text-sm font-bold cursor-pointer'} onClick={(ev) => handleTab('details')}>Passenger Details</li>
                                <li className={(tab == 'identification' && 'border-b-4 border-blue-500') + ' tracker-wider py-3 text-sm font-bold cursor-pointer'} onClick={(ev) => handleTab('identification')}>Identifications</li>
                            </ul>

                            {
                                tab == 'details' && <ProfileTab passenger={passenger}/>
                            }

                            {
                                tab == 'identification' && <IndentificationTab passenger={passenger} student={passenger.type} minor={passenger.type}/>
                            }
                        </div>
                    </div>
                </div>

              <TEModalBody>
                
              </TEModalBody>

              <TEModalFooter>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-red-500 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={handleHideModal}
                  >
                    Cancel
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-1 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >

                    Next
                  
                  </button>
                </TERipple>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

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

export default function RebookModal({handleLoading, show, hideModal, passengers, setPassengerProfile, dateId}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState([])
  const [search, setSearch] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [tab, setTab] = useState('')
  const [btnLoading, setBtnLoading] = useState(false)
  const [minor, setMinor] = useState({
    name: '',
    age: '',
  })

  const successAlert = (text) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
      })
  }

  const checkIfBook = (passenger) => {
    axiosClient.get(`/profile_passengers?qr=${passenger.qrcode_hash}&date=${dateId}`)
      .then(() => {
        setPassengerProfile(passenger)
      })
      .catch(() => {
        errorlert('Passenger Already Booked!')
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

    const handleHideModal = () => {
      setShowModal(false)
      hideModal(false)
    }

  return (
      <>
        {/* <!-- Modal --> */}
        <TEModal show={show} setShow={handleHideModal}>
          <TEModalDialog size='xl'>
            <TEModalContent>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-xl text-gray-500 font-medium leading-normal dark:text-neutral-200 uppercase">
                  Rebook Passengers
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

              <TEModalBody>

              <div className='mb-5'>
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                      onChange={ev => setSearch(ev.target.value)}
                      className={"w-[500px] transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} placeholder='Search' required />
                </div>
              </div>
                
              <table className={' bg-gray-100 md:table-auto w-full text-sm'}>
                <thead className=' py-5'>
                    <tr>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>NAME</td>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>ADDRESS</td>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>TYPE</td>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>Option</td>
                    </tr>
                </thead>

                <tbody>
                  {
                    passengers.filter((u) => {
                      return search.toLowerCase() === '' ? u : u.last_name.toLowerCase().includes(search) || u.first_name.toLowerCase().includes(search) || u.address.toLowerCase().includes(search)
                    }).map(u => (
                      <tr className={' p-5 border border-b-2 hover:bg-gray-300 pointer mb-5'}>
                        <td className='text-md px-5 py-2 font-medium flex gap-5 items-center'>
                            <div>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${u.selfie}`} alt="" className='sm:h-10 w-10 rounded-full'/>
                            </div>
                            <div>
                                <span>{u.last_name + ' ' + u.first_name}</span><br />
                                <span className='text-gray-500'>{u.contact_number}</span>
                            </div>
                        </td>
                        <td className='text-md px-5 py-2x text-gray-500 capitalize'>{u.address}</td>
                        <td className='text-sm px-5 py-2 text-gray-500'>
                            
                            {u.type == 'Student' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{u.type}</span>}
                            {u.type == 'Regular' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{u.type}</span>}
                            {u.type == 'Senior' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{u.type}</span>}
                            {u.type == 'PWD' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{u.type}</span>}
                            {u.type == 'Minor' && <span className='rounded-[10px] bg-yellow-300 text-yellow-500 px-2 text-sm capitalize'>{u.type}</span>}
                        </td>
                        <td>
                        <button
                          onClick={ev => checkIfBook(u)}
                          className="ml-1 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          Rebook
                        </button>
                        <a
                          href='#'
                          className="ml-1 inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          Ticket
                        </a>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>

              </table>

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
                
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

import React, { useEffect, useRef, useState } from 'react'
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
import axiosClient from '../../axiosClient';
import  Swal  from 'sweetalert2/dist/sweetalert2';
import { Link } from 'react-router-dom';
import Select from 'react-select'

export default function ManifestPassengers({showModal, hideModal, dates, options, filterByRoute, loading, getDateId, passengers}) {
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')

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


  return (
      <>
        
        <TEModal show={showModal} setShow={hideModal}>
          <TEModalDialog size='xl'>
            <TEModalContent>
              <TEModalHeader className='bg-blue-500 text-white'>
                {/* <!--Modal title--> */}
                <h5 className="text-xl font-medium leading-normal dark:text-neutral-200 uppercase">
                  Search Passengers
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={hideModal}
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

              <TEModalBody>
              
              <div className='mb-5 flex items-center justify-between'>
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                      onChange={ev => setSearch(ev.target.value)}
                      className={"w-[300px] transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} placeholder='Search' required />
                </div>

                <div>
                 
                </div>
              </div>

              {
                  loading && <div className='flex items-center justify-center'>
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                }

                {
                  loading !== true && <>
                
                  <table className={' bg-gray-100 md:table-auto w-full text-sm'}>
                    <thead className=' py-5'>
                        <tr>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Passengers</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Date</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Time</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Route</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Type</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>STATUS</td>
                            <td className='text-sm text-gray-500 font-medium px-5 py-2 uppercase'>Ticket</td>
                        </tr>
                    </thead>                  
                        <tbody>
                          {
                            passengers.filter((u) => {
                              return search.toLowerCase() === '' ? u : u.passenger.last_name.toLowerCase().includes(search) || u.passenger.first_name.toLowerCase().includes(search)
                            }).map(u => (
                              <tr className={' p-5 border border-b-2 hover:bg-gray-300 pointer mb-5'}>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>{u.passenger.last_name + ' ' + u.passenger.first_name}</td>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>{u.date}</td>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>{u.route.time}</td>
                                <td className='text-md px-5 py-2x text-gray-500 uppercase'>{u.route.route}</td>
                                <td className='text-md px-5 py-2x text-gray-500 uppercase'>
                                  {u.type.type == 'Student' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{u.type.type}</span>}
                                  {u.type.type == 'Regular' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{u.type.type}</span>}
                                  {u.type.type == 'Senior' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{u.type.type}</span>}
                                  {u.type.type == 'PWD' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{u.type.type}</span>}
                                  {u.type.type == 'Minor' && <span className='rounded-[10px] bg-yellow-300 text-yellow-500 px-2 text-sm capitalize'>{u.type.type}</span>}
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                  {u.type.status == 'rebooked' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{u.type.status}</span>}
                                  {u.type.status == 'refunded' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{u.type.status}</span>}
                                  {u.type.status   == 'complete' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{u.type.status}</span>}
                                </td>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>
                                <a
                                  href={`/ticketing/ticket/${u.type.id}/${u.passenger.id}/${u.route.id}`}
                                  className="ml-1 inline-block rounded bg-blue-500 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                  View
                                </a>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>

                  </table>
                  
                </>
              }
                
              </TEModalBody>

              <TEModalFooter>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-red-500 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={hideModal}
                  >
                    Close
                  </button>
                </TERipple>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

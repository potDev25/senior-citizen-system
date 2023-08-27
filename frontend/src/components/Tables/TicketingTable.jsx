import React, { useEffect } from 'react'
import { useState } from 'react';
import * as FaIcon from "react-icons/fi";
import TableSpiral from '../Spiral/TableSpiral';
import Spiral from '../Spiral/Spiral';
import axiosClient from '../../axiosClient';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import WithMinor from '../Modals/WithMinor';
import  Swal  from 'sweetalert2/dist/sweetalert2';
import Rebook from '../Modals/Rebook';

export default function TicketingTable({title, children, dateId, time, getManifestData}) {

    const [search, setSearch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showRebookModal, setShowRebookModal] = useState(false)
    const [manifest, setManifest] = useState([])
    const [passengerId, _setPassengerId] = useState(null)
    const [manifestDateId, setDateId] = useState(null)
    
    // const date = new Date(title)
    // const monthNames = ["January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December"
    // ];
    // const act_data = monthNames[date.getMonth()] + ' ' + date.getDay() + ',' + date.getFullYear()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const search_width = () => {
        setSearch(!search)
    } 

    const handleLoading = (load) => {
       setLoading(load)
    } 

    const hideModal = (hide) => {
        setShowModal(hide)
    }

    const hideRebbokModal = (hide) => {
        setShowRebookModal(hide)
    }

    const setPassengerId = (id, dateId) => {
        _setPassengerId(id)
        setDateId(dateId)
        setShowModal(true)
    }

    const rebookModal = (id, dateId) => {
        _setPassengerId(id)
        setDateId(dateId)
        setShowRebookModal(true)
    }

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

    const modalPrompt = (id, manifest_dates_id) => {
        Swal.fire({
            title: 'Remove Minor?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              removeMinor(id, manifest_dates_id)
            }
          })
    }

    const refundPrompt = (id, manifest_dates_id) => {
        Swal.fire({
            title: 'Refund Passenger?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
                refund(id, manifest_dates_id)
            }
          })
    }

    const refund = (id, manifest_dates_id) => {
        axiosClient.put(`/ticket/refund/${id}/${manifest_dates_id}`)
            .then(() => {
                successAlert('Refund Action Completed!')
                setLoading(true)
            })
            .catch(() => {
                errorlert('Server error please try again later!')
            })
    }

    const removeMinor = (id, manifest_dates_id) => {
        axiosClient.put(`/ticket/remove_minor/${id}/${manifest_dates_id}`)
            .then(() => {
                successAlert('Minor Removed')
                setLoading(true)
            })
            .catch(() => {
                errorlert('Server error please try again later!')
            })
    }

    useEffect(() => {
        axiosClient.get(`/get-passenger-manifest/${dateId}`)
        .then(({data}) => {
            getManifestData(data)
            console.log(data);
            setManifest(data)
            setLoading(false)
            
        })
        .catch(() => {
            console.log(title);
            setLoading(false)
        })
    }, [loading])

  return (
    <div className='bg-white shadow-sm h-fit md:w-full sm:w-full sm:scroll-auto px-5 py-2 rounded'>

        <WithMinor 
            show={showModal}
            hideModal={hideModal}
            passengerId={passengerId}
            handleLoading={handleLoading}
            dateId={manifestDateId}
        />

        <Rebook 
            show={showRebookModal}
            hideModal={hideRebbokModal}
            passengerId={passengerId}
            handleLoading={handleLoading}
            dateId={manifestDateId}
        />

       <h1 className='text-md mb-4 font-bold tracking-wide'>{title === '' ? 'Create Manifest Date' : title + ' ' + time}</h1>
       <div className='flex items-center justify-between mb-4'>
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-3 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" onClick={search_width} className={(search ? 'w-[90%]' : 'w-[50px]') + " transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} required />
            </div>

            {/* <button className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiPrinter/> &nbsp;Print</button> */}
        </div>

       <table className='md:table-auto w-full bg-gray-100 text-sm'>
            {loading && <Spiral/>}
            {!loading && <> <thead className=' py-5'>
                <tr>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>#</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Name</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>W/ Minor</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Age</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>SEX</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>TYPE</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>SET NUMBER</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>OPTIONS</td>
                </tr>
            </thead>
            <tbody>
                {
                    manifest.map((data, id) => (
                        <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5' key={data.passengers_id}>
                            <td className='px-5 py-2'>{id + 1}</td>
                            <td className='text-md px-5 py-2 font-medium'>
                                <div>
                                    <span className='capitalize'><Link to={`/passenger/profile/${data.passengers_id}/details`} className='text-blue-500'>{data.last_name + ' ' + data.first_name}</Link></span><br />
                                </div>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                {data.with_minor === null ? 'N/A' : data.with_minor}
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                <span>{data.age}</span>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500 capitalize'>
                                <span>{data.gender}</span>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>

                                {data.manifest_type == 'Student' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{data.manifest_type}</span>}
                                {data.manifest_type == 'Regular' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{data.manifest_type}</span>}
                                {data.manifest_type == 'Senior' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{data.manifest_type}</span>}
                                {data.manifest_type == 'PWD' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{data.manifest_type}</span>}
                                {data.manifest_type == 'Minor' && <span className='rounded-[10px] bg-yellow-300 text-yellow-500 px-2 text-sm capitalize'>{data.manifest_type}</span>}

                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                <span>{data.set_number}</span>
                            </td>
                            <td className='text-md px-5 py-2x text-gray-500'>
                            <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300">
                                OPTIONS
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex items-center px-4 py-2 text-sm w-full text-md font-semibold'
                                        )}
                                        onClick={ev => rebookModal(data.id, data.manifest_dates_id)}
                                        >
                                        Rebook
                                        </Link>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item >
                                    {({ active }) => (
                                        <button
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex items-center px-4 py-2 text-sm w-full text-md font-semibold'
                                        )}
                                        onClick={ev => refundPrompt(data.id, data.manifest_dates_id)}
                                        >
                                        Refund
                                        </button>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item >
                                    {({ active }) => (
                                        <button
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'flex items-center px-4 py-2 text-sm w-full text-md font-semibold'
                                        )}
                                        onClick={ev => setPassengerId(data.id, data.manifest_dates_id)}
                                        >
                                        With Minor
                                        </button>
                                    )}
                                    </Menu.Item>
                                    {
                                        data.with_minor !== null && 

                                        <Menu.Item >
                                        {({ active }) => (
                                            <button
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'flex items-center px-4 py-2 text-sm w-full text-md font-semibold'
                                            )}
                                            onClick={ev => modalPrompt(data.id, data.manifest_dates_id)}
                                            >
                                            Remove Minor
                                            </button>
                                        )}
                                        </Menu.Item>

                                    }
                                </div>
                                </Menu.Items>
                            </Transition>
                            </Menu>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody> </>}
       </table>
       
       {children}
    </div>
  )
}
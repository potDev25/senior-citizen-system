import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
import { Link } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import AddPassengerModal from '../Modal/AddPassengerModal';
import axiosClient from '../../../axiosClient';

export default function PeopleTable() {
    const [string, setString] = useState('')
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [search, setSearch] = useState(true)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [limit, _setLimit] = useState(5)
    const [paginate, setPaginate] = useState(1);
    const [links, setLinks] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [provinces, setProvinces] = useState([]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function hideModal() {
        setShowModal(false)
    }

    function hideUpdateModal() {
        setShowUpdateModal(false)
    }

    function handleShowUpdateModal(user) {
        setUser(user)
        setShowUpdateModal(true)
    }

    function handleLoading() {
        setLoading(true)
    }

    function setLimit(ev) {
        _setLimit(ev.target.value)
        setLoading(true)
    }

    const handLink = (e) =>{
        setLoading(true)
        setPaginate(e)
    }

    const handlePromt = (staff) => {
        Swal.fire({
            title: 'Delete Senior?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: 'red',
            cancelButtonColor: '#4f46e5',
            icon: 'warning'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteStaff(staff)
            }
          })
    }

    const handleBlockPromt = (staff) => {
        Swal.fire({
            title: `${staff.block == 1 ? 'Unblock' : 'Block'} This Staff?`,
            showCancelButton: true,
            confirmButtonText: `${staff.block == 1 ? 'Unblock' : 'Block'}`,
            confirmButtonColor: 'red',
            cancelButtonColor: '#4f46e5',
            icon: 'warning'
          }).then((result) => {
            if (result.isConfirmed) {
                blockStaff(staff)
            }
          })
    }

    const promptMessage = (text, icon) => {
        Swal.fire({
            text: text,
            icon: icon,
            confirmButtonColor: '#4f46e5',
          }).then((result) => {
            setLoading(true)
          })
    }

    const deleteStaff = (staff) => {
        axiosClient.delete(`/passenger/destroy/${staff.id}`)
        .then(({data}) => {
            promptMessage('Senior Deleted Successfully', 'success')
        })
        .catch(() => {
            promptMessage('Something Went Please Try Again', 'warning')
        })
    }

    const blockStaff = (staff) => {
        axiosClient.put(`/staff/block/${staff.id}`)
        .then(({data}) => {
            promptMessage('Staff Blocked Successfully', 'success')
        })
        .catch(() => {
            promptMessage('Something Went Please Try Again', 'warning')
        })
    }

    useEffect(() => {
        axiosClient.get(`/get-passengers-approved/${limit}?page=${paginate}`)
        .then(({data}) => {
            setPassengers(data.data)
            setLinks(data.meta.links)
            setLoading(false)
        })

        axiosClient.get('/get-provinces')
            .then(({data}) => {
                setProvinces(data.provinces)
            })

    }, [loading])
  return (
    <div className='bg-white shadow-sm h-fit md:w-full rounded overflow-auto'>
            <div className='w-full h-10 text-white uppercase p-2 rounded-t-md border-b-2 border-gray-100'>
                <h1 className='uppercase text-md text-gray-500'>manage seniors</h1>
            </div>
            <div className='p-5'>
                <div className='sm:block md:flex lg:flex items-center justify-between mb-4'>
                        <div className='flex items-center'>
                            <div className="relative">
                                <select
                                    onChange={ev => setLimit(ev)}
                                    className={` border-gray-200 block appearance-none w-full bg-gray-200 border  text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                    id="grid-state"
                                >
                                    <option selected value='5'>5</option>
                                    <option value='10'>10</option>
                                    <option value='20'>20</option>
                                    <option value='5000'>All</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>

                            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-3 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="search" id="default-search" onChange={ev => setString(ev.target.value)} className={(search ? 'w-[100%]' : 'w-[50px]') + " transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} required />
                            </div>

                        </div>

                        <div className='lg:flex items-center justify-center gap-2 sm:mt-5'>
                            <button 
                            onClick={ev => setShowModal(true)}
                            className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center uppercase'><FaIcon.FiPlusCircle/> &nbsp;Register Senior</button>
                           
                           <AddPassengerModal
                                show={showModal}
                                hideModal={hideModal}
                                handleLoading={handleLoading}
                                provinces={provinces}
                            />
                            
                        </div>
                    </div>

                {
                    loading ? 
                    <div className='flex items-center justify-center'>
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    :
                    <table className='md:table-auto w-full bg-gray-100 text-sm overflow-auto'>
                        <thead className='bg-gray-800 py-5'>
                            <tr>
                                <td className='text-sm text-white font-medium px-5 py-2'>NAME</td>
                                <td className='text-sm text-white font-medium px-5 py-2'>ADDRESS</td>
                                <td className='text-sm text-white font-medium px-5 py-2'>Designation</td>
                                <td className='text-sm text-white font-medium px-5 py-2'>DATE ADDED</td>
                                <td className='text-sm text-white font-medium px-5 py-2'>OPTIONS</td>
                            </tr>
                        </thead>

                        <tbody>

                            {passengers ? <>
                                {passengers.filter((u) => {
                                    return string.toLowerCase() === '' ? u : u.name.toLowerCase().includes(string) || u.type.toLowerCase().includes(string)
                                })
                                
                            .map(u => (
                                <tr className={' p-5 border border-b-2 hover:bg-gray-300 pointer mb-5'}>
                                <td className='text-md px-5 py-2 font-medium flex gap-5 items-center'>
                                    <div className='md:hidden lg:block sm:hidden'>
                                        <img src={u.selfie} alt="" className='sm:h-10 w-10 rounded-full'/>
                                    </div>
                                    <div>
                                        <span>{u.name}</span><br />
                                        <span className='text-gray-500'>{u.contact_number}</span>
                                    </div>
                                </td>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>{u.address}</td>
                                <td className='text-md px-5 py-2x text-gray-500 capitalize'>Brgy. {u.barangay}</td>
                                <td className='text-md px-5 py-2x text-gray-500'>{u.created_at}</td>
                                <td>
                                    
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset rounded-md">
                                        OPTIONS
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
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
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                to={'/passenger/profile/' + u.id + '/details'}
                                                >
                                                <FaIcon.FiEye/>&nbsp; View
                                                </Link>
                                            )}
                                            </Menu.Item>
                                            
                                            <Menu.Item >
                                            {({ active }) => (
                                                <button
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                onClick={ev => handlePromt(u)}
                                                >
                                                <FaIcon.FiTrash/>&nbsp; Delete
                                                </button>
                                            )}
                                            </Menu.Item>
                                        </div>
                                        </Menu.Items>
                                    </Transition>
                                    </Menu>
                                </td>
                            </tr>
                            ))}

                            </> : null}
                            </tbody>
                    </table>                  
                }
                <div className='flex items-center justify-between mt-4'>
                    <div></div>
                    <ul className="list-style-none flex">

                        {
                        links.map((link) => (
                            <li aria-current="page">
                            <button  onClick={() => handLink(link.label)} dangerouslySetInnerHTML={{ __html: link.label }}
                                className={` ${link.active ? "bg-blue-500 text-white" : ""} relative block rounded px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300`}
                                >
                            </button>
                            </li>
                        ))
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
  )
}

import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
import { Link } from 'react-router-dom';
import AddStaffModal from '../Components/Modals/AddStaffModal';
import axiosClient from '../../../axiosClient';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import UpdateStaffModal from '../Components/Modals/UpdateStaffModal';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Image from '../../../assets/images/seniors/UEWFefw.png'
import MenuModal from '../Components/Modals/MenuModal';

export default function StaffTable() {
    const [strings, setString] = useState('')
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [search, setSearch] = useState(true)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showMenuModal, setMenuModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [limit, _setLimit] = useState(10)
    const [paginate, setPaginate] = useState(1)
    const [links, setLinks] = useState([])
    const [provinces, setProvinces] = useState([])
    const [menuLoading, setMenuLoading] = useState(true)
    const [numberSenior, setNumberSenior] = useState([]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function hideModal() {
        setShowModal(false)
    }

    function hideUpdateModal() {
        setShowUpdateModal(false)
    }

    function hideMenuModal() {
        setMenuModal(false)
    }

    function handleShowMenuModal(user) {
        getNumberSeniors(user.id)
        setUser(user)
        setMenuModal(true)
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
            title: 'Delete This Department?',
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

    const getNumberSeniors = (barangayId) => {
        setMenuLoading(true)
        axiosClient.get(`department/departments/get-staff/${barangayId}`)
            .then(({data}) => {
                setNumberSenior(data.numberData)
                setAdmin(data.user)
                setMenuLoading(false)
            })
            // .catch(() => {
            //     alert('Server Error!')
            //     setMenuLoading(false)
            // })
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
        axiosClient.delete(`/department/destroy/${staff.id}`)
        .then(({data}) => {
            promptMessage('Department Deleted Successfully', 'success')
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
        axiosClient.get(`/department/departments/${limit}?page=${paginate}`)
            .then(({data}) => {
                setUsers(data.barangays.data)
                setLinks(data.barangays.links)
                setLoading(false)
            })

        axiosClient.get('/get-provinces')
            .then(({data}) => {
                setProvinces(data.provinces)
            })

    }, [loading])
  return (
    <div className='bg-white shadow-sm h-fit md:w-full rounded'>
            <div className='w-full h-10 text-white uppercase p-2 rounded-t-md border-b-2 border-gray-100'>
                <h1 className='uppercase text-md text-gray-500'>manage departments</h1>
            </div>
            <div className='p-5'>
                <div className='md:flex lg:flex items-center justify-between mb-4'>
                        <div className='flex items-center'>
                            <div className="relative">
                                <select
                                    onChange={ev => setLimit(ev)}
                                    className={` border-gray-200 block appearance-none w-full bg-gray-200 border  text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                    id="grid-state"
                                >
                                    <option selected value='10'>10</option>
                                    <option value='20'>10</option>
                                    <option value='30'>20</option>
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

                        <div className='md:flex lg:flex sm:mt-5 items-center justify-center gap-2'>
                            <button 
                            onClick={ev => setShowModal(true)}
                            className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center uppercase'><FaIcon.FiPlusCircle/> &nbsp;Register departments</button>
                           
                            <AddStaffModal
                             hideModal={hideModal}
                             show={showModal}
                             handleLoading={handleLoading}
                             provinces={provinces}
                            />

                            <MenuModal
                             hideModal={hideMenuModal}
                             show={showMenuModal}
                             handleLoading={handleLoading}
                             provinces={provinces}
                             passenger={user}
                             numbers={numberSenior}
                            />

                            <UpdateStaffModal
                             hideModal={hideUpdateModal}
                             show={showUpdateModal}
                             handleLoading={handleLoading}
                             user={user}
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
                    </div> :
                    
                    <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 mt-10 gap-5'>

                        {   
                            users.filter((user) => {
                                return strings.toLowerCase() === '' ? user : user.designation.toLowerCase().includes(strings) || user.barangay.toLowerCase().includes(strings)
                            }).map((user, key) => (
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <img className="rounded-t-lg h-[150px] w-full" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${user.logo}`} alt="" />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-600 capitalize dark:text-white">{user.designation}</h5>
                                            <p class="mb-3 font-normal text-gray-500 text-sm dark:text-gray-400">{user.barangay}, {user.city}, {user.province}</p>
                                        </a>

                                        <div className='flex items-center gap-2'>
                                            <button
                                            onClick={ev => handleShowUpdateModal(user)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaIcon.FiEdit/>
                                            </button>

                                            <button
                                            onClick={ev => handlePromt(user)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaIcon.FiTrash/>
                                            </button>

                                            <button
                                            onClick={ev => handleShowMenuModal(user)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <FaIcon.FiEye/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>          
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

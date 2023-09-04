import React, { useEffect, useRef, useState } from 'react'
import RecentlyAdded from '../components/RecentlyAdded'
import Table from '../components/Table'
import * as FaIcon from "react-icons/fi";
import Option from '../components/Option';
import PeopleTable from '../components/Tables/PeopleTable';
import AddPassengerModal from './People/Modal/AddPassengerModal';
import axiosClient from '../axiosClient';
import UpdloadModal from './People/Modal/UploadModal';

export default function People() {

  const [checked, setChecked] = useState(false)
  const [search, setSearch] = useState(true)
  const [showModal, setModal] = useState(false)
  const [showMediaModal, setMediaModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchString, setString] = useState('')
  const [passId, setPassId] = useState(null)
  const [passenger, setPassenger] = useState([])
  const searchInput = useRef()

  const link = '/get-passengers-approved'
  const title = ''

  const multiple_check = () => {
    setChecked(!checked)
  }

  function hideModal() {
    setModal(false)
  }

  function hideMediaModal() {
    setModal(false)
  }

  function handMedialModal(passId) {
    setMediaModal(true)
    setPassId(passId)
  }

  function handleLoading() {
    setLoading(true)
  }

  const handleSearch = (string) => {
    setString(string)
  }

  useEffect(() => {
    axiosClient.get(`/passenger/show/${passId}`)
      .then(({data}) => {
        setPassenger(data.passenger)
      }) 
  }, [passId])

  return (
    <div className='md:w-full bg-white rounded px-5 py-2 mt-[2px]'>
      <div className='w-full h-14 text-white uppercase p-2 rounded-t-md border-b-2 mb-5 border-gray-100'>
        <h1 className='uppercase text-2xl text-gray-500'>Passengers</h1>
      </div>

      <div className='flex items-center justify-between md:w-full'>

        <div className='mb-5 flex gap-3 items-center'>
          <select name="" id="" className='border rounded-[5px] border-gray-300 text-gray-500'>
            <option value="">10</option>
            <option value="">20</option>
            <option value="">30</option>
            <option value="">100</option>
          </select>
{/* 
          <div className='border rounded-[5px] border-gray-300 flex items-center gap-2 md:px-5 py-2 cursor-pointer text-gray-500'>
            <input type="checkbox" name="" id="multiple" onChange={multiple_check} />
            <label htmlFor='multiple' className='cursor-pointer'>Select Multiple</label>
          </div> */}

          <div>
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={(ev) => handleSearch(ev.target.value)} ref={searchInput} type="search" id="default-search" className={(search ? 'w-[90%]' : 'w-[50px]') + " transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} placeholder='Search' required />
            </div>
          </div>
        </div>

        <div className='mb-5 flex gap-2 items-center'>
          {checked && <button className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiSave/> &nbsp;Save</button>}
          
          {checked && <Option/>}
          
          <button 
            onClick={ev => setModal(true)}
            className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center uppercase'><FaIcon.FiPlusCircle/> &nbsp;Register</button>

          <AddPassengerModal
            show={showModal}
            hideModal={hideModal}
            handleLoading={handleLoading}
            showMediaModal={handMedialModal}
          />

          <UpdloadModal
            show={showMediaModal}
            hideModal={hideMediaModal}
            passenger={passenger}
          />

          <select name="" id="" className='border rounded-[5px] border-gray-300 text-gray-500'>
            <option value="" selected hidden>Filter</option>
            <option value="">All</option>
            <option value="">Student</option>
            <option value="">Regulars</option>
            <option value="">Senior</option>
            <option value="">PWD</option>
          </select>
        </div>
      </div>
        

      <RecentlyAdded checked={checked} link={link} title={title} string={searchString} load={loading}/>
        
    </div>
  )
}

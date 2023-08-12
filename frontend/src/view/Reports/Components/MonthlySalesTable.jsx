import React, { useState } from 'react'
import * as FaIcon from "react-icons/fi";
import ManifestCalendar from '../../../components/Modals/ManifestCalendar';

export default function MonthlySalesTable() {
    const [loadingBox, setLoadingBox] = useState(false)
    const [search, setSearch] = useState(true)
    const [strings, setString] = useState('')
    const [showModal, setModal] = useState(false)

    const hideModal = () =>{
        setModal(false)
    }

  return (
    <div>
        <div className='bg-white shadow-sm h-fit md:w-full rounded'>
            <div className='w-full h-10 bg-blue-500 text-white uppercase p-2 rounded-t-md'></div>
            <div className='p-5'>
                <div className='flex items-center justify-between mb-4'>
                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-3 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" onChange={ev => setString(ev.target.value)} className={(search ? 'w-[100%]' : 'w-[50px]') + " transition-all ease-in-out block py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"} required />
                        </div>

                        <div className='flex items-center justify-center gap-2'>
                            <button 
                            onClick={ev => setModal(true)}
                            className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiCalendar/> &nbsp;Date</button>
                            {/* <ManifestCalendar
                                showModal={showModal}
                                hideModal={hideModal}
                                dates={manifestDate}
                                options={options}
                                filterByRoute={filterByRoute}
                                loading={loading}
                                getDateId={getDateId}
                            /> */}

                            {/* <ManifestPassengers
                                showModal={showModalPassengers}
                                hideModal={hideModalPassengers}
                                dates={manifestDate}
                                options={options}
                                filterByRoute={filterByRoute}
                                loading={loading}
                                getDateId={getDateId}
                                passengers={trackPassenger}
                            /> */}

                            {/* <ReactToPrint
                                trigger={() => <button className='rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiPrinter/> &nbsp;Print</button>}
                                content={() =>  componentRef.current}
                            /> */}
                            
                        </div>
                    </div>

                {
                    loadingBox ? 
                    <div className='flex items-center justify-center'>
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    :
                    <table className='md:table-auto w-full bg-gray-100 text-sm'>
                        <thead className=' py-5'>
                            <tr>
                                <td className='text-sm text-gray-500 font-medium px-5 py-2'>Route</td>
                                <td className='text-sm text-gray-500 font-medium px-5 py-2'>Month</td>
                                <td className='text-sm text-gray-500 font-medium px-5 py-2'>Monthly Sales</td>
                                <td className='text-sm text-gray-500 font-medium px-5 py-2'>Action</td>
                            </tr>
                        </thead>

                        <tbody>
                            {/* {   
                                passengers.filter((passenger) => {
                                    return strings.toLowerCase() === '' ? passenger : passenger.passenger.last_name.toLowerCase().includes(strings) || passenger.passenger.first_name.toLowerCase().includes(strings)
                                }).map((passenger, key) => (
                                    <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5' key={key}>
                                        <td className='px-5 py-2'>{key + 1}</td>
                                        <td className='text-md px-5 py-2 font-medium flex gap-5 items-center'>
                                            <div>
                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${passenger.media.selfie}`} alt="" className='sm:h-10 w-10 rounded-full'/>
                                            </div>
                                            <div>
                                                <Link to={`/passenger/profile/${passenger.passenger.id}/details`} className='text-blue-500'>{passenger.passenger.last_name + ' ' + passenger.passenger.first_name}</Link><br />
                                                <span className='text-gray-500'>{passenger.passenger.contact_number}</span>
                                            </div>
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500'>
                                            <span>
                                            {passenger.manifest.with_minor === null ? 'N/A' : passenger.manifest.with_minor}
                                            </span>
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500'>
                                            <span>{passenger.passenger.age}</span>
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500 uppercase'>
                                            <span>{passenger.passenger.gender}</span>
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500'>
                                            {passenger.manifest.type == 'Student' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{passenger.manifest.type}</span>}
                                            {passenger.manifest.type == 'Regular' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{passenger.manifest.type}</span>}
                                            {passenger.manifest.type == 'Senior' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{passenger.manifest.type}</span>}
                                            {passenger.manifest.type == 'PWD' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{passenger.manifest.type}</span>}
                                            {passenger.manifest.type == 'Minor' && <span className='rounded-[10px] bg-yellow-300 text-yellow-500 px-2 text-sm capitalize'>{passenger.manifest.type}</span>}
                                        </td>
                                        <td className='text-md px-5 py-2x text-gray-500'>
                                            {passenger.manifest.set_number}
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500'>
                                            {passenger.manifest.status == 'rebooked' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>{passenger.manifest.status}</span>}
                                            {passenger.manifest.status == 'refunded' && <span className='rounded-[10px] bg-red-300 text-red-500 px-2 text-sm capitalize'>{passenger.manifest.status}</span>}
                                            {passenger.manifest.status   == 'complete' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{passenger.manifest.status}</span>}
                                        </td>
                                        <td className='text-sm px-5 py-2 text-gray-500'>
                                            <a
                                                href={`/ticketing/ticket/${passenger.manifest.id}/${passenger.passenger.id}/${getDateIdForPrint}`}
                                                className="ml-1 inline-block rounded bg-blue-500 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                >
                                                View
                                            </a>
                                        </td>
                                    </tr> 
                                ))
                            } */}
                            
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </div>
  )
}

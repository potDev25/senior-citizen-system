import React, { useState } from 'react'
import * as FaIcon from "react-icons/fi";
import axiosClient from '../../../axiosClient';

export default function Ticket({ticket, handleLoading}) {
    const [btnLoading, setBtnLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [displayErrors, setDisplayErrors] = useState({
        office_address: '',
        original_address: '',
        type: '',
        tin_no: '',
        mobile: '',
        telephone: '',
    })
    const [info, setinfo] = useState({
        office_address: ticket ? ticket.office_address : '',
        original_address: ticket ? ticket.original_address : '',
        type: ticket ? ticket.type : '',
        tin_no: ticket ? ticket.tin_no : '',
        mobile: ticket ? ticket.mobile : '',
        telephone: ticket ? ticket.telephone : '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true)
        axiosClient.post('/settings/ticket/store', info)
            .then(({data}) => {
                setErrors([]);
                setBtnLoading(false)
                handleLoading()
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                setBtnLoading(false)
            })
    }
  return (
        <div className='w-full p-5'>
            <form onSubmit={handleSubmit}>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Office Address:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <input
                                defaultValue={`${ticket ? ticket.office_address: ''}`} 
                                onChange={ev => setinfo({...info, office_address: ev.target.value})} 
                                type="text" id="first_name" 
                                className={` ${errors.office_address ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.office_address ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.office_address}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Orginal Address:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <input 
                                defaultValue={`${ticket ? ticket.original_address: ''}`} 
                                onChange={ev => setinfo({...info, original_address: ev.target.value})} 
                                type="text" id="first_name" 
                                className={` ${errors.original_address ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.original_address ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.original_address}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Ticket Type:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <select 
                                name="" 
                                id=""
                                onChange={ev => setinfo({...info, type: ev.target.value})} 
                                className={` ${errors.type ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}>
                                    <option value={`${ticket ? ticket.type : ''}`} selected hidden>{ticket ? ticket.type : 'Ticket Type'}</option>
                                    <option value="Vat">Vat</option>
                                    <option value="Non-Vat">Non-Vat</option>

                            </select>
                            </div>
                        </div>
                        {
                            errors.type ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.type}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>TIN No:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <input 
                                defaultValue={`${ticket ? ticket.tin_no: ''}`} 
                                onChange={ev => setinfo({...info, tin_no: ev.target.value})} 
                                type="text" id="first_name" 
                                className={` ${errors.tin_no ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.tin_no ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.tin_no}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Mobile No:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <input 
                                defaultValue={`${ticket ? ticket.mobile: ''}`} 
                                onChange={ev => setinfo({...info, mobile: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.mobile ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.mobile ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.mobile}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Telephone No:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <FaIcon.FiSettings/>
                            </span>
                            <div>
                            <input 
                                defaultValue={`${ticket ? ticket.telephone: ''}`} 
                                onChange={ev => setinfo({...info, telephone: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.telephone ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.telephone ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.telephone}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            

            <div className='py-3 w-full flex item-center justify-between'>
                <div></div>
                <div className='flex items-center gap-5'>
                    <button 
                        type='submit' 
                        className='flex items-center justify-center w-[100px] gap-1 bg-blue-500 text-white px-2 rounded py-1 hover:bg-yellow-500'>
                        

                        <div className='flex items-center justify-center'>
                            {
                                btnLoading ? 
                                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg> : null
                            }
                           
                            Save
                        </div>
                    </button>
                </div>
            </div>
            </form>
        </div>
  )
}

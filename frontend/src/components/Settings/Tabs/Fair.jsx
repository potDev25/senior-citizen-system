import React, { useState } from 'react'
import * as FaIcon from "react-icons/fi";
import axiosClient from '../../../axiosClient';

export default function Fair({fairs, handleLoading}) {
    const [btnLoading, setBtnLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [displayErrors, setDisplayErrors] = useState({
        regular: '',
        student: '',
        minor: '',
        pwd: '',
        senior: ''
    })
    const [fair, setFair] = useState({
        regular: fairs ? fairs.regular : '',
        student: fairs ? fairs.student : '',
        minor: fairs ? fairs.minor : '',
        pwd: fairs ? fairs.pwd : '',
        senior: fairs ? fairs.senior : '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnLoading(true)
        axiosClient.post('/settings/fair/store', fair)
            .then(({data}) => {
                setErrors([]);
                setBtnLoading(false)
                handleLoading()
            })
            .catch((error) => {
                alert('server error')
                setErrors(error.response.data.errors);
                setBtnLoading(false)
            })
    }
  return (
        <div className='w-full p-5'>
            <form onSubmit={handleSubmit}>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Regular:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#8369;
                            </span>
                            <div>
                            <input
                                defaultValue={`${fairs ? fairs.regular+'.00': ''}`} 
                                onChange={ev => setFair({...fair, regular: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.regular ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.regular ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.regular}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Student:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#8369;
                            </span>
                            <div>
                            <input 
                                defaultValue={`${fairs ? fairs.student+'.00': ''}`} 
                                onChange={ev => setFair({...fair, student: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.student ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.student ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.student}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Senior:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#8369;
                            </span>
                            <div>
                            <input 
                                defaultValue={`${fairs ? fairs.senior+'.00': ''}`} 
                                onChange={ev => setFair({...fair, senior: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.senior ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.senior ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.senior}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>PWD:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#8369;
                            </span>
                            <div>
                            <input 
                                defaultValue={`${fairs ? fairs.pwd+'.00': ''}`} 
                                onChange={ev => setFair({...fair, pwd: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.pwd ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.pwd ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.pwd}</p>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5 justify-between w-[80%]'>
                    <h1 className='text-gray-500 text-md font-2xl'>Minor:</h1>
                    <div>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                &#8369;
                            </span>
                            <div>
                            <input 
                                defaultValue={`${fairs ? fairs.minor+'.00': ''}`} 
                                onChange={ev => setFair({...fair, minor: ev.target.value})} 
                                type="number" id="first_name" 
                                className={` ${errors.minor ? 'border-red-500' : 'border-gray-300'} border  text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5 `}
                            />
                            </div>
                        </div>
                        {
                            errors.minor ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.minor}</p>
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

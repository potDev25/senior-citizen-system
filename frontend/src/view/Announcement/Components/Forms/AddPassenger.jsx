import React, { useState } from 'react'
import * as FaIcon from "react-icons/fi";
import Profile from '../../../../assets/images/profile.png'
import axiosClient from '../../../../axiosClient';
import { useStateContext } from '../../../../Context/ContextProvider';

export default function AddPassenger({hideModal, handleLoading, showMediaModal, provinces}) {
    const [btnLoading, setLoading] = useState(false)
    const [type, _setType] = useState('')
    const [photo, _setPhoto] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([])
    const [cities, setCities] = useState([])
    const [barangays, setBarangay] = useState([])
    const {setNotification} = useStateContext()
    const [userInfo, setUserInfo] = useState({
        date: '',
        type: '',
        title: '',
        description: '',
        recipent: '',
    })

    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    };

    const setType = (val) => {
        setUserInfo({...userInfo, type: val})
        if(val === 'Event'){
            _setType(true)
        }else{
            _setType(false)
        }
    } 

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setUserInfo({...userInfo, photo: event.target.files[0]})
        }
    }

    function submitUser(ev) {
        ev.preventDefault();
        setLoading(true)
        axiosClient.post('/announcement/store', userInfo)
            .then(({data}) => {
                setLoading(false)
                setNotification('Announcements Created Successfully')
                setErrors([])
                handleLoading()
                hideModal()
            })
            .catch(errors => {
                console.log(errors);
                if(errors.response.status == 422){
                    setErrors(errors.response.data.errors)
                }else{
                    alert('server error please try again later')
                }
                setLoading(false)
            })
    }

    const getCities = (province_id) => {
        setUserInfo({...userInfo, province: province_id})
        axiosClient.get(`/get-cities/${province_id}`)
            .then(({data}) => {
                setCities(data.cities)
            })
    }

    const getBarangay = (city_id) => {
        setUserInfo({...userInfo, city: city_id})
        axiosClient.get(`/get-barangay/${city_id}`)
            .then(({data}) => {
                setBarangay(data.barangays)
            })
    }
  return (
    <div className='flex gap-5 items-center justify-center'>
        <div className='bg-white shadow-sm h-fit md:w-[700px] rounded'>
            
            <div className='p-5 mt-2'>
                <div className='flex items-center justify-center'>
                    <form class="w-full" onSubmit={submitUser}>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Type
                            </label>
                            <div className="relative">
                                <select onChange={ev => setType(ev.target.value)} 
                                    className={`${errors.type ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                    id="grid-state"
                                >
                                    <option value='' selected>Anouncements Type</option>
                                    <option value='Event'>Event</option>
                                    <option value='Announcements'>Announcements</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            {errors.type ? <p class="text-red-500 text-xs italic mt-4">{errors.type}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Recipents
                            </label>
                            <div className="relative">
                                <select onChange={ev => setUserInfo({...userInfo, recipent: ev.target.value})} 
                                    className={`${errors.recipent ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                    id="grid-state"
                                >
                                    <option value='' selected>Select Recipents</option>
                                    <option value='barangay_admins'>Barangay Admins</option>
                                    <option value='seniors'>Seniors</option>
                                    <option value='all'>Baragay Admin & Seniors</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            {errors.recipent ? <p class="text-red-500 text-xs italic mt-4">{errors.recipent}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Title
                            </label>
                            <input 
                                onChange={ev => setUserInfo({...userInfo, title: ev.target.value})}
                                id="grid-last-name" 
                                type="text" 
                                placeholder="title"
                                class={`${errors.title ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.title ? <p class="text-red-500 text-xs italic">{errors.title}</p> : null}
                            </div>
                        </div>
                        {
                            type ? <>
                                <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                                    <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Date Event
                                    </label>
                                    <input 
                                        onChange={ev => setUserInfo({...userInfo, date: ev.target.value})}
                                        id="grid-last-name" 
                                        type="datetime-local" 
                                        placeholder="Doe"
                                        class={`${errors.date ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                        />
                                        {errors.date ? <p class="text-red-500 text-xs italic">{errors.date}</p> : null}
                                    </div>
                                </div>
                            </> : null
                        }
                        
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Description
                            </label>
                                <textarea 
                                    name="" 
                                    onChange={ev => setUserInfo({...userInfo, description: ev.target.value})}
                                    className={`${errors.description ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}  
                                    id="" 
                                    cols="30" 
                                    rows="10"></textarea>
                                {errors.description ? <p class="text-red-500 text-xs italic">{errors.description}</p> : null} 
                            </div>
                        </div>

                        <div className='mt-5 flex items-center justify-between'>
                            <div></div>
                            <button
                                type="submit"
                                className="ml-1 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            >
                                <div className='flex items-center justify-center'>
                                    {
                                        btnLoading ? 
                                        <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg> : null
                                    }
                                    
                                    Create
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

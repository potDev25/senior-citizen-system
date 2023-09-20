import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
import Profile from '../../assets/images/profile.png'
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../Context/ContextProvider';

export default function EditStaff({hideModal, handleLoading, user, barangays}) {
    const [btnLoading, setLoading] = useState(false)
    const [photo, _setPhoto] = useState('')
    const [image, setImage] = useState('')
    const [errors, setErrors] = useState([])
    const {setNotification} = useStateContext()
    const [currentPassword, setCurrentPassword] = useState({
        password: ''
    }) 
    const [userInfo, setUserInfo] = useState({
        last_name: '',
        first_name: '',
        contact_email: '',
        contact_number: '', 
        gender: '',
        birthdate: '',
        city: '',
        province: '',
        barangay: '',
        role: '',
        photo: '',
        designation: '',
    })

    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
          setUserInfo({...userInfo, photo: event.target.files[0]})
        }
    }

    const closeModal = () => {
        setImage('')
        hideModal()
    }

    // const checkPassword = (ev) => {
    //     setCurrentPassword(prevPassword => ({
    //         ...prevPassword,
    //         password: ev.target.value
    //     }));
    // }

    // useEffect(() => {
    //     axiosClient.post(`/staff/check-password/${user.id}`, currentPassword)
    //         .then(() => {

    //         })
    // }, [currentPassword, user.id])

    function submitUser(ev) {
        ev.preventDefault();
        console.log(userInfo);
        setLoading(true)
        axiosClient.post(`/staff/edit/${user.user_id}`, userInfo, config)
            .then(({data}) => {
                setLoading(false)
                setNotification('Staff Profile Edited Successfully')
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
  return (
    <div className='flex gap-5 items-center justify-center'>
        <div className='bg-white shadow-sm h-fit md:w-[700px] rounded'>
            <div className='flex flex-col items-center justify-center'>
                <div className='h-[200px] w-[200px] rounded-full bg-blue-500'>
                    <img src={user && image === '' ?  import.meta.env.VITE_API_BASE_URL + '/storage/' + user.photo : image } 
                        className='h-full w-full rounded-full'
                    />
                </div>
                <label htmlFor="myProfile" className='cursor-pointer text-center border-2 border-dashed border-gray-300 p-2 rounded-md mt-5'>
                    <div className='flex items-center justify-center gap-2'>
                    <FaIcon.FiUpload/>    Upload Profile Picture
                    </div>
                </label>
                <input type="file" id='myProfile' onChange={onImageChange} className='hidden'/>
                {errors.photo ? <p class="text-red-500 text-xs italic mt-2">{errors.photo}</p> : null}
            </div> 
            <div className='p-5 mt-5'>
                <div className='mt-5 flex items-center justify-center'>
                    <form class="w-full" onSubmit={submitUser}>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input 
                                onChange={ev => setUserInfo({...userInfo, first_name: ev.target.value})}
                                defaultValue={user.first_name}
                                id="grid-first-name" 
                                type="text" 
                                placeholder="Jane"
                                class={`${errors.first_name ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                            />
                            {errors.first_name ? <p class="text-red-500 text-xs italic">{errors.first_name}</p> : null}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input 
                                onChange={ev => setUserInfo({...userInfo, last_name: ev.target.value})}
                                defaultValue={user.last_name}
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe"
                                class={`${errors.first_name ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.first_name ? <p class="text-red-500 text-xs italic">{errors.first_name}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Contact Email
                            </label>

                            <input 
                                onChange={ev => setUserInfo({...userInfo, contact_email: ev.target.value})}
                                defaultValue={user.email}
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe"
                                class={`${errors.contact_email ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.contact_email ? <p class="text-red-500 text-xs italic">{errors.contact_email}</p> : null}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Contact Number
                            </label>
                            <input 
                                onChange={ev => setUserInfo({...userInfo, contact_number: ev.target.value})}
                                defaultValue={user.cotact_number}
                                id="grid-last-name" 
                                type="text" 
                                placeholder="Doe"
                                class={`${errors.contact_number ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.contact_number ? <p class="text-red-500 text-xs italic">{errors.contact_number}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Province
                                </label>
                                <div className="relative">
                                    <select onChange={ev => setUserInfo({...userInfo, province: ev.target.value})} 
                                        className={`${errors.province ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                        id="grid-state"
                                    >
                                    <option value={user.province} selected hidden>{user ? user.province : 'Province'}</option>
                                    <option>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                {errors.province ? <p class="text-red-500 text-xs italic mt-4">{errors.province}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    City/Municipality
                                </label>
                                <div className="relative">
                                    <select onChange={ev => setUserInfo({...userInfo, city: ev.target.value})} 
                                        className={`${errors.city ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                        id="grid-state"
                                    >
                                    <option value={user.city} selected hidden>{user ? user.city : 'City'}</option>
                                    <option>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                {errors.city ? <p class="text-red-500 text-xs italic mt-4">{errors.city}</p> : null}
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Barangay
                                </label>
                                <div className="relative">
                                    <select onChange={ev => setUserInfo({...userInfo, barangay: ev.target.value})} 
                                        className={`${errors.barangay ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                        id="grid-state"
                                    >
                                    <option value={user.barangay} selected hidden>{user ? user.barangay : 'Barangay'}</option>
                                    <option>New Mexico</option>
                                    <option>Missouri</option>
                                    <option>Texas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                {errors.barangay ? <p class="text-red-500 text-xs italic mt-4">{errors.barangay}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Gender
                            </label>
                            <div className="relative">
                                <select onChange={ev => setUserInfo({...userInfo, gender: ev.target.value})} 
                                    className={`${errors.gender ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                    id="grid-state"
                                >
                                    <option value={user.gender} selected hidden>{user ? user.gender : 'Gender'}</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            {errors.gender ? <p class="text-red-500 text-xs italic mt-4">{errors.gender}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Role
                                </label>
                                <div className="relative">
                                    <select onChange={ev => setUserInfo({...userInfo, designation: ev.target.value})} 
                                        className={`${errors.designation ? 'border-red-500' : 'border-gray-200'} block appearance-none w-full bg-gray-200 border  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} 
                                        id="grid-state"
                                    >
                                         <option value={user.dep_designation}>{user.dep_designation}</option>
                                        {
                                            barangays.map((barangay, id) => (
                                                <option value={barangay.id}>{barangay.designation}</option>
                                            ))
                                        }
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                {errors.role ? <p class="text-red-500 text-xs italic mt-4">{errors.role}</p> : null}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Birthdate
                            </label>
                            <input 
                                onChange={ev => setUserInfo({...userInfo, birthdate: ev.target.value})}
                                id="grid-last-name" 
                                type="date" 
                                defaultValue={user.birthdate}
                                placeholder="Doe"
                                class={`${errors.birthdate ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.birthdate ? <p class="text-red-500 text-xs italic">{errors.birthdate}</p> : null}
                            </div>
                        </div>
                        {/* <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Current Password
                            </label>
                            <input 
                                onChange={ev => checkPassword(ev)}
                                id="grid-last-name" 
                                type="password" 
                                placeholder="******************"
                                class={`${errors.password ? 'border border-red-500' : 'border-none'} appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} 
                                />
                                {errors.password ? <p class="text-red-500 text-xs italic">{errors.password}</p> : null}
                            </div>
                        </div> */}

                        <div className='mt-5 flex items-center justify-between'>
                            <div>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="ml-1 inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Cancel
                                </button>
                            </div>
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
                                    
                                    Edit
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

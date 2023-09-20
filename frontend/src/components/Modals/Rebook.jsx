import React, { useEffect, useState } from 'react'
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

export default function Rebook({handleLoading, show, hideModal, passengerId, dateId}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const [date, setDate] = useState({
    date: '',
  })

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
        timer: 1800
      })
}
   
  const handleSubmit = (e) => {
    setBtnLoading(true)
    e.preventDefault()

    axiosClient.put(`/ticket/rebook/${passengerId}/${dateId}`, date)
        .then(({data}) => {
            setErrors([]);
            successAlert('Rebook Action Completed!')
            setBtnLoading(false)
            handleLoading(true)
            // handleHideModal()
            window.location.reload();
        })
        .catch((error) => {
            if(error.response.data.errors){
              setErrors(error.response.data.errors);
            }else{
              errorlert('Server error please try again later!')
            }
            setBtnLoading(false)
        })
  }

  const handleHideModal = () => {
    setShowModal(false)
    hideModal(false)
  }

  return (
      <form onSubmit={handleSubmit}>
        {/* <!-- Modal --> */}
        <TEModal show={show} setShow={handleHideModal}>
          <TEModalDialog size='lg' centered>
            <TEModalContent>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-xl text-gray-500 font-medium leading-normal dark:text-neutral-200 uppercase">
                  Rebook Passenger
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={handleHideModal}
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
              {/* <!--Modal body--> */}

              <TEModalBody>
                <div className='grid grid-cols-1 gap-5 p-5'>
                        <div className='w-full mb-5'>
                        <label htmlFor="" className='text-gray-500'>Name</label>
                        <input
                            onChange={ev => setDate({...date, date: ev.target.value})} 
                            type="date" id="first_name" 
                            placeholder='Enter Name'
                            className={` ${errors.date ? 'border-red-500' : 'border-gray-300'} border w-full  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 `}
                        />
                        {
                            errors.date ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> {errors.date}</p>
                            : null
                        }
                    </div>
                </div>

              </TEModalBody>

              <TEModalFooter>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-red-500 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={handleHideModal}
                  >
                    Cancel
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
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
                        
                        Submit
                    </div>
                  </button>
                </TERipple>
              </TEModalFooter>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </form>
    );
}

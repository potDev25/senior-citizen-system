import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
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
import  Swal  from 'sweetalert2/dist/sweetalert2';
import AddStaff from '../../AddStaff';
import AddDepartmentStaff from '../../AddDepartmentStaff';


export default function AddDepartmentStaffModal({handleLoading, show, hideModal, dateId, departmentId}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const [tab, setTab] = useState('details')
  const [manifest_id, setManifestId] = useState(null)

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

  const handleTab = (ev) => {
    setTab(ev)
  }
   

  const loadingToast = (title) => {
    Swal.fire({
      title: title,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  const hideLoadingToast = () => {
    Swal.fire({
      showConfirmButton: false,
      didOpen: () => {
        Swal.hideLoading()
      }
    })
  }

  const alertMessage = (text, icon) =>{
    Swal.fire({
      icon: icon,
      text: text,
      showConfirmButton: true,
      confirmButtonColor: 'red'
    })
  }


  const handleHideModal = () => {
    setShowModal(false)
    hideModal(false)
  }

  return (
      <>
        {/* <!-- Modal --> */}
        <TEModal show={show} setShow={handleHideModal} scrollable staticBackdrop>
          <TEModalDialog size='lg' centered >
            <TEModalContent>
              <TEModalHeader className='bg-white text-white'>
                {/* <!--Modal title--> */}
                    <h1 className='uppercase text-2xl text-gray-500 flex items-center'><FaIcon.FiPlusCircle/> &nbsp;add add staff</h1>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content text-gray-500 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
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
                <div className='flex items-center justify-center '>
                  <AddDepartmentStaff
                    handleLoading={handleLoading}
                    hideModal={hideModal}
                    departmentId={departmentId}
                  />
                </div>
              </TEModalBody>

            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

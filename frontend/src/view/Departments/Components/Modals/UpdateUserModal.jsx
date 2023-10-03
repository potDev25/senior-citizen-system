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
import EditStaff from '../../EditStaff';
import EditUser from '../../EditUser';


export default function UpdateUserModal({handleLoading, show, hideModal, user, barangays}) {
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
              <TEModalHeader className='bg-white text-gray-900'>
                {/* <!--Modal title--> */}
                    <h1 className='uppercase text-2xl text-gray-900 flex items-center'><FaIcon.FiEdit/> &nbsp;edit profile</h1>
                {/* <!--Close button--> */}
              </TEModalHeader>
              {/* <!--Modal body--> */}

              <TEModalBody>
                <div className='flex items-center justify-center '>
                  <EditUser
                    handleLoading={handleLoading}
                    hideModal={hideModal}
                    user={user}
                    barangays={barangays}
                  />
                </div>
              </TEModalBody>

            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </>
    );
}

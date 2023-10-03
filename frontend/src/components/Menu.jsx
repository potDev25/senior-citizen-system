import React, { useEffect } from 'react'
import * as FaIcon from "react-icons/fi";
import Option from './Option';
import TicketingTable from './Tables/TicketingTable';
import { useState } from 'react';
import { useRef } from 'react';
import ScanModal from './Modals/ScanModal';
import axiosClient from '../axiosClient';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import TableSpiral from './Spiral/TableSpiral';
import ManualTicketing from './Modals/ManualTicketing';
import ProfileModal from './Modals/ProfileModal';
import ChairsManualModal from './Modals/ChairsManualModal';
import ManifestToPrint from './Tables/ManifestToPrint';
import ReactToPrint from 'react-to-print';
import SubmitManifestModal from './Modals/SubmitManifestModal';
import ManifestLayout from './Layout/ManifestLayout';
import RebookModal from './Modals/RebookModal';

export default function Menu() {

    const [date, _setDate] = useState('')
    const [time, setTime] = useState('')
    const [dateId, setDateId] = useState()
    const [route, setRoute] = useState('')
    const [routes, setRoutes] = useState([])
    const [final, seFinal] = useState(false)
    const [manifestAction, _setAction] = useState()
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [manifest, setManifest] = useState([])
    const [passengers, setPassengers] = useState([]);
    const [showManual, SetManual] = useState(false);
    const [showRebook, SetRebook] = useState(false);
    const [showRefund, SetRefund] = useState(false);
    const [showProfile, setProfileModal] = useState(false);
    const [showChairs, setShowChairs] = useState(false);
    const [btnSave, setBtnSave] = useState(false);
    const [numbers, setNumber] = useState([])

    const [passenger, _setPassenger] = useState([]);
    const [manifestData, setManifestData] = useState([]);
    const [rebookPassengers, setRebookPassengers] = useState([]);
    const [manifest_id2, setManifestId2] = useState(null)
    const componentRef = useRef();

    const setPassengerProfile = (passenger) => {
        _setPassenger(passenger)
        SetManual(false)
        setProfileModal(true)
    }

    const handleShowChairs = (manifestDataId) => {
        setManifestId2(manifestDataId)
        setShowChairs(true)
    }

    const hideChairModal = () => {
        setShowChairs(false)
    }

    const hideProfileModal = () => {
        setProfileModal(false)
    }

    // const setDate = (ev) => {
    //     _setDate(ev)
    // }

    const finalDate = () => {
        seFinal(true)
    }

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

    const setAction = () => {

        if(route === ''){
            Swal.fire({
                icon: 'error',
                text: 'Please Enter Date and Route!',
                confirmButtonColor: 'red'
            })
        }else{

            Swal.fire({
                title: 'Processing',
                didOpen: () => {
                  Swal.showLoading()
                }
            })

            const data = {
                route: route
            }

            axiosClient.post('/store-manifest', data)
                .then(({data}) => {
                    if(data.status == 200){
                        Swal.fire({
                            icon: 'success',
                            text: 'New Manifest Created Successfully!',
                            confirmButtonColor: 'blue',
                            confirmButtonText: 'Continue'
                        })
                        .then((result) => {
                            result.isConfirmed && window.location.reload()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    const hideModal = (hide) => {
        SetManual(hide)
    }

    const hideRebookModal = (hide) => {
        SetRebook(hide)
    }

    const getManifest = (manifest) => {
        setManifestData(manifest)
    }

    useEffect(() => {

        axiosClient.get('/manifest-action')
            .then(({data}) => {
                // console.log(data.action)
                setRoutes(data.routes)
                setLoading(false)
                _setAction(data.action)
                if(data.manifestDate){
                    // setDate(data.manifestDate.date)
                    setTime(data.manifestDate.time)
                    setDateId(data.manifestDate.id)
                    setRoute(data.manifestDate.route)
                    setNumber(data.number)
                    setRebookPassengers(data.rebookPassengers)
                    _setDate(data.date)
                }
                
            })
            .catch(err => {
                setLoading(false)
                _setAction(false)
            })

        axiosClient.get('/get-passengers-approved/5000?page=1')
            .then(({data}) => {
                setPassengers(data.data)
            })
            .catch(err => {
                setLoading(false)
                _setAction(false)
            })
    }, [loading])


    
  return (
    <> 
        <div className='lg:flex md:flex gap-2'>

            <ProfileModal
                passenger={passenger}
                setChair={handleShowChairs}
                show={showProfile}
                hideModal={hideProfileModal}
                dateId={dateId}
            />

            <ChairsManualModal
                show={showChairs}
                hideModal={hideChairModal}
                passenger={passenger}
                manifestDataId={manifest_id2}
            />

            <div className='hidden'>
                <ManifestToPrint
                    manifest={manifestData}
                    ref={componentRef}
                />
            </div>

            <div className='bg-white shadow-sm h-fit sm:mb-5 md:w-[30%] px-5 py-2 rounded md:block lg:block'>
                <ScanModal date={dateId}/>
            </div>
            <TicketingTable title={date} dateId={dateId} manifest={manifest} time={time} getManifestData={getManifest}>
                {manifestAction == 'true' &&
                <div className='mt-5 flex justify-between'>
                    <div></div>
                    <SubmitManifestModal/>
                </div>
                }
            </TicketingTable>
        </div>
    </>
  )
}
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
    const [showProfile, setProfileModal] = useState(false);
    const [showChairs, setShowChairs] = useState(false);
    const [btnSave, setBtnSave] = useState(false);

    const [passenger, _setPassenger] = useState([]);
    const [manifestData, setManifestData] = useState([]);
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
                    _setDate(data.date)
                }
                
            })
            .catch(err => {
                setLoading(false)
                _setAction(false)
            })

        axiosClient.get('/get-passengers-approved')
            .then(({data}) => {
                setPassengers(data.data)
            })
            .catch(err => {
                setLoading(false)
                _setAction(false)
            })
    }, [loading])


    
  return (
    <div className='flex gap-2'>

        <ManualTicketing 
            show={showManual}
            hideModal={hideModal}
            passengers={passengers}
            setPassengerProfile={setPassengerProfile}
            dateId={dateId}
        />

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

        <div className='bg-white shadow-sm h-fit  md:w-[30%] px-5 py-2 rounded md:block lg:block sm:hidden'>
            <h1 className='text-md mb-4 font-bold tracking-wide'>Ticketing Menu</h1>

            <table className='md:table-auto w-full text-sm mt-2'>
                <tbody>
                {loading && <TableSpiral/>}
                <tr>
                    <td className='text-gray-500 flex items-center cursor-pointer p-3'>
                    {manifestAction == 'false' && <select onChange={ev => setRoute(ev.target.value)} name="" id="" className='w-full border rounded-[5px] border-gray-300 text-gray-500'>
                            <option value="" selected hidden><FaIcon.FiArrowUp/> Select Route</option>
                            {
                                routes.map((route) => (
                                    <option key={route.id} value={`${route.from} - ${route.to} / ${route.departure}`}>{route.from} - {route.to} {route.departure}</option>
                                ))
                            }
                        </select>}

                        {manifestAction == 'true' && <div className='uppercase w-full border rounded-[5px] border-gray-300 text-gray-500 py-2 px-5'>
                                {route}
                            </div>}
                    </td>
                    <td className='text-gray-500 flex items-center cursor-pointer p-3'>
                        <div className='flex items-center justify-between gap-2 w-full'>
                            {/* {manifestAction == 'true' && <div className='w-full border rounded-[5px] border-gray-300 text-gray-500 py-2 px-5'>
                                {date}
                            </div>} */}

                            {/* {manifestAction == 'false' && (<input onChange={ev => setDate(ev.target.value)} type="date" className='w-full border rounded-[5px] border-gray-300 text-gray-500'/>)} */}

                            {manifestAction == 'false' && (
                                <button onClick={setAction} className='w-[30%] rounded border border-2-gray-500 bg-sky-500 p-2.5 text-white flex items-center'><FaIcon.FiSave/> &nbsp;Save</button>
                            )}
                        </div>
                    </td>
                    {manifestAction == 'true' && <>
                    <td className='text-gray-500 flex items-center cursor-pointer hover:bg-sky-200 p-3'>

                        <ScanModal date={dateId}/>

                    </td>
                    <td className='text-gray-500 flex items-center cursor-pointer hover:bg-sky-200 p-3'>
                        <button 
                            onClick={ev => SetManual(true)}
                            className='w-full rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiPaperclip/>
                             &nbsp;Manual
                        </button>
                    </td>
                    <td className='text-gray-500 flex items-center cursor-pointer hover:bg-sky-200 p-3'>
                    <ReactToPrint
                        trigger={() => <button className='w-full rounded text-gray-500 border border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiPrinter/> &nbsp;Print Manifest</button>}
                        content={() =>  componentRef.current}
                    />
                    </td>
                    </>}
                    
                </tr>
                </tbody>
            </table>
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
  )
}
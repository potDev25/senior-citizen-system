import React, { useState } from 'react'
import Logo from '../../assets/images/logo-3.png'
import qr from '../../assets/images/qr.png'
import * as FaIcon from "react-icons/fi";
import { useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';

export default function Ticket() {
  const {manifest_id} = useParams();
  const {pass_id} = useParams();
  const {manifest_data} = useParams();
  const [passengers, setPassengers] = useState([])
  const [manifest, setManifest] = useState([])
  const [manifestDate, setManifestDate] = useState([])
  const [id_number, setIdNumber] = useState([])
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [fair, _setFair] = useState(null)
  const [ticket_data, setTicket] = useState({
    manifest_date_id : manifest_data,
    passenger_id: pass_id,
    manifest_data_id: manifest_id,
  })

  const submitTicket = () => {
    console.log(ticket_data);
    axiosClient.post(`/ticket/store/${manifest_id}`, ticket_data)
      .then(({data}) => {
        setBtnLoading(false)
        window.location.replace('/ticketing')
      })
      .catch(() => {
        setBtnLoading(false)
        alert('Server Error Please Try Again Later')
      })
  }

  const setFair = () =>{
    manifest.type === 'Student' && setTicket({...ticket_data, fair: '250'})
    manifest.type === 'Regular' && setTicket({...ticket_data, fair: '300'})
    manifest.type === 'PWD' && setTicket({...ticket_data, fair: 'PWD'})
    manifest.type === 'Senior' && setTicket({...ticket_data, fair: '250'})
  }

  useState(() => {
    axiosClient.get(`/get-ticket-info/${manifest_id}/${pass_id}/${manifest_data}`)
      .then(({data}) => {
        setPassengers(data.passenger)
        setManifest(data.manifestData)
        setManifestDate(data.manifestDate)
        setIdNumber(data.id_number)
        setLoading(false)
      })
      .catch(() => {
        alert('Server Error Please Try Again Later')
      })
  }, [loading])
  return (
    <>

    <div className='btnmb-4 rounded flex items-center justify-center mb-5 gap-2'>
      <button className='rounded text-gray-500 border bg-white border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center'><FaIcon.FiPrinter/> &nbsp;Print</button>
      <button 
        onClick={submitTicket}
        className={`${btnLoading && 'cursor-not-allowed'} rounded text-white border bg-green-500 border-2-gray-500 hover:bg-sky-500 hover:text-white px-5 py-2 flex items-center`}>

          <div className='flex items-center justify-center gap-2'>

                {btnLoading && <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>}
                <FaIcon.FiCheckCircle/>Done
            </div>
        </button>
    </div>

    <div className='flex items-center justify-center'>

    

      <div className='bg-white w-[500px] h-[500px] p-5'>
        <div className='flex items-center justify-center gap-5 w-full'>
          <div>
            <img src={Logo} className='h-[100px] w-[50px]' alt="" />
          </div>
          <div className='text-justify'>
            <h1 className='text-lg text-black uppercase font-extrabold'>8rja express lines inc.</h1>
            <p className='text-justify text-[9px] font-light'>
              2nd Floor Muertegui BLdg. Cor Abad & Smo Rosario Santissimo Rosario <br />
              Pob (Santo Rosa) 6560 Naval(capital) Biliran Phiippines <br />
              Non-VAT Reg TIN 010-689-895-00000 <br />
              Mobile No. 0999-880-6219 Tel No. 053-500-0238 <span className='font-bold'>Fast Craft's Copy</span>
            </p>
          </div>
          <div>
          <img src={qr} className='h-[100px] w-[50px]' alt="" />
          </div>
        </div>

        <div className='w-full border-[1px] border-black'>
          <ul>
            <li className='border-b-[1px] border-black text-[12px] p-2'>Name/Age: {passengers.last_name + ' ' + passengers.first_name}</li>
            <li className='border-b-[1px] border-black text-[12px] p-2 capitalize'>Route: {manifestDate.route}</li>
            <li className='border-b-[1px] border-black text-[12px] grid grid-cols-2'>
              <p className='px-2'>
              Boat/Voyage No. 
              <br /> <span className='font-semibold'>M/V Rosal-Lito Express</span> 
              </p>
              <div className='border-l-[1px] border-black px-2'>
                Seat No. <br />{manifest.set_number}
              </div>
            </li>
            <li className='border-b-[1px] border-black text-[12px] p-2'>Departure Date/Time: 10:43 AM</li>
            <li className='text-[12px] grid grid-cols-2'>
              <p className='px-2'>
               Fare: {
                manifest.type === 'Student' && '250.00'
               }
               {
                manifest.type === 'Regular' && '300.00'
               }
               {
                manifest.type === 'Senior' && '250.00'
               }
               {
                manifest.type === 'PWD' && '250.00'
               }
              </p>
              <div className='border-l-[1px] border-black px-2'>
                Total: {
                manifest.type === 'Student' && '250.00'
               }
               {
                manifest.type === 'Regular' && '300.00'
               }
               {
                manifest.type === 'Senior' && '250.00'
               }
               {
                manifest.type === 'PWD' && '250.00'
               }
              </div>
            </li>
          </ul>
        </div>
        <span className='text-[8px] font-semibold'>NOTE</span>
        <div className='grid grid-cols-2 gap-12'>
          <div>
            <p className='text-[8px] font-semibold'>1. Please check-in at least 30 mins. before departure time.</p>
            <p className='text-[8px] font-semibold'>2. Only one (1) hand carried bagage allowed </p>
            <p className='text-[8px] font-semibold'>3. Any altertion will invalidate this ticket </p>
          </div>
          <div>
            <p className='text-[8px] font-semibold'>4. This ticket is not transfarable</p>
            <p className='text-[8px] font-semibold'>5. Ticket is not valid for refund without check-link slip </p>
          </div>
        </div>

        <span className='font-bold text-[12px]'>Remarks</span>
        <p className='text-[10px] font-semibold'>Sr. Citizen TIN: <span className='border-b-[1px] border-black'>
              {passengers.type === 'Senior' && id_number.id_number}
          </span></p>
        <p className='text-[10px] font-semibold'>OSCA/PWD ID/STUDENT ID NO. <span className='border-b-[1px] border-black'>
              {passengers.type !== 'Senior' && id_number.id_number}
          </span></p>
        <p className='text-[10px] font-semibold mt-2'>Signature______________________________     <span className='font-semibold'>*THIS DOCUMENT IS NOT VALID FOR CLAIMING TAXES*</span></p>
        <p className='text-[8px] font-semibold'>500 bKITS (50x3) 1500 BIR Authority to print CN <span className='border-b-[1px] border-black'>088AU2023000000000194</span> 
        <br />
        <span className='font-bold'>LA-NAVAL PRINTING PRESS</span> Vicentillo Extn. Naval Biliran TIN: 126-671-011-000 NV
        </p>
        <p className='text-[10px] font-semibold'>Printers Accreditation No <span className='border-b-[1px] border-black'>088-MP2019-000000002</span> 
        Date Issued: <span className='border-b-[1px] border-black'> Feb 27, 2019</span> <span className='text-md font-bold'>LNPP</span></p>
      </div>

      <div className='bg-pink-100 w-[500px] h-[500px] p-5'>
      <div className='flex items-center justify-center gap-5 w-full'>
          <div>
            <img src={Logo} className='h-[100px] w-[50px]' alt="" />
          </div>
          <div className='text-justify'>
            <h1 className='text-lg text-black uppercase font-extrabold'>8rja express lines inc.</h1>
            <p className='text-justify text-[9px] font-light'>
              2nd Floor Muertegui BLdg. Cor Abad & Smo Rosario Santissimo Rosario <br />
              Pob (Santo Rosa) 6560 Naval(capital) Biliran Phiippines <br />
              Non-VAT Reg TIN 010-689-895-00000 <br />
              Mobile No. 0999-880-6219 Tel No. 053-500-0238 <span className='font-bold'>Fast Craft's Copy</span>
            </p>
          </div>
          <div>
          <img src={qr} className='h-[100px] w-[50px]' alt="" />
          </div>
        </div>

        <div className='w-full border-[1px] border-black'>
          <ul>
            <li className='border-b-[1px] border-black text-[12px] p-2'>Name/Age: {passengers.last_name + ' ' + passengers.first_name}</li>
            <li className='border-b-[1px] border-black text-[12px] p-2 capitalize'>Route: {manifestDate.route}</li>
            <li className='border-b-[1px] border-black text-[12px] grid grid-cols-2'>
              <p className='px-2'>
              Boat/Voyage No. 
              <br /> <span className='font-semibold'>M/V Rosal-Lito Express</span> 
              </p>
              <div className='border-l-[1px] border-black px-2'>
                Seat No. <br />{manifest.set_number}
              </div>
            </li>
            <li className='border-b-[1px] border-black text-[12px] p-2'>Departure Date/Time: 10:43 AM</li>
            <li className='text-[12px] grid grid-cols-2'>
              <p className='px-2'>
               Fare: {
                manifest.type === 'Student' && '250.00'
               }
               {
                manifest.type === 'Regular' && '300.00'
               }
               {
                manifest.type === 'Senior' && '250.00'
               }
               {
                manifest.type === 'PWD' && '250.00'
               }
              </p>
              <div className='border-l-[1px] border-black px-2'>
                Total: {
                manifest.type === 'Student' && '250.00'
               }
               {
                manifest.type === 'Regular' && '300.00'
               }
               {
                manifest.type === 'Senior' && '250.00'
               }
               {
                manifest.type === 'PWD' && '250.00'
               }
              </div>
            </li>
          </ul>
        </div>
        <span className='text-[8px] font-semibold'>NOTE</span>
        <div className='grid grid-cols-2 gap-12'>
          <div>
            <p className='text-[8px] font-semibold'>1. Please check-in at least 30 mins. before departure time.</p>
            <p className='text-[8px] font-semibold'>2. Only one (1) hand carried bagage allowed </p>
            <p className='text-[8px] font-semibold'>3. Any altertion will invalidate this ticket </p>
          </div>
          <div>
            <p className='text-[8px] font-semibold'>4. This ticket is not transfarable</p>
            <p className='text-[8px] font-semibold'>5. Ticket is not valid for refund without check-link slip </p>
          </div>
        </div>

        <span className='font-bold text-[12px]'>Remarks</span>
        <p className='text-[10px] font-semibold'>Sr. Citizen TIN: <span className='border-b-[1px] border-black'>
              {passengers.type === 'Senior' && id_number.id_number}
          </span></p>
        <p className='text-[10px] font-semibold'>OSCA/PWD ID/STUDENT ID NO. <span className='border-b-[1px] border-black'>
              {passengers.type !== 'Senior' && id_number.id_number}
          </span></p>
        <p className='text-[10px] font-semibold mt-2'>Signature______________________________     <span className='font-semibold'>*THIS DOCUMENT IS NOT VALID FOR CLAIMING TAXES*</span></p>
        <p className='text-[8px] font-semibold'>500 bKITS (50x3) 1500 BIR Authority to print CN <span className='border-b-[1px] border-black'>088AU2023000000000194</span> 
        <br />
        <span className='font-bold'>LA-NAVAL PRINTING PRESS</span> Vicentillo Extn. Naval Biliran TIN: 126-671-011-000 NV
        </p>
        <p className='text-[10px] font-semibold'>Printers Accreditation No <span className='border-b-[1px] border-black'>088-MP2019-000000002</span> 
        Date Issued: <span className='border-b-[1px] border-black'> Feb 27, 2019</span> <span className='text-md font-bold'>LNPP</span></p>
      </div>

    
    </div>

    </>
  )
}

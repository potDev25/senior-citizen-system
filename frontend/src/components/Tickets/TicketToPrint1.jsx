import React, { useRef } from 'react'
import Logo from '../../assets/images/logo-3.png'
import qr from '../../assets/images/qr.png'

export default function TicketToPrint({fare, ticket, passengers, manifest, id_number, manifestDate, ref}) {
  return (
    <div className='flex items-center justify-center'>
        <div className='bg-white w-[500px] h-[500px] p-5'>
          <div className='flex items-center justify-center gap-5 w-full'>
            <div>
              <img src={Logo} className='h-[100px] w-[50px]' alt="" />
            </div>
            <div className='text-justify'>
              <h1 className='text-lg text-black uppercase font-extrabold'>8rja express lines inc.</h1>
              <p className='text-justify text-[9px] font-light'>
                {ticket.office_address} <br />
                {ticket.original_address} <br />
                {ticket.type} Reg TIN {ticket.tin_no} <br />
                Mobile No. {ticket.mobile} Tel No. {ticket.telephone} <span className='font-bold'>Fast Craft's Copy</span>
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
                  manifest.type === 'Student' && fare.student + '.00'
                }
                {
                  manifest.type === 'Regular' && fare.regular + '.00'
                }
                {
                  manifest.type === 'Senior' && fare.senior + '.00'
                }
                {
                  manifest.type === 'PWD' && fare.pwd + '.00'
                }
                {
                  manifest.type === 'Minor' && fare.minor + '.00'
                }
                </p>
                <div className='border-l-[1px] border-black px-2'>
                  Total:  {
                  manifest.type === 'Student' && fare.student + '.00'
                }
                {
                  manifest.type === 'Regular' && fare.regular + '.00'
                }
                {
                  manifest.type === 'Senior' && fare.senior + '.00'
                }
                {
                  manifest.type === 'PWD' && fare.pwd + '.00'
                }
                {
                  manifest.type === 'Minor' && fare.minor + '.00'
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
                {ticket.office_address} <br />
                {ticket.original_address} <br />
                {ticket.type} Reg TIN {ticket.tin_no} <br />
                Mobile No. {ticket.mobile} Tel No. {ticket.telephone} <span className='font-bold'>Fast Craft's Copy</span>
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
                  manifest.type === 'Student' && fare.student + '.00'
                }
                {
                  manifest.type === 'Regular' && fare.regular + '.00'
                }
                {
                  manifest.type === 'Senior' && fare.senior + '.00'
                }
                {
                  manifest.type === 'PWD' && fare.pwd + '.00'
                }
                {
                  manifest.type === 'Minor' && fare.minor + '.00'
                }
                </p>
                <div className='border-l-[1px] border-black px-2'>
                  Total:  {
                  manifest.type === 'Student' && fare.student + '.00'
                }
                {
                  manifest.type === 'Regular' && fare.regular + '.00'
                }
                {
                  manifest.type === 'Senior' && fare.senior + '.00'
                }
                {
                  manifest.type === 'PWD' && fare.pwd + '.00'
                }
                {
                  manifest.type === 'Minor' && fare.minor + '.00'
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
  )
}

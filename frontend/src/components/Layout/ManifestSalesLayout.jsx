import React from 'react'
import * as FaIcon from "react-icons/fi";
import BoxSpiral from '../Spiral/BoxSpiral';

export default function ManifestSalesLayout({number, loading, sales}) {
  return (
    <div className='dashboard grid sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-2 gap-2 mb-5'>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
           
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Regulars : {number.regulars ? number.regulars : '0'}</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-2xl font-sm text_number font-medium tracker-wide'>&#8369; {sales.regular}</span>
                </div> 
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Minor : {sales.minor ? number.minors : '0'}</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-2xl font-sm text_number font-medium tracker-wide'>&#8369; {sales.minor}</span>
                </div>
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Student: {number.student ? number.student : '0'}</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-2xl font-sm text_number font-medium tracker-wide'>&#8369; {sales.student}</span>
                </div>
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Seniors : {number.senior ? number.senior : '0'}</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :  <div className='flex justify-between items-center'>
                        <span className='text-2xl font-sm text_number font-medium tracker-wide'>&#8369; {sales.senior}</span>
                </div>
            }
           
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>PWD : {number.pwd ? number.pwd : '0'}</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :   <div className='flex justify-between items-center'>
                        <span className='text-2xl font-sm text_number font-medium tracker-wide'>&#8369; {sales.pwd}</span>
                </div>
            }
           
        </div>
        
    </div>
  )
}

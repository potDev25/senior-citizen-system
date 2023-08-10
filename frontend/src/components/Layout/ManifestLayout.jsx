import React from 'react'
import * as FaIcon from "react-icons/fi";
import BoxSpiral from '../Spiral/BoxSpiral';

export default function ManifestLayout({number, loading}) {
  return (
    <div className='dashboard grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-2 mb-5'>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
           
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Regulars</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.regulars ? number.regulars : '0'}</span>
                </div> 
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Minor</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.minors ? number.minors : '0'}</span>
                </div>
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Student</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                : <div className='flex justify-between items-center'>
                    <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.student ? number.student : '0'}</span>
                </div>
            }
            
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Seniors</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :  <div className='flex justify-between items-center'>
                        <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.senior ? number.senior : '0'}</span>
                </div>
            }
           
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>PWD</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :   <div className='flex justify-between items-center'>
                        <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.pwd ? number.pwd : '0'}</span>
                </div>
            }
           
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Refund</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :   <div className='flex justify-between items-center'>
                        <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.refund ? number.refund : '0'}</span>
                </div>
            }
           
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>Rebook</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :  <div className='flex justify-between items-center'>
                        <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.rebook ? number.rebook : '0'}</span>
                </div>
            }
        </div>

        <div className='bg-white shadow-md border-b-2 border-yellow-500 px-3 py-2 flex flex-col'>
            <div className='flex gap-2'>
            <span className='text-yellow-500 title text-sm font-medium'>
                <FaIcon.FiUserPlus/>
            </span>
            <h1 className='title text-lg'>W/ Minor</h1>
            </div>
            {
                loading ? <BoxSpiral/>
                :  <div className='flex justify-between items-center'>
                    <span className='text-4xl font-sm text_number font-medium tracker-wide'>{number.with_minor ? number.with_minor : '0'}</span>
                </div>
            }
           
        </div>
        
    </div>
  )
}

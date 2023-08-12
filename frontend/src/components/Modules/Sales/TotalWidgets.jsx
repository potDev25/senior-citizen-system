import React from 'react'

export default function TotalWidgets({totalSales, passengers, tickets, number}) {
  return (
    <div className='grid grid-cols-5 mb-5 mt-5 gap-5'>
        <div className='h-[150px] w-full bg-white rounded shadow-md text-center p-2'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Total Sales</h1>
            <h1 className='text-green-500 uppercase text-4xl mt-5 font-semibold'>&#8369; {totalSales}</h1>
        </div>
        <div className='h-[150px] w-full bg-white rounded shadow-md text-center p-2'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Total Passengers</h1>
            <h1 className='text-blue-500 uppercase text-4xl mt-5 font-semibold'>{passengers.length}</h1>
        </div>
        <div className='h-[150px] w-full bg-white rounded shadow-md text-center p-2'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Ticket Sequence No.</h1>
            <h1 className='text-red-500 uppercase text-4xl mt-5 font-semibold'>{tickets}</h1>
        </div>
        <div className='h-[150px] w-full bg-white rounded shadow-md text-center p-2'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Rebook</h1>
            <h1 className='text-black uppercase text-4xl mt-5 font-semibold'>{number.rebook ? number.rebook : '0'}</h1>
        </div>
        <div className='h-[150px] w-full bg-white rounded shadow-md text-center p-2'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Refund</h1>
            <h1 className='text-black uppercase text-4xl mt-5 font-semibold'>{number.refund ? number.refund : '0'}</h1>
        </div>
    </div>
  )
}

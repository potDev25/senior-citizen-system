import React from 'react'
import MoneyFormat from '../MoneyFormat'

export default function Data({data}) {
  return (
    <div>
        <table className='md:table-auto w-full bg-gray-100 text-sm'>
            <thead className=' py-5'>
                <tr>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Route</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Monthly Sales</td>
                </tr>
            </thead>

            <tbody>
              {
                data.map((item) => (
                  <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5'>
                    <td className='text-sm px-5 py-2 text-gray-500'>
                        <span className='text-gray-500'>{item.route}</span>
                    </td>
                    <td className='text-sm px-5 py-2 text-gray-500'>
                        <span className='text-gray-500'> 
                          <MoneyFormat
                            amount={item.sales}
                          />
                        </span>
                    </td>
                  </tr>
                ))
              }
            
            </tbody>
        </table>
    </div>
  )
}

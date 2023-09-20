import React from 'react'

export default function PeopleTable({children, loading, link}) {
  return (
    <>
    <table className={(loading ? 'bg-gray-50' : 'bg-gray-100') + ' md:table-auto w-full text-sm'}>
    <thead className=' py-5'>
        <tr>
            <td className='text-sm text-gray-500 font-medium px-5 py-2'>NAME</td>
            <td className='text-sm text-gray-500 font-medium px-5 py-2'>ADDRESS</td>
            <td className='text-sm text-gray-500 font-medium px-5 py-2'>TYPE</td>
            <td className='text-sm text-gray-500 font-medium px-5 py-2'>DATE</td>
            <td className='text-sm text-gray-500 font-medium px-5 py-2'>OPTIONS</td>
        </tr>
    </thead>

    {children}

    </table>

    <div className='flex items-center justify-between mt-4'>
      <div></div>
      <ul className="list-style-none flex">

          {/* {
          links.map((link) => (
              <li aria-current="page">
              <button  onClick={() => handLink(link.label)} dangerouslySetInnerHTML={{ __html: link.label }}
                  className={` ${link.active ? "bg-blue-500 text-white" : ""} relative block rounded px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300`}
                  >
              </button>
              </li>
          ))
          } */}
          
      </ul>
    </div>
</>
  )
}

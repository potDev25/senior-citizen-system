import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

const ManifestToPrint = React.forwardRef(({manifest}, ref) => {

  return (
    <div ref={ref} className='p-5'>
        <table className='md:table-auto w-full text-sm'>
       
           <thead className=' py-5'>
                <tr>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>#</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Name</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>W/ Minor</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>Age</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>SEX</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>TYPE</td>
                    <td className='text-sm text-gray-500 font-medium px-5 py-2'>SET NUMBER</td>
                </tr>
            </thead>
            <tbody>
                {
                    manifest.map((data, id) => (
                        <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5' key={data.passengers_id}>
                            <td className='px-5 py-2'>{id + 1}</td>
                            <td className='text-md px-5 py-2 font-medium'>
                                <div>
                                    <span className='capitalize'><Link to={`/passenger/profile/${data.passengers_id}/details`} className='text-gray-500'>{data.last_name + ' ' + data.first_name}</Link></span><br />
                                </div>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                {data.with_minor === null ? 'N/A' : data.with_minor}
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                <span>{data.age}</span>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500 capitalize'>
                                <span>{data.gender}</span>
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                {data.type}s
                            </td>
                            <td className='text-sm px-5 py-2 text-gray-500'>
                                <span>{data.set_number}</span>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
       </table>
    </div>
  );
});

export default ManifestToPrint;

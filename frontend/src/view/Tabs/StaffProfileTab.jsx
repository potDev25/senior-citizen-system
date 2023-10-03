import React from 'react'

export default function StaffProfileTab({user}) {
  return (
    <div className='mt-[20px] h-[300px] px-[100px] w-full flex lg:flex-row md:flex-col sm:flex-col lg:gap-[200px]'>
                
        <div className='w-full'>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Name:</h1>
                    <p className='text-gray-500 text-md font-2xl capitalize'>{user.last_name} {user.first_name}</p>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Contact:</h1>
                    <div>
                        <p className='text-gray-500 text-md font-2xl'>{user.email}</p>
                        <p className='text-gray-500 text-md font-2xl'>{user.cotact_number}</p>
                    </div>
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Gender:</h1>
                    <p className='text-gray-500 text-md font-2xl capitalize'>{user.gender}</p>
                </div>
            </div>

            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Address:</h1>
                    <p className='text-gray-500 text-md font-2xl capitalize'>{user.barangay}, {user.city}, {user.province}</p>
                </div>
            </div>
        </div>

        <div className='w-full'>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Status:</h1>
                    {
                        user.status === 0 ? <p className='bg-gray-200 text-gray-500 px-2 text-sm rounded-lg'>Offline</p>
                        : <p className='bg-green-200 text-green-500 p-2 text-sm rounded-lg'>Active</p>
                    }
                </div>
            </div>

            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Role:</h1>
                    {user.role == 'department' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{user.role} User</span>}
                    {user.role == 'barangay' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{user.role} User</span>}
                    {user.role == 'admin' &&  <p className='bg-red-200 text-red-500 p-2 text-sm rounded-lg capitalize'>General Admin</p>}
                </div>
            </div>
            <div className='py-3 w-full mb-2 border-b border-gray-200'>
                <div className='flex items-center gap-5'>
                    <h1 className='text-black text-md font-2xl'>Designation:</h1>
                    {user.role == 'department' &&  <p className='text-gray-500 text-md font-2xl capitalize'>{user.dep_designation}</p>}
                    {user.role == 'barangay' &&  <p className='text-gray-500 text-md font-2xl capitalize'>Brgy. {user.dep_designation}</p>}
                    {user.role == 'admin' &&  <p className='bg-red-200 text-red-500 p-2 text-sm rounded-lg capitalize'>{user.role}</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

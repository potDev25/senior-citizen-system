import React, { useState } from 'react'

export default function StaffHistory() {
    const [loading, setLoading] = useState(false);
  return (
    <div  className='mt-[10px] w-[90%] m-[auto] h-[300px] p-5'>
        {
            loading ? 
            <div className='flex items-center justify-center'>
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            :
            <table className='md:table-auto w-full bg-gray-100 text-sm'>
                <thead className=' py-5'>
                    <tr>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>Description</td>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>Date</td>
                        <td className='text-sm text-gray-500 font-medium px-5 py-2'>Time</td>
                    </tr>
                </thead>

                <tbody>
                    <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5'>
                        <td className='text-sm px-5 py-2 text-gray-500'>
                            <span className='text-gray-500'>Logged in at 11:00 pm</span>
                        </td>
                        <td className='text-sm px-5 py-2 text-gray-500'>
                            <span className='text-gray-500'>August, 28, 2023</span>
                        </td>
                        <td className='text-sm px-5 py-2 text-gray-500'>
                            <span className='text-gray-500'>11:00 AM</span>
                        </td>
                    </tr>
                    {/* {   
                        users.filter((user) => {
                            return strings.toLowerCase() === '' ? user : user.last_name.toLowerCase().includes(strings) || user.first_name.toLowerCase().includes(strings)
                        }).map((user, key) => (
                            <tr className='p-5 border border-b-2 hover:bg-gray-300 pointer mb-5' key={key}>
                                <td className='text-md px-5 py-2 font-medium flex gap-5 items-center'>
                                    <div>
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${user.photo}`} alt="" className='sm:h-10 w-10 rounded-full'/>
                                    </div>
                                    <div>
                                        <span className='text-gray-500'>{user.last_name + ' ' + user.first_name}</span><br />
                                        <span className='text-gray-500'>{user.cotact_number}</span>
                                    </div>
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                    <span className='text-gray-500'>{user.email}</span>
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                    {user.role == 'Ticketing Agent' && <span className='rounded-[10px] bg-blue-300 text-blue-500 px-2 text-sm capitalize'>{user.role}</span>}
                                    {user.role == 'Clearing Man' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>{user.role}</span>}
                                    
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                    <span className='text-gray-500'>{user.barangay}, {user.city}, {user.province}</span>
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                    {user.status == '1' && <span className='rounded-[10px] bg-green-300 text-green-500 px-2 text-sm capitalize'>Active</span>}
                                    {user.status == '0' && <span className='rounded-[10px] bg-gray-300 text-gray-500 px-2 text-sm capitalize'>Offline</span>}
                                </td>
                                <td className='text-sm px-5 py-2 text-gray-500'>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300">
                                        OPTIONS
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                onClick={ev => handleShowUpdateModal(user)}
                                                >
                                                <FaIcon.FiEdit/>&nbsp; Edit
                                                </button>
                                            )}
                                            </Menu.Item>
                                            <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                to={'/staff/profile/' + user.id + '/details'}
                                                >
                                                <FaIcon.FiEye/>&nbsp; View
                                                </Link>
                                            )}
                                            </Menu.Item>
                                            <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                to={'/staff/profile/' + user.id + '/details'}
                                                >
                                                <FaIcon.FiBellOff/>&nbsp; Block
                                                </Link>
                                            )}
                                            </Menu.Item>
                                            <Menu.Item >
                                            {({ active }) => (
                                                <button
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'flex items-center px-4 py-2 text-sm w-full'
                                                )}
                                                // onClick={ev => handle(1)}
                                                >
                                                <FaIcon.FiTrash/>&nbsp; Delete
                                                </button>
                                            )}
                                            </Menu.Item>
                                        </div>
                                        </Menu.Items>
                                    </Transition>
                                    </Menu>
                                    
                                </td>
                            </tr> 
                        ))
                    } */}
                    
                </tbody>
            </table>                  
        }
    </div>
  )
}

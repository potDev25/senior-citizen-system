import React from 'react'
import * as FaIcon from "react-icons/fi";
import { Link, useParams } from 'react-router-dom';

export default function SettingsTab() {
    const Menus = [
        { title: "Fare", to: '/settings/fare', icon: <FaIcon.FiSettings/>},
        { title: "Routes & Departure", to: '/settings/time-settings', icon: <FaIcon.FiClock/>},
        { title: "Message Settings", to: '/settings/message-Settings', icon: <FaIcon.FiMessageCircle/>},
        { title: "Ticket Settings.", to: '/settings/ticket-settings', icon: <FaIcon.FiPaperclip/>},
    ];

    const {tab} = useParams()
  return (
    <div className='h-fit w-[400px] bg-white rounded shadow-sm'>
        <ul>
            {
                Menus.map((menu) => (
                    <li className={`${menu.to === window.location.pathname ? 'bg-blue-500 text-white' : 'text-blue-500' } border-b-[1px] h-full py-3 px-2 border-gray-200 uppercase text-sm  hover:bg-blue-500 hover:text-white`}>
                        <Link to={menu.to} className='flex items-center justify-between'>
                            <span className='flex items-center gap-2'>{menu.icon} {menu.title}</span>
                            <FaIcon.FiArrowRight/>
                        </Link>
                    </li>
                ))
            }
          
        </ul>
    </div>
  )
}

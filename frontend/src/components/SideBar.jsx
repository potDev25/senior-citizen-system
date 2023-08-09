import { useRef, useState } from "react";
import {Link, Outlet} from 'react-router-dom'

import chart_fill from '../assets/Chart_fill.png'
import User from '../assets/User.png'
import clients from '../assets/clients.png'
import Chart from '../assets/Chart.png'
import Aminities from '../assets/Aminities.png'
import Transaction from '../assets/Transaction.png'
import Setting from '../assets/Setting.png'
import Calendar from '../assets/Calendar.png'
import Control from '../assets/Control.png'
import Facilities from '../assets/facilities.png'
import Users from '../assets/User.png'
import Navbar from "./Navbar";
import Logo from '../assets/images/logo-3.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({children}) => {
  const [open, setOpen] = useState(true);
  const [link, setLink] = useState('');
  const toastId = useRef(null);

  const Menus = [
      { title: "Dashboard", src: chart_fill, to: '/dashboard'},
      { title: "Ticketing", src: Facilities, to: '/ticketing', gap: true,},
      { title: "People", src: Aminities, to: '/people' },
      { title: "Manifest", src: Calendar, to: '/manifest'},
      { title: "Sales", src: Transaction, to: '/sales'},
      { title: "Reports", src: Chart,  gap: true, to: '/reports' },
      { title: "Settings", src: Setting, to: '/settings/fare' },
      { title: "Logs", src: Setting, to: '/logs' },
  ];

  const handleLink = () => {
    setLink(window.location.pathname)
  }

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-[235px]" : "w-20"
        }  h-screen px-2  pt-1 fixed top-0 duration-300`}
      id="sidebar">
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-3 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center gap-2">
            <div className={`h-[70px]  bg-white p-1 rounded-lg ${
                    !open ? "w-[50px]" : "w-[80px]"
                    }`}>
                <img
                    src={Logo}
                    className={`cursor-pointer duration-500 h-full w-full mr-5 ${
                    open && "rotate-[360deg]"
                    }`}
                />
            </div>
          <h1
            className={`text-[#ffff] origin-left font-bold tracking-wide text-lg duration-200 ${
              !open && "scale-0"
            }`}
          >
            RJA Express
          </h1>
        </div>
       
        <ul className="pt-5 px-1">
          {Menus.map((Menu, index) => (
            <li
                onClick={handleLink}
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-400 text-white text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-6" : "mt-2"} 
                ${link === Menu.to && "bg-blue-400"}`}
              >
              
                <img src={Menu.src} />
                <Link
                to={Menu.to}
                >
                <span className={`${!open && "hidden"} origin-left duration-200 uppercase text-[12px]`}>

                  
                    {Menu.title}
                  

                </span>
              </Link>
              </li>
          ))}
        </ul>
      </div>
     
      <div className={`flex-1 ${open ? "ml-[235px]" : "ml-20"} h-screen duration-300 bg-[#e3e8ee]`}>

        <Navbar/>

        <div className='py-5 px-3'>
        <ToastContainer/>
          <Outlet/>
        </div>
       
      </div>

    </div>
  );
};
export default Sidebar;

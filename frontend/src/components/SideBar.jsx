import { useRef, useState } from "react";
import {Link, Navigate, Outlet} from 'react-router-dom'

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
import Camera from '../assets/icons8-camera-20.png'
import Admin from '../assets/icons8-admin-20.png'
import Admin1 from '../assets/icons8-admin-21.png'
import Users from '../assets/User.png'
import Navbar from "./Navbar";
import Logo from '../assets/images/seniors/UEWFefw.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from "../Context/ContextProvider";

const Sidebar = ({children, user}) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const toastId = useRef(null);
  const {user_token, setUser, passengers, setPassengers, notification} = useStateContext();
  let Menus = [];

  if(!user_token){
    return <Navigate to={'/'}/>
  }else if(notification){
      toast.success(notification, {
        position: "top-right",
        toastId: notification,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
  }

  else if(user.role === 'admin'){
    Menus = [
      { title: "Dashboard", src: chart_fill, to: '/dashboard'},
      { title: "Scanning", src: Camera, to: '/ticketing', gap: true,},
      { title: "Senior Citizens", src: Users, to: '/people' },
      { title: "Barangay Admins", src: Admin1, to: '/staff'},
      { title: "Department Admins", src: Admin, to: '/department-users'},
      { title: "Barangay Management", src: Facilities, to: '/barangay'},
      { title: "Departments", src: Calendar, to: '/manifest'},
      { title: "Announcements", src: Calendar, to: '/announcements'},
      // { title: "Daily Sales", src: Calendar, to: '/sales'},
      // { title: "Statistics", src: Chart,  gap: true, to: '/reports' },
      // { title: "Settings", src: Setting, to: '/settings/fare' },
    ];
  }else if(user.role === 'barangay'){
    Menus = [
      { title: "Dashboard", src: chart_fill, to: '/dashboard'},
      { title: "Scanning", src: Camera, to: '/ticketing', gap: true},
      { title: "Senior Citizens", src: Users, to: '/people' },
      { title: "Scanned Seniors", src: Camera, to: `/barangay-scanned-seniors/${user.barangay}` },
      // { title: "Daily Sales", src: Calendar, to: '/sales'},
      // { title: "Statistics", src: Chart,  gap: true, to: '/reports' },
      // { title: "Settings", src: Setting, to: '/settings/fare' },
    ];
  }else if(user.role === 'department'){
    Menus = [
      { title: "Dashboard", src: chart_fill, to: '/dashboard'},
      // { title: "Scanning", src: Camera, to: '/ticketing', gap: true,},
      { title: "Staff", src: Users, to: `/department/staff/${user.designation}`},
      { title: "Scanned Seniors", src: Camera, to: `/department-scanned-seniors/${user.designation}`},
      // { title: "Daily Sales", src: Calendar, to: '/sales'},
      // { title: "Statistics", src: Chart,  gap: true, to: '/reports' },
      // { title: "Settings", src: Setting, to: '/settings/fare' },
    ];
  }else if(user.role === 'department_staff'){
    Menus = [
      { title: "Scanning", src: chart_fill, to: '/dashboard'},
      // { title: "Scanning", src: Camera, to: '/ticketing', gap: true,},
      // { title: "Staff", src: Users, to: `/department/staff/${user.designation}`,},
      // { title: "Daily Sales", src: Calendar, to: '/sales'},
      // { title: "Statistics", src: Chart,  gap: true, to: '/reports' },
      // { title: "Settings", src: Setting, to: '/settings/fare' },
    ];
  }

  const handleLink = () => {
    setLink(window.location.pathname)
  }

  return (
    <div className="flex">
      <div
        className={` ${
          open  ? "w-[250px]" : "w-20"
        }  h-screen px-2  pt-1 fixed top-0 duration-300`}
      id="sidebar">
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-3 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          />
        <div className="flex items-center gap-2 px-3 py-2">
            <div className={`h-[70px] bg-white px-2 rounded-lg ${
                    !open ? "w-[50px] h-[24px]" : "w-[80px]"
                    }`}>
                <img
                    src={Logo}
                    className={`cursor-pointer duration-500 h-full w-full mr-5 ${
                    open && "rotate-[360deg]"
                    }`}
                />
            </div>
          <h1
            className={`text-[#ffff] origin-left font-bold tracking-wider text-3xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            SCIS
          </h1>
        </div>
       
        <ul className="pt-5 px-3">
          {Menus.map((Menu, index) => (
            <li
                onClick={handleLink}
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#FCB040] text-white text-lg font-semibold items-center gap-x-3 
                ${Menu.gap ? "mt-6" : "mt-2"} 
                ${link === Menu.to && "bg-[#FCB040]"}`}
              >
                 <Link
                to={Menu.to}
                className="flex items-center justify-center gap-x-3">
                <img src={Menu.src} />
               
                <span className={`${!open && "hidden"} origin-left duration-200 uppercase text-[12px]`}>

                  
                    {Menu.title}
                  

                </span>
              </Link>
              </li>
          ))}
        </ul>
      </div>
     
      <div className={`flex-1 ${open ? "ml-[250px]" : "ml-20"} sm:w-[200px] lg:w-full h-screen duration-300 bg-[#e3e8ee]`}>

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

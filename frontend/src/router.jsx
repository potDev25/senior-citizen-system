import { Children } from "react";
import {Navigate, createBrowserRouter} from 'react-router-dom'
import GuestLayout from "./components/Layout/GuestLayout";
import NotFound from "./view/NotFound";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";
import Manifest from "./view/Manifest";
import Sales from "./view/Sales";
import People from "./view/People";
import Passengers from "./view/Passengers";
import Ticketing from "./view/Ticketing";
import RegistrationLayout from "./components/Layout/RegistrationLayout";
import Register from "./view/Pages/Register";
import Upload from "./view/Pages/Upload";
import Profile from "./view/Pages/Profile";
import QrCode from "./view/Pages/QrCode";
import ValidationPage from "./view/Pages/ValidationPage";
import Ticket from "./view/Ticketing/Ticket";
import Settings from "./view/Settings/Settings";
import Reports from "./view/Reports/Reports";
import Staff from "./view/Staff/Staff";
import AddStaff from "./view/Staff/AddStaff";
import StaffProfile from "./view/Pages/StaffProfile";
import PeopleIndex from "./view/People/PeopleIndex";
import Barangay from "./view/Barangay/Barangay";
import Department from "./view/Departments/Department";
import DepartmentUser from "./view/DepartmentUser/DepartmentUser";
import Seniors from "./view/Barangay/Seniors";
import ScannedSeniors from "./view/Barangay/ScannedSeniors";
import UsersTable from "./view/Departments/Table/usersTable";
import Users from "./view/Departments/Table/Users";
import Announcements from "./view/Announcement/Announcements";
import Layout from "./view/Announcement/Layout";
import DepartmentScannedSeniors from "./view/Departments/DepartmentScannedSeniors";

const router =  createBrowserRouter ([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Login/>
            }
        ]
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={'/dashboard'}/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/manifest',
                element: <Department/>
            },
            {
                path: '/sales',
                element: <Sales/>
            },
            {
                path: '/people',
                element: <PeopleIndex/>
            },
            {
                path: '/passengers',
                element: <Passengers/>
            },
            {
                path: '/ticketing',
                element: <Ticketing/>
            },
            {
                path: '/ticketing/ticket/:manifest_id/:pass_id/:manifest_data',
                element: <Ticket/>
            },
            {
                path: '/passenger/profile/:id',
                element: <Profile/>
            },
            {
                path: '/passenger/profile/:id/:tab',
                element: <Profile/>
            },
            {
                path: '/validation-page/:qr',
                element: <ValidationPage/>
            },
            {
                path: '/settings/:tab',
                element: <Settings/>
            },
            {
                path: '/reports',
                element: <Reports/>
            },
            {
                path: '/staff',
                element: <Staff/>
            },
            {
                path: '/barangay',
                element: <Barangay/>
            },
            {
                path: '/barangay-seniors/:barangay',
                element: <Seniors/>
            },
            {
                path: '/department/staff/:department',
                element: <Users/>
            },
            {
                path: '/barangay-scanned-seniors/:barangay',
                element: <ScannedSeniors/>
            },
            {
                path: '/department-scanned-seniors/:barangay',
                element: <DepartmentScannedSeniors/>
            },
            {
                path: '/department-users',
                element: <DepartmentUser/>
            },
            {
                path: '/announcements',
                element: <Layout/>
            },
            {
                path: '/staff/profile/:id/:tab',
                element: <StaffProfile/>
            },
        ]
    },
    {
        path: '/',
        element: <RegistrationLayout/>,
        children: [
            {
                path: '/registration',
                element: <Register/>
            },
            {
                path: '/registration-step/:id',
                element: <Upload/>
            },
            {
                path: '/qr_code/:qr',
                element: <QrCode/>
            },
           
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
    
])

export default router
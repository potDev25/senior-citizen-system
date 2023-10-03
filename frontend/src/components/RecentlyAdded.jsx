import React, { useEffect, useState } from 'react'
import * as FaIcon from "react-icons/fi";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axiosClient from '../axiosClient';
import Table from './Table';
import PeopleTable from './Tables/PeopleTable';
import Spiral from './Spiral/Spiral';

export default function RecentlyAdded({data, link, checked = false, title, string, load}) {

    const [passengers, setPassengers] = useState([]);
    const [numberOfRequest, setNumberOfRequest] = useState(0);
    const [loading, setLoading] = useState(load);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handle = (id) => {
        alert(id)
    }

    useEffect(() => {
        getPassengers()
    }, [loading])

    const getPassengers = () => {
        axiosClient.get(link)
        .then(({data}) => {
            setLoading(false)
            setPassengers(data.seniors)
            setNumberOfRequest(data.numberberOfRequest)
            console.log(data.data)
        })
        .catch(() => {
            alert('Server Error!')
            setLoading(false)
        })
    }


  return (
    <div className='md:w-full bg-white rounded px-2 py-2 sm:overflow-auto md:overflow-visible lg:overflow-visible'>
        <h1 className='text-lg mb-4 font-thin tracking-wide'>{title} &nbsp;
            {title != '' && <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            {numberOfRequest}
            </span>}
        </h1>

        <PeopleTable>

            
            {loading && 
                <Spiral/>
            }


            {!loading && 
                <Table passengers={passengers} checked={checked} string={string}/>
            }

        </PeopleTable>

       
        
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Bar } from 'react-chartjs-2';
import LineChart from './LineChart';
import Barchart from './Barchart';
import PieChart from './PieChart';
import MonthlySalesTable from './MonthlySalesTable';
import axiosClient from '../../../axiosClient';
import Data from './Tables/Data';
import BarchartPassenger from './BarchartPassenger';
import Select from 'react-select'
import AnnualSaleBarChart from './AnnualSaleBarChart';


export default function Widgets() {
    const [loading, setLoading] = useState(true)
    const [noPassengers, setNoPassengers] = useState([])
    const [sales, setSales] = useState([])
    const [annualSales, setAnnualSales] = useState([])
    const [month, _setMonth] = useState('2023-Aug')
    const [passengerStats, setpassengerStats] = useState([])
    const [options, setOptions] = useState([])

    const setMonth = (value) => {
        _setMonth(value)
        setLoading(true)
    }

      useEffect(() => {
        axiosClient.get(`/statistics/${month}`)
          .then(({data}) => {
            setNoPassengers(data.routeStatsResult)
            setSales(data.routeMonthlySalse)
            setpassengerStats(data.passStats);
            setOptions(data.options);
            setAnnualSales(data.annualSales);
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      }, [loading])
    
  return (
    <>
        {/* <div className='w-full h-[50px] bg-blue-500 text-white rounded mb-5 flex items-center justify-center'>

        </div> */}
        <div className='mb-5'>
            <Select 
            className='w-[200px]'
            options={options}
            placeholder='Months' 
            onChange={ev => setMonth(ev.value)}
            />
        </div>

        <div className='grid grid-cols-2 gap-5'>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Routes STATISTICS (No. Passengers Monthly, {month})</h1>
                <div className='h-full w-full'>
                    <Barchart
                        noPassengers={noPassengers}
                        loading={loading}
                    />
                </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold flex items-center justify-center'>Passengers<span className='text-sm'>(Passenger By Type, {month})</span></h1>
            <div className='h-full w-full'>
                <BarchartPassenger
                     passengers={passengerStats}
                     loading={loading}
                />
            </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Routes Monthly Sales ({month})</h1>
                <div className='h-full w-full'>
                    <LineChart
                        sales={sales}
                        loading={loading}
                    />
                </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <Data
                    data={sales}
                />
            </div>
           
        </div>

        <div className='bg-white w-full h-[350px] mt-5 p-2 text-center'>
            <h1 className='text-gray-500 uppercase text-lg font-bold'>Annual Sales</h1>
            <AnnualSaleBarChart
                annualSales={annualSales}
                loading={loading}
            />
        </div>
    </>
  )
}

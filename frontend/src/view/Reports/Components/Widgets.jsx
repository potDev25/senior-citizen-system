import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import LineChart from './LineChart';
import Barchart from './Barchart';
import PieChart from './PieChart';
import MonthlySalesTable from './MonthlySalesTable';
import axiosClient from '../../../axiosClient';
import Data from './Tables/Data';


export default function Widgets() {
    const [loading, setLoading] = useState(true)
    const [noPassengers, setNoPassengers] = useState([])

    const [userData, setUserData] = useState({
        labels: noPassengers.map((data) => data.route),
        datasets: [
          {
            label: "No. Of Passengers",
            data: noPassengers.map((data) => data.passengers),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "blue",
            borderWidth: 2,
          },
          
        ],
      });

    useEffect(() => {
        axiosClient.get('/statistics')
            .then(({data}) => {
                setNoPassengers(data.routeStatsResult)
                setLoading(false)
            })
    }, [loading])
    
  return (
    <>
        <div className='grid grid-cols-2 gap-5'>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Routes STATISTICS (No. Passengers Monthly)</h1>
                <div className='h-full w-full'>
                    <Barchart
                        chartData={userData}
                    />
                </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Monthly Sales STATISTICS</h1>
            <div className='h-full w-full'>
                <LineChart
                    data={userData}
                />
            </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Routes Monthly Sales</h1>
                <div className='h-full w-full'>
                    <Barchart
                        chartData={userData}
                    />
                </div>
            </div>
            <div className='h-[350px] w-full bg-white rounded shadow-md text-center p-2'>
                <Data/>
            </div>
           
        </div>
    </>
  )
}

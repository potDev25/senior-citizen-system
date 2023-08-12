import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';
import { UserData } from "../Data";
import LineChart from './LineChart';
import Barchart from './Barchart';
import PieChart from './PieChart';
import MonthlySalesTable from './MonthlySalesTable';
import axiosClient from '../../../axiosClient';


export default function Widgets() {
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "blue",
            // borderWidth: 2,
          },
          
        ],
      });

    useEffect(() => {
        axiosClient.get('/statistics')
            .then(({data}) => {
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
                <h1 className='text-gray-500 uppercase text-lg font-bold'>Routes Monthly Sales</h1>
                <div className='h-[90%] w-full flex items-center justify-center'>
                    <PieChart
                        chartData={userData}
                    />
                </div>
            </div>
           
        </div>
    </>
  )
}

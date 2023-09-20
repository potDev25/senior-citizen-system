import React, { useEffect, useState } from 'react'
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../Data";
import axiosClient from '../../../axiosClient';

export default function AnnualSaleBarChart({annualSales, loading}) {
  const renderChart = () => {
    const labels = annualSales.map(item => item.month);
    const values = annualSales.map(item => item.sales);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Annual Sales',
          data: values,
          backgroundColor: ' #91A3B0',
          borderColor: ' #91A3B0',
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      maintainAspectRatio: false
    };

    return (
      <Bar 
        data={chartData} 
        options={chartOptions} 
        height={"200px"}
    />
    );
  };

  return (
    <div className='h-full w-[100%] pb-10'>
      {loading ? <p>Loading chart...</p> : renderChart() }
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../Data";
import axiosClient from '../../../axiosClient';

export default function BarchartPassenger({passengers, loading}) {
  const renderChart = () => {
    const labels = passengers.map(item => item.type);
    const values = passengers.map(item => item.numberPassenger);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Passenger',
          data: values,
          backgroundColor: '#6699CC',
          borderColor: '#6699CC',
          borderWidth: 1,
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
      <Bar data={chartData} options={chartOptions} />
    );
  };

  return (
    <div className='h-full pb-10'>
      {loading ? <p>Loading chart...</p> : renderChart() }
    </div>
  )
}

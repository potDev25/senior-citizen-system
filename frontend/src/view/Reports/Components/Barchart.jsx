import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../Data";
import axiosClient from '../../../axiosClient';

export default function Barchart({noPassengers, loading}) {
  const renderChart = () => {
    const labels = noPassengers.map(item => item.route);
    const values = noPassengers.map(item => item.passengers);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Passengers',
          data: values,
          backgroundColor: ' #91A3B0',
          borderColor: ' #91A3B0',
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

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
          label: 'Data Values',
          data: values,
          // backgroundColor: '#45a0ed',
          borderColor: '#45a0ed',
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
    };

    return (
      <Bar data={chartData} options={chartOptions} />
    );
  };

  return (
    <div>
      {loading ? <p>Loading chart...</p> : renderChart() }
    </div>
  )
}

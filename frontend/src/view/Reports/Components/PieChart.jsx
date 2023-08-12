import React from 'react'
import { Pie, Doughnut, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PieChart({chartData}) {
  return (
    // <Pie data={chartData} />
    <Doughnut data={chartData} />
    // <PolarArea data={chartData} />
  )
}

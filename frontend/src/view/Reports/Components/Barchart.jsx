import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData } from "../Data";
import axiosClient from '../../../axiosClient';

export default function Barchart({chartData}) {
  const [loading, setLoading] = useState(true)
  return (
    <Bar data={chartData}/>
  )
}

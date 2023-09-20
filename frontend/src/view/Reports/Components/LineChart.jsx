import React from 'react'
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChart({sales, loading}) {
  const renderChart = () => {
    const labels = sales.map(item => item.route);
    const values = sales.map(item => item.sales);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Sales',
          data: values,
          backgroundColor: '#a2cff6',
          fill: true,
          borderColor: '#09375f',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
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

import React from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChart({sales, loading}) {
  const renderChart = () => {
    const labels = sales.map(item => item.route);
    const values = sales.map(item => item.sales);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Data Values',
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
    };

    return (
      <Line data={chartData} options={chartOptions} />
    );
  };

  return (
    <div>
      {loading ? <p>Loading chart...</p> : renderChart() }
    </div>
  )
}

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { padding } from '@mui/system';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart2 = () => {
  const [data, setData] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart',
      },
    },
    legend: { display: false },
    categoryPrecentage: 0.8,
    barPercentage: 1,
    barThickness: 60,
    scale: {
      x: {
        beginAtZero: true,
      },
    },
    titel: {
      display: true,
      text: 'Chart',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/getTotalByType');
      
      setData({
        labels: data.total && data.total.map(item => item._id),
        datasets: [
          {
            data: data.total && data.total.map(item => item.total),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            // borderWidth :1,
            // barPercentage: 0.9,
            // categoryPercentage: 1,
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: '0px',
        width: '40%',
        height: '70%',
      }}
    >
      <Bar data={data} options={options}></Bar>
    </div>
  );
};

export default BarChart2;

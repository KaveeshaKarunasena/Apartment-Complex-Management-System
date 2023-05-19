
import { useEffect, useState } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import Chart from 'chart.js/auto';

ChartJs.register(Tooltip, Title, ArcElement, Legend);

function PieChart() {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: [
          '#c5a3e9',
          '#f6d365',
          '#95c6e7',
          '#ff7b7b',
          '#f6a6b2',
          '#adebad',
          '#e7f196',
        ],
      },
    ],
    labels: [
      'Yoga Deck',
      'Gymnasium',
      'Kids Club',
      'Kiddies Play Area',
      'Kiddies Pool',
      'Infinity Pool',
      'Laundry',
    ],
  });

  useEffect(() => {
    const fetchTotal = async () => {
      const { data } = await axios.get('/product/getTotalFee');
      console.log(data);

      setData({
        labels: data.map(
          (stat) =>
            `${stat._id} (${(
              (stat.totalOrdered / data.reduce((acc, curr) => acc + curr.totalOrdered, 0)) *
              100
            ).toFixed(2)}%)`
        ),
        datasets: [
          {
            label: 'Total Amenity Members',
            data: data.map((stat) => stat.totalOrdered),
            backgroundColor: [
              '#c5a3e9',
              '#f6d365',
              '#95c6e7',
              '#ff7b7b',
              '#f6a6b2',
              '#adebad',
              '#e7f196',
            ],
          },
        ],
      });
    };

    fetchTotal();
  }, []);

  const handleDownload = () => {
    // Logic for downloading the chart image
    const canvas = document.getElementById('pie-chart');
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart.png';
    a.click();
  };

  const handleFilter = () => {
    // Logic for filtering the chart data
    // Add your filter functionality here
    console.log('Filter button clicked');
  };

  return (
    <div style={{ background: 'rgba(173, 216, 230, 0.4)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '30%', height: '30%' }}>
          <Doughnut
            data={data}
            type="doughnut"
            options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: {
                      weight: 'bold',
                      color: 'black',
                    },
                  },
                },
              },
            }}
            id="pie-chart"
          />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Amenities and Percentages:</h3>
        {data.labels.map((label, index) => (
          <p key={index}>{label}</p>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
          onClick={handleDownload}
        >
          Download
        </button>
        <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleFilter}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default PieChart;


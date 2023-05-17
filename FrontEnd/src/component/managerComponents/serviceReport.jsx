import React, { useState, useEffect } from 'react';
import BarChart from './charts/BarChart';
import axios from 'axios';

const ServiceReport = () => {
  const [serviceData, setServiceData] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Service Type',
          color: 'black',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Commission Amount',
          color: 'black',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  useEffect(() => {
    let getCommissionByCategory = async () => {
      let { data } = await axios.get(
        '/service-provider/getCommissionByCategory'
      );

      setServiceData({
        labels: data.map(stat => stat._id),
        datasets: [
          {
            label: 'Commission Gained',
            data: data.map(stat => stat.total),
            backgroundColor: ['red', 'blue'],
          },
        ],
      });
    };

    getCommissionByCategory();
  }, []);

  return (
    <div>
      <div style={{ width: '80%', marginTop: '4%', marginLeft: '8%' }}>
        <BarChart chartData={serviceData} options = {options}/>
      </div>
      <div style={{ width: '80%', marginTop: '4%', marginLeft: '8%' }}>
        <BarChart chartData={serviceData} />
      </div>
    </div>
  );
};

export default ServiceReport;

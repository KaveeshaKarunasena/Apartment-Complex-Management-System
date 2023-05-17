import React, { useState, useEffect } from 'react';


import axios from 'axios';
import BarChart from '../Charts/barChart';
import PieChart from '../Charts/PieChart';

const EmployeeReport = () => {
  const [EmployeeData, setEmployeeData] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });

  useEffect(() => {
    let EmployeesByCategory = async () => {
      let { data } = await axios.get(
        '/employee/getEmployeeByCategory'
      );
      

      setEmployeeData({
        labels: data.map(stat => stat._id.month),
        datasets: [
          {
            label: 'Number of staff',
            data: data.map(stat => stat.total),
            backgroundColor: ['red', 'blue']
          },
        ],
      });
    };

    EmployeesByCategory();
  }, []);

  // useEffect(() => {
  //   let EmployeebySalary = async () => {
  //     let { data } = await axios.get(
  //       '/employee/getEmployeebySalary'
  //     );
      

  //     setEmployeeData({
  //       labels: data.map(stat => stat._id.month),
  //       datasets: [
  //         {
  //           label: 'Number of staff',
  //           data: data.map(stat => stat.total),
  //           backgroundColor: ['red', 'blue']
  //         },
  //       ],
  //     });
  //   };

  //   EmployeebySalary();
  // }, []);

  return (
    <div>
      <div style={{ width: '80%', marginTop: '4%', marginLeft: '8%' }}>
        <BarChart chartData={EmployeeData} />
      </div>
      {
       <div style={{ width: '40%', marginTop: '4%', marginLeft: '8%' }}>
        <PieChart chartData={EmployeeData} />
      </div> }
    </div>
  );
};

export default EmployeeReport;

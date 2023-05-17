import React, { useState, useEffect } from 'react';


import axios from 'axios';
import BarChart from '../Charts/barChart';
import PieChart from '../Charts/PieChart';

const EmployeeReport = () => {
  const [EmployeeSalary, setEmployeeSalary] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });
  const [EmployeeCount, setEmployeeCount] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });
  useEffect(() => {
    let EmployeeSalaryByDepartment = async () => {
      let { data } = await axios.get(
        '/employee/getEmployeeSalaryByDepartment'
      );
     
      setEmployeeSalary({
        labels: data.map(stat => stat._id),
        datasets: [
          {
            label: 'Commission Gained',
            data: data.map(stat => stat.total),
            backgroundColor: ['red', 'blue','purple'],
          },
        ],
      });
    };
    let EmployeeByDepartment = async () => {
      let { data } = await axios.get(
        '/employee/getEmployeeByDepartment'
      );
     
      setEmployeeCount({
        labels: data.map(stat => stat._id),
        datasets: [
          {
            label: 'Commission Gained',
            data: data.map(stat => stat.numberofemployee),
            backgroundColor: ['red', 'blue','purple'],
          },
        ],
      });
    };
    EmployeeSalaryByDepartment();
    EmployeeByDepartment();
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
        <BarChart chartData={EmployeeCount} />
      </div>
      {
       <div style={{ width: '40%', marginTop: '4%', marginLeft: '8%' }}>
        <PieChart chartData={EmployeeSalary} />
      </div> }
    </div>
  );
};

export default EmployeeReport;

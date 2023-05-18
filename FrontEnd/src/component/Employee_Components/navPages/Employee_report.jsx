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
            label: 'Number of Employee per Department',
            data: data.map(stat => stat.total),
            backgroundColor: ["#ffa600", "#ff6361","#58508d","#ff6361"],
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
            label: 'Number of Employee per Department',
            data: data.map(stat => stat.numberofemployee),
            backgroundColor: ["#ffa600", "#ff6361","#58508d","#ff6361"],
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
      
      <div style={{ width: '80%', marginTop: '4%', marginLeft: '8%', }}>
      <h1>Number of Employee per Department</h1>
        <BarChart chartData={EmployeeCount} />
      </div>
      {
       <div style={{ width: '40%', marginTop: '10%', marginLeft: '8%',paddingLeft:'10%' }}>
           <h1 style={{ marginTop: '10%' }} >Amount of Salaries paid per Department</h1>
        <PieChart chartData={EmployeeSalary} />
      </div> }
    </div>
  );
};

export default EmployeeReport;

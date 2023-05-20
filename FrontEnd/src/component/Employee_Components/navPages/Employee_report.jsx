import React, { useState, useEffect } from 'react';


import axios from 'axios';
import BarChart from '../Charts/barChart';
import PieChart from '../Charts/PieChart';
import jsPDF from 'jspdf';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';

 const saveAsPDF = () => {
    const chartContainer = document.getElementById('chart-container');

    html2canvas(chartContainer).then( (canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0,0,width, height);
      pdf.save('EmployeeReport.pdf');

    });
  }
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
    <div id = 'chart-container'>
      
      <div style={{ width: '80%', marginTop: '4%', marginLeft: '8%', }}>
      <h1>Number of Employee per Department</h1>
        <BarChart chartData={EmployeeCount} />
      </div>
      {
       <div style={{ width: '40%', marginTop: '10%', marginLeft: '8%',paddingLeft:'10%' }}>
           <h1 style={{ marginTop: '10%' }} >Amount of Salaries paid per Department</h1>
        <PieChart chartData={EmployeeSalary} />
      </div> }
      <Button
variant="contained"
onClick={saveAsPDF}
style={{
  backgroundColor: '#488042',
  marginTop: '-200%',
  marginBottom: '2%',
  marginLeft: '80%'
}}
>
Download Employee Report 
</Button>

    </div>
  );
  
};

export default EmployeeReport;

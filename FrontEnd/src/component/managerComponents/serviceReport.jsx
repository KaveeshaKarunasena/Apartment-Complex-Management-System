import React, { useState, useEffect, useCallback, useRef } from 'react';
import BarChart from './charts/BarChart';
import Button from '@mui/material/Button';
import LineChart from './charts/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const ServiceReport = () => {


  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [serviceData, setServiceData] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });
  const [paymentData, setPaymentData] = useState({
    labels: ['Red', 'Yellow', 'Blue'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  });

  const options1 = {
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

  const options2 = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month',
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
          text: 'Total Amount',
          color: 'black',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  const saveAsPDF = () => {
    const chartContainer = document.getElementById('chart-container');

    html2canvas(chartContainer).then( (canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0,0,width, height);
      pdf.save('chart.pdf');

    });
  }

  useEffect(() => {
    let getCommissionByCategory = async () => {
      const month = selectedDate1.getMonth();
      const year = selectedDate1.getFullYear();

      let { data } = await axios.get(
        `/service-provider/getCommissionByCategory`, {
          params: {
            month,
            year
          }
        }
      );

      data = data.filter( item => item._id.length !== 0)

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

    let getServicePayment = async () => {
      const year = selectedDate2.getFullYear();
      let { data } = await axios.get(`/service-provider/getServicePayment/${year}`);

      setPaymentData({
        labels: data.map(stat => stat._id.month),
        datasets: [
          {
            label: 'Total Payment made to service provider per month',
            data: data.map(stat => stat.total),
          },
        ],
      });
    };

    getCommissionByCategory();
    getServicePayment();
  }, [selectedDate1, selectedDate2]);

  return (
    <>
    <div id = "chart-container">
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          width: '80%',
          marginTop: '5%',
        }}
      >
        <div style={{ flex: 1 }} >
          <BarChart chartData={serviceData} options={options1}/>
        </div>
        <div style={{ flex: 1, marginLeft: '5%', marginTop: '10%' }}>
          <DatePicker
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            selected={selectedDate1}
            onChange={date => setSelectedDate1(date)}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          width: '80%',
          marginTop: '5%',
        }}
      >
        <div style={{ flex: 1 }}>
          <LineChart chartData={paymentData} options={options2} />
        </div>
        <div style={{ flex: 1, marginLeft: '5%', marginTop: '10%' }}>
          <DatePicker
            dateFormat="yyyy"
            showYearPicker
            selected={selectedDate2}
            onChange={date => setSelectedDate2(date)}
          />
        </div>
      </div>
      <div>
      
      </div>
    </div>
    <Button
    variant="contained"
    onClick={saveAsPDF}
    style={{
      backgroundColor: '#488042',
      marginTop: '2%',
      marginBottom: '2%',
      marginLeft: '40%'
    }}
  >
   Download PDF
  </Button>
  </>
  );
};

export default ServiceReport;

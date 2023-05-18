import React, { useState, useEffect, useCallback, useRef } from 'react';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ServiceReport = () => {


  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const saveAsPDF = () => {
    const chartContainer = document.getElementById('chart-container');

    html2canvas(chartContainer).then( (canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0,0,width, height);
      pdf.save('chart.pdf');

    });
  }

  useEffect(() => {
    let getCommissionByCategory = async () => {
      const month = selectedDate.getMonth();
      console.log(month);

      let { data } = await axios.get(
        `/service-provider/getCommissionByCategory/${month}`
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

    let getServicePayment = async () => {
      let { data } = await axios.get(`/service-provider/getServicePayment`);

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
  }, [selectedDate]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          width: '80%',
          marginTop: '5%',
        }}
      >
        <div style={{ flex: 1 }} id = "chart-container">
          <BarChart chartData={serviceData} options={options} />
        </div>
        <div style={{ flex: 1, marginLeft: '5%', marginTop: '10%' }}>
          <DatePicker
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
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
          <LineChart chartData={paymentData} options={options} />
        </div>
        <div style={{ flex: 1, marginLeft: '5%', marginTop: '10%' }}>
          <DatePicker
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={saveAsPDF}>Download</button>
      </div>
    </div>
  );
};

export default ServiceReport;

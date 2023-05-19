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
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import moment from 'moment';
import Controls from "../controls/Controls"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart2 = props => {
  const { startDate, endDate, comand } = props;
  const [allData, setAllData] = useState([]);
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
      //console.log('resss', data);

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
      setAllData(data.total);
      console.log(allData);
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    let filtered = allData.filter(allData => {
      // let date2 = moment(allData.date).format('YYYY-MM-DD')
      let Chdate = new Date(allData.date);
      //  console.log(Chdate)
      if (Chdate >= startDate && Chdate <= endDate) {
        const filterData = Chdate;
        console.log(filterData);

        return filterData;
      }
    });

    console.log(filtered);
    setData({
      labels: filtered.total && filtered.total.map(item => item._id),
      datasets: [
        {
          data: filtered.total && filtered.total.map(item => item.total),
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
    console.log(startDate);
    console.log(endDate);

    console.log(filtered);
  };

  const saveCanvas = () => {
    const chartContainer = document.getElementById('Barchart-container');

  html2canvas(chartContainer).then( (canvas) => {

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0,0,width, height);
    pdf.save('Barchart.pdf');

  });
  };

  return (
    <div
      style={{
        padding: '0px',
        width: '40%',
        height: '40%',
      }}
    >
      <div id = 'Barchart-container'>
      <Bar id ="barChart" data={data} options={options}></Bar>
      </div>
      <Controls.Button
        text="Download"
        color="secondary"
        onClick={() => saveCanvas()} />
      
      <Controls.Button
        text="Filter"
        color="primary"
        onClick={handleSubmit} />
    </div>
  );
};

export default BarChart2;

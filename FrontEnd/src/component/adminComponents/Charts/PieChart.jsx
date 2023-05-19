import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import {
  Button,
} from '@mui/material';
import { saveAs } from 'file-saver';
import Controls from "../controls/Controls"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


function PieChart(props) {
  const [chartData, setChartData] = useState({
    datasets: [{
        data: [10, 20, 30,40,50,60,70,80,90],
        backgroundColor:[
          'red',
          'blue',
          'yellow'
        ]
    },
  ],
  labels: [
      'Red',
      'Yellow',
      'Blue'
  ], 
});

const [total, setTotal] = useState({data:0});
const {startDate,endDate,comand} = props
const [allData, setAllData] = useState([])

  useEffect(()=> {
    const fetchData = async () =>  {
      const {data} = await axios.get('/maintenance/getTotalByDate')
        console.log("Pie Chart", data.totalCost)
        const total = data.totalCost
        setAllData(data.totalCost)
        console.log("allData",allData)

        setChartData(
          {
            datasets: [{
                data: data.totalCost && data.totalCost.map(item => item.totalCost),
                backgroundColor:[
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            },
          ],
          labels:data.totalCost && data.totalCost.map(item => {return moment(item._id).format('YYYY-MM-DD')}),
        }
        ) 
    }

   
    
    
  fetchData();

  const fetchTotal = async () =>{
    const {data} = await axios.get('/maintenance/getTotalCost')
        // alert("resss", data.total)
        const data1 = data.total.map(item =>item.total)
        
        setTotal({
           data :data1[0]
  })
            
      
  }
  fetchTotal();
  }, [])

  const handleSubmit = () =>{
    
  console.log("allData",allData)
    let filtered = allData.filter((allData)=>{

      // let date2 = moment(allData.date).format('YYYY-MM-DD')
      let Chdate = new Date(allData._id)
       console.log(Chdate)
       if(Chdate >= startDate && Chdate <= endDate){
         const filterData = Chdate
         console.log(filterData)
         
          return filterData
         
       }
       
    })
    
    
    console.log(filtered)
    setChartData(
      {
        datasets: [{
            data: filtered && filtered.map(item => item.totalCost),
            backgroundColor:[
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ]
        },
      ],
      labels:filtered && filtered.map(item => {return moment(item._id).format('YYYY-MM-DD')}),
    }
    );
    console.log(startDate)
    console.log(endDate)

    console.log(filtered)


}

const saveCanvas = ()  => {
  //save to png
  // const canvasSave = document.getElementById('pieChart');
  // canvasSave.toBlob(function (blob) {
  //     saveAs(blob, "PieChart.png")
  // })
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

  // const text1 =  total && total.map(item => {return item.data})

  // const text2 = total.data;
  
  // const plugins = [{
  //   beforeDraw: function(chart,total) {
  //    var width = chart.width,
  //        height = chart.height,
  //        ctx = chart.ctx;
  //        ctx.restore();
  //        var fontSize = (height / 160).toFixed(2);
  //        ctx.font = fontSize + "em sans-serif";
  //        ctx.textBaseline = "top";
  //        var text  = total.data,
  //        textX = Math.round((width - ctx.measureText(text).width) / 2),
  //        textY = height / 2;
  //        ctx.fillText(text, textX, textY);
  //        ctx.save();
  //   } 
  // }]
  return (
    <div style={{width:'40%', height:'40%'}} id = 'chart-container'>
      <Doughnut 
      id ="pieChart"
      data={chartData}
      type="doughnut" 
      // plugins={plugins} 
      />
      <div
      style={{
       paddingTop: '30px',
       paddingLeft:'90px'
      }}>

      <Controls.Button
        text="Download"
        color="secondary"
        onClick={() => saveCanvas()} />

      <Controls.Button
        text="Filter"
        color="primary"
        onClick={handleSubmit} />
      </div >
      
    </div>
  );
}

export default PieChart;
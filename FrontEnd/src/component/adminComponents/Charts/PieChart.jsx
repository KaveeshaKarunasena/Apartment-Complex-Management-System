import { useEffect, useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


function PieChart() {
  const [data, setData] = useState({
    datasets: [{
        data: [10, 20, 30],
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


  useEffect(()=> {
    const fetchData = async () =>  {
      const {data} = await axios.get('/maintenance/getTotalByDate')
        alert("resss", data.totalCost)

        setData(
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
        alert("resss", data.total)
        const data1 = data.total.map(item =>item.total)
        
        setTotal({
           data :data1[0]
  })
            
      
  }
  fetchTotal();
  }, [])

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
    <div style={{width:'20%', height:'20%'}}>
      <Doughnut data={data}
      type="doughnut" 
      // plugins={plugins} 
      />
    </div>
  );
}

export default PieChart;
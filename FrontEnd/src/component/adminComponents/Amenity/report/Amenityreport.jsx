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
          'purple',
          'orange',
          'blue'
        ]
    },
  ],
  labels: [
      'Puple',
      'Orange',
      'Blue'
  ], 
});

const [total, setTotal] = useState({data:0});


  useEffect(()=> {
   

  const fetchTotal = async () =>{
    const {data} = await axios.get('/product/getTotalFee')
        
        const data1 = data.total.map(item =>item.total)
        
    
         
            
      
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
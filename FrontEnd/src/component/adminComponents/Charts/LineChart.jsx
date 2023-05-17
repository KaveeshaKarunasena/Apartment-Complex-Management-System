import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
  Button,
} from '@mui/material';
import { saveAs } from 'file-saver';
import Controls from "../controls/Controls"
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const LineChart = (props) => {
  const {startDate,endDate,comand} = props
  const [allData, setAllData] = useState([])
  const [chartData, setChartData] = useState({
    labels: ['2023-03-05', '2023-04-15', '2023-06-22'],
    datasets: [
      {
        label: 'Maintenance Cost',
        data: [6000, 7300, 9000],
        fill: true,
        borderColor: 'rgb(255,99,132)',
        backgroundColor: 'rgb(255,99,132,0.3)',
      },
    ],
  });

  // console.log(comand)
  // console.log(filterData)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/getCost');
      
     
      setChartData({
        labels:
          data &&
          data.map(item => {
            return moment(item.date).format('YYYY-MM-DD');
          }),
        datasets: [
          {
            label: 'Maintenance Cost',
            data: data && data.map(item => item.amount),
            fill: true,
            borderColor: 'rgb(255,99,132)',
            backgroundColor: 'rgb(255,99,132,0.3)',
          },
        ],
      });

      setAllData(data)
      

      console.log(comand)
      console.log(startDate)
      console.log(endDate)

     
      console.log("Line Chart :",data)

      console.log(setChartData.labels);
    };
    fetchData();
  }, []);

  const handleSubmit = () =>{
    
   

      let filtered = allData.filter((allData)=>{
  
        // let date2 = moment(allData.date).format('YYYY-MM-DD')
        let Chdate = new Date(allData.date)
        //  console.log(Chdate)
         if(Chdate >= startDate && Chdate <= endDate){
           const filterData = Chdate
           console.log(filterData)
           
            return filterData
           
         }
         
      })
      
      
      console.log(filtered)
      setChartData({
        labels:
          filtered &&
          filtered.map(item => {
            return moment(item.date).format('YYYY-MM-DD');
          }),
        datasets: [
          {
            label: 'Maintenance Cost',
            data: filtered && filtered.map(item => item.amount),
            fill: true,
            borderColor: 'rgb(255,99,132)',
            backgroundColor: 'rgb(255,99,132,0.3)',
          },
        ],
      });
      console.log(startDate)
      console.log(endDate)
  
      console.log(filtered)

 
  }

  const saveCanvas = ()  => {
    //save to png
    const canvasSave = document.getElementById('stackD');
    canvasSave.toBlob(function (blob) {
        saveAs(blob, "LineChart.png")
    })
}



  return (
    <div>
      <div style={{ width: '700px' , height:'300px' }}>
        <Line
          id="stackD"
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Cost' },
            },
          }}
        />
      </div> 
      <Controls.Button
        text="Download"
        color="secondary"
        onClick={() => saveCanvas()} />

      <Controls.Button
        text="Filter"
        color="primary"
        onClick={handleSubmit} />
    
       {/* <input type = "month" onChange={filterChart}></input> */}
    </div>
  );
};



export default LineChart;

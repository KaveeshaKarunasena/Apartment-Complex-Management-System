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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
    const chartContainer = document.getElementById('Linechart-container');

  html2canvas(chartContainer).then( (canvas) => {

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0,0,width, height);
    pdf.save('Linechart.pdf');

  });
}



  return (
    <div>
      <div style={{ width: '700px' , height:'300px' }} id = 'Linechart-container'>
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

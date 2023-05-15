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
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
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


const LineChart = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
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
      console.log(chartData)


      // alert(setChartData.labels);
    };
    fetchData();
  }, []);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelect = (date) =>{
    
    // console.log(date);
    let filtered = allData.filter((allData)=>{

      // let date2 = moment(allData.date).format('YYYY-MM-DD')
      let Chdate = new Date(allData.date)
      //  console.log(Chdate)
       if(Chdate >= date.selection.startDate && Chdate <= date.selection.endDate){
         const filterData = Chdate
         console.log(filterData)
         return filterData
         
       }
       
    })
    
    setStartDate(date.selection.startDate)
    setStartDate(date.selection.endDate)
    
    // console.log(filtered)
    // setChartData({
    //   labels:
    //     filtered &&
    //     filtered.map(item => {
    //       return moment(item.date).format('YYYY-MM-DD');
    //     }),
    //   datasets: [
    //     {
    //       label: 'Maintenance Cost',
    //       data: filtered && filtered.map(item => item.amount),
    //       fill: true,
    //       borderColor: 'rgb(255,99,132)',
    //       backgroundColor: 'rgb(255,99,132,0.3)',
    //     },
    //   ],
    // });
    // console.log(startDate)
    // console.log(endDate)

    // console.log(filtered)

   
    
  }

  return (
    <div>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      <div style={{ width: '700px' , height:'300px' }}>
        <Line
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
    </div>
  );
};



export default LineChart;

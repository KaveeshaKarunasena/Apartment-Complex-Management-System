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
import {Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const LineChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/getCost');
      console.log(data);
      setChartData({
        labels: [data &&data.map(item => item.date)],
        datasets:[{
          label: 'Maintenance Cost',
          data: [data && data.map(item => item.amount)],
          fill: true,
          borderColor: 'rgb(255,99,132)',
          backgroundColor: 'rgb(255,99,132,0.3)',
        }]
      });
     

      console.log(chartData.labels)
    };
    fetchData();
  }, []);

  const data1 = {
    labels: ['mon','tue','wed'],
    datasets:[{
      label: 'Maintenance Cost',
      data: [6000,7300,9000],
      fill: true,
      borderColor: 'rgb(255,99,132)',
      backgroundColor: 'rgb(255,99,132,0.3)',
    }]
  };
  

  return(

    <div>
        <div>
            <Line
                data ={chartData}
                options = {{
                    responsive :true,
                    plugins:{
                        legend:{position:"top"},
                        title:{display:true, text :"Cost"}
                    },
                }}
            />
        </div>
    </div>

  )
};

export default LineChart;

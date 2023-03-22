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
    //   setChartData({
    //     labels: data.data.map(item => item._id),
    //     datasets: {
    //       label: 'Maintenance Cost',
    //       data: data.data.map(item => item.amout),
    //       fill: true,
    //       borderColor: 'rgb(255,99,132)',
    //       backgroundColor: 'rgb(255,99,132,0.3)',
    //     },
    //   });
    };
    fetchData();
  }, []);
  

  return(

    <div>
        <div>
            <Line>
                data ={chartData}
                options = {{
                    responsive :true,
                    Plugins:{
                        legend:{position:"top"},
                        title:{display:true, text :"Cost"}
                    },
                }}
            </Line>
        </div>
    </div>

  )
};

export default LineChart;

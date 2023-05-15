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

      console.log(setChartData.labels);
    };
    fetchData();
  }, []);

  return (
    <div>
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

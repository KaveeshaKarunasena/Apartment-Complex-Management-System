import React from 'react';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';


const BarChart2 = () => {

//   const [data, setData] = useState({
//     datasets: [{
//         data: [10, 20, 30],
//         backgroundColor:[
//           'red',
//           'blue',
//           'yellow'
//         ]
//     },
//   ],
//   labels: [
//       'Red',
//       'Yellow',
//       'Blue'
//   ], 
// });

  // useEffect(()=> {
  //   const fetchData = async () =>  {
  //     const {data} = await axios.get('/maintenance/getTotalByDate')
  //       console.log("resss", data.totalCost)

  //       setData(
  //         {
  //           datasets: [{
  //               data: data.totalCost && data.totalCost.map(item => item.totalCost),
  //               backgroundColor:[
  //                   'rgb(255, 99, 132)',
  //                   'rgb(54, 162, 235)',
  //                   'rgb(255, 205, 86)'
  //               ]
  //           },
  //         ],
  //         labels:data.totalCost && data.totalCost.map(item => {return moment(item._id).format('YYYY-MM-DD')}),
  //       }
  //       )
  //   }
  // fetchData();

  // const fetchTotal = async () =>{
  //   const {data} = await axios.get('/maintenance/getTotalCost')
  //       console.log("resss", data.total)
  //       const data1 = data.total.map(item =>item.total)
        
  //       setTotal({
  //          data :data1[0]
  // })
  //           // console.log(total)
      
  // }
  // fetchTotal();
  // }, [])
 
    // return (
    //   // <div>
    //   //   <Bar
    //   //   // data={data}
    //   //   // options={options}></Bar>
    //   // </div>

      
    // )

}

export default BarChart2;
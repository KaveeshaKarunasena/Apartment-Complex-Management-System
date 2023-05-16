import React, { useState } from "react";
import BarChart from "./charts/BarChart";

const USER_DATA = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];



const ServiceReport = () => {


    const [serviceData, setServiceData] = useState({
        labels: USER_DATA.map( (data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: USER_DATA.map( (data) => data.userGain)
            }
        ]
    });


    return (<div>
        <BarChart chartData = {serviceData}/>
    </div>)
}

export default ServiceReport;
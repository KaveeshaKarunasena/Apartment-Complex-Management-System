import React from 'react';
import {Doughnut} from 'react-chartjs-2';



function PieChart(props)
{
    return <Doughnut data = {props.chartData}/>
    
}

export default PieChart;
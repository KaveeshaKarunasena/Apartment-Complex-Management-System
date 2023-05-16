
import React from 'react';
import BarChart2 from '../Charts/BarChart2';
import LineChart from '../Charts/LineChart'
import PieChart from '../Charts/PieChart';
import CostTable from '../Charts/CostTable';
import './Repos.css'

import DateRange from './DateRangePicker';

const MaintenanceRepo = () =>{
 
    return(
        <div className='App'>
        < div className='repo'>
           <div className='lineChart'>
            <DateRange></DateRange>
             {/* <LineChart></LineChart> */}
             </div>
          {/* <BarChart2></BarChart2> */}
          
        </div> 
        < div className='repo2'>
            
            {/* <div className='table'><CostTable></CostTable></div> */}
            {/* <PieChart></PieChart> */}
        </div>
        </div>
    )
}

export default MaintenanceRepo
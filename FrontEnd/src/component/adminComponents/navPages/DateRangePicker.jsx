import { DateRangePicker } from 'react-date-range';
import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import LineChart from '../Charts/LineChart';
import BarChart2 from '../Charts/BarChart2';
import PieChart from '../Charts/PieChart';
import './Repos.css'
import CostTable from '../Charts/CostTable';

const DateRange = (prpos) =>{
    const {allData} = prpos
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [filterData,setFilterData] = useState()
    const comand = 'true'

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      }

    const handleSelect = (date) =>{
    
        
        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        
    
      }

    return(
        <>
        <div style={{
      
       paddingLeft:'25%'
      }}>

        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            />

        </div>
            
            <div className='App'>
            <div div className='repo'>
           <div className='lineChart'>
           <LineChart 
                startDate = {startDate}
                endDate={endDate}
                comand = {comand}
            />
           </div>
            
            <BarChart2 
            startDate = {startDate}
            endDate={endDate}
            />
            </div>
            < div className='repo2'>
            
            {/* <CostTable></CostTable> */}
            <PieChart
            startDate = {startDate}
            endDate={endDate}
            />
            <div className='table'>
            <CostTable
            startDate = {startDate}
            endDate={endDate}></CostTable>
            </div>
            </div>
            
            </div>
        </>
        
    )
}


export default DateRange
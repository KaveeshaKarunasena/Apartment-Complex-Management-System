
import "./Report.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Calander from "../../../../rightSide/CalenderComp"
//import Chart from "../../Complain_chart/Complain_chart"

const Report = () => {

    const [data, setData] = useState([]);
    //all data
    const [dataCount, setDataCount] = useState(0);
    
    //accepted
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [ac_percentage, set_AC_Percentage] = useState(null);
    
    //Rejected
    const [rejectedCount, setRejectedCount] = useState(0);
    const [re_percentage, set_Re_Percentage] = useState(null);
    
    //Not Checked
    const [notCheck, setNotCheck] = useState(0);
    const [nc_percentage, set_Nc_Percentage] = useState(null);
    
    //get data details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/complain/");
                const rows = res.data.map((row, index) => ({ ...row, id: index }));
                setData(rows);
    
                //counts
                setDataCount(rows.length);
                setAcceptedCount(rows.filter((item) => item.Status === "accepted").length);
                setRejectedCount(rows.filter((item) => item.Status === "Rejected").length);
                setNotCheck(rows.filter((item) => item.Status === "Not Checked").length);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (dataCount > 0) {
            set_AC_Percentage((acceptedCount / dataCount) * 100);
            set_Nc_Percentage((notCheck / dataCount) * 100);
            set_Re_Percentage((rejectedCount / dataCount) * 100);
        }
    }, [dataCount, acceptedCount, notCheck, rejectedCount]);
    


    console.log(nc_percentage)

    return (
        <div className='Report'>
            <div className="all_report">
                <div className="top">
                    <div className="item">
                        <span className='title'> Total </span>
                        <span className='count'> {dataCount} </span>
                    </div>
                </div>

                <div className="bot">
                    <div className="left">
                        <div className="item">
                            <span className='title'> Acceptet </span>
                            <span className='count'>  {acceptedCount} </span>
                        </div>
                       
                            <span className='persentage'> {ac_percentage}% </span>
                        
                    </div>

                    <div className="Middle">
                        <div className="item">
                            <span className='title'> Not&nbsp;Check </span>
                            <span className='count'>  {notCheck} </span>
                        </div>
                        
                            <span className='persentage'> {nc_percentage}% </span>
                     
                    </div>

                    <div className="right">
                        <div className="item">
                            <span className='title'> Rejected </span>
                            <span className='count'>  {rejectedCount} </span>
                        </div>
                       
                            <span className='persentage'> {re_percentage}% </span>
                      
                    </div>
                </div>
            </div>

            <div className="calender">
                <Calander/>
            </div>

            <div className="charts">
                {/* <Chart/> */}
            </div>
        </div>
    )

}

export default Report

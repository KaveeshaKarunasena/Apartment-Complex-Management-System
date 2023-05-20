import React ,{useEffect, useState}from 'react';
import axios from 'axios'
import { cardData } from '../../../data/Data';
import './Cards.css';
import Card from '../Card/Card';
import CalenderComp from '../rightSide/CalenderComp';


function Cards(props) {

  const [apartmentCnt , setApartmentCnt] = useState()
  const [income, setIncome] = useState()
  const [apartment, setApartment] =useState()
  const [available, setAvailable] =useState()
  const [maintenanceCnt , setMaintenanceCnt] = useState()
  const [pendingCnt, setPendingCnt] =useState()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/apartmentCount');
      const {apartmentno} = data.count[0]
      setApartmentCnt(apartmentno)
      console.log(apartmentCnt)

      const response = await axios.get('/maintenance/registeredApartments');
      const {string} = response.data.details[0]
      setApartment(string)

      const availableAp = apartmentno - string
      setAvailable(availableAp)
      

      const res = await axios.get('/maintenance/getIncome');
      const {total} = res.data.income[0]
      setIncome(total)
      

      const res2 = await axios.get('/maintenance/maintenanceCount');
      const {apartmentNo} = res2.data.count[0]
      setMaintenanceCnt(apartmentNo)
      

      const res3 = await axios.get('/maintenance/pendingCount');
      const {pend} = res3.data.details[0]
      setPendingCnt(pend)
      console.log(pend)

    };
    fetchData();
  }, []);

  return (
    <div className="Cards">
      
          <div className="parentContainer">
          <div className="Card">
          
          
          <Card apartmentCnt= {apartmentCnt} title = 'Total' income ={income} title2 = 'Income' apartment ={apartment} title3 = 'Registered'></Card>
          <div style={{marginTop:'10%'}}>
          <Card apartmentCnt= {maintenanceCnt} title = 'Fixed' income ={available} title2 = 'Available' apartment ={pendingCnt} title3 = 'pending'></Card>
          </div>
          </div>
          </div>
       <CalenderComp></CalenderComp>
    </div>


  );
}

export default Cards;

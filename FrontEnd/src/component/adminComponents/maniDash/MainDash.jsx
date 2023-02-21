import React from 'react'
import './MainDash.css'
import Navbar from './Navbar'
import Cards from '../cards/Cards'
import RightSide from '../rightSide/RightSide';
import About from '../pages/About';
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import AddApartments from '../navPages/AddApartments';
import CalenderComp from '../rightSide/CalenderComp';

function MainDash() {

 
  return (
    
    <div>
         
        <div className="MainDash">
        
            <div>
                <h1>Dashboard</h1>
                <div className="NavLink">
                <NavLink to='/'  style={{"text-decoration" : "none"}}><span>MainDash</span></NavLink>
                <NavLink to='add' style={{"text-decoration" : "none"}}><span>Add Apartment</span></NavLink>
                <NavLink to='view' style={{"text-decoration" : "none"}}><span>View Apartment</span></NavLink>
                <NavLink to='view' style={{"text-decoration" : "none"}}><span></span></NavLink>
                <NavLink to='maintenance' style={{"text-decoration" : "none"}}><span>Maintenance Cost</span></NavLink>
                
                
                {/* <div><CalenderComp/></div> */}
                <Outlet/>
                </div>
                
                <div>
               
                

                 
                </div>
                
                 
                
            </div>
            
           
              
             
            
        </div>
         
    </div>
    

   
  )
}

export default MainDash

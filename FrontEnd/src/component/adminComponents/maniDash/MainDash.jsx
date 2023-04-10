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
<<<<<<< Updated upstream
    
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
               
                
=======
    <div className={classes.root}>
      <h1>Admin Dashboard</h1>
      <div className={classes.content}>
        <NavLink
          to="home"
          className={clsx(classes.nav, classes.p2)}
          style={navLinkStyle}
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="add"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>Add Apartment</span>
        </NavLink>
        <NavLink
          to="view"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>View Apartment</span>
        </NavLink>
        <NavLink
          to="maintenance"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>Maintenance Cost</span>
        </NavLink>
>>>>>>> Stashed changes

                 
                </div>
                
                 
                
            </div>
            
           
              
             
            
        </div>
         
    </div>
    

   
  )
}

export default MainDash

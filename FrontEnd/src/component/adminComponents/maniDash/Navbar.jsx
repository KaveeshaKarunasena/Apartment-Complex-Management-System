import React from 'react'
import './Navbar.css'
import { UilSearch, UilBell, UilHipchat  } from '@iconscout/react-unicons'
import Profile from '../../../imgs/profile.png'
import SearchBar from './searchBar/SearchBar'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="wrapper">
            <div className='items2'>
                <div className="item2">
                    <span>OVERVIEW</span>
                </div>
                <div className="item2">
                    <span>REPORT</span>
                </div>
            </div>    
            <div className="search">
                <SearchBar placeholder="Enter anything"/>
            </div>
            <div className="items">
               <div className="item">
                    <UilHipchat />
                    <div className='counter'>1</div>
                </div>
                <div className="item">
                    <UilBell/>
                    <div className='counter'>2</div>
                </div>
                <div className="item">
                    <img src={Profile} alt="" className='avatar' />
                </div>
            </div> 
            
        </div>
    </div>
  )
}

export default Navbar

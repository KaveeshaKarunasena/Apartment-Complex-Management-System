import React from 'react';
import { SidebarData } from '../../data/Data';
import Logo from '../../imgs/logo.png';
import './Sidebar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {FaBars}from "react-icons/fa";

function Sidebar({children}) {

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    return (
        <div className="sidebar">
            {/*logo*/}
        <div className="logo">
                <img src={Logo} alt="" />
                <span>
                    Name
                </span>
        </div>

        {/* menu */}
        

        <div className="container">
            <div style={{width: isOpen ? "172px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <div style={{marginLeft: isOpen ? "130px" : "-10px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    SidebarData.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
        </div>

    );
}

export default Sidebar
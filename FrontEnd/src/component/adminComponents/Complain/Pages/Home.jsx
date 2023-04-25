import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.scss"

const Home = () => {
  //complain navigation bar------------------------------------------
  return (
    <div className='repot_home'>


      <div className="container">
        <Link to={`/complain/all`} style={{ textDecoration: "none" }}>
          <div className="viewButton">  View All </div>
        </Link>

        <Link to={`/complain/new`} style={{ textDecoration: "none" }}>
          <div className="viewButton"> new </div>
        </Link>

        <Link to={`/complain/update`} style={{ textDecoration: "none" }}>
          <div className="viewButton"> Update </div>
        </Link>

        <Link to={`/complain/reprot`} style={{ textDecoration: "none" }}>
          <div className="viewButton"> reprot </div>
        </Link>
      </div>
      
    </div>
  )
}

export default Home

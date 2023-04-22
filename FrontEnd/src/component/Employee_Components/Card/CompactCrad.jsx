import React from 'react'
import './Card.css'

function CompactCrad({param}) {
    const Png = param.png;
    return(
        <div className="CompactCard" style={{
            background : param.color.backGround,
            boxShadow : param.color.boxShadow
        }} >

            <div className="radialBar">
                <CircularProgressbar value={ param.barValue}  text={`${param.barValue}%`}/>
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png/>
                <span>{param.value}</span>
                <span>Last Month</span>
            </div>
        </div>
    )
}




export default CompactCrad

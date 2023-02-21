import React from 'react'
import { cardData } from '../../../data/Data'
import './Cards.css'
import Card from '../Card/Card'

function Cards(props) {
  return (
    <div className='Cards'>
      {cardData.map((card,id)=>{
        return(
            <div className="parentContainer">
                <div className="Card">
                    <Card
                        title = {card.title}
                        color = {card.color}
                        barValue = {card.barValue}
                        value = {card.value}
                        png = {card.png}
                        series = {card.series}
                    />
                    </div>
               

                <div className="Card">
                    <Card
                        title = {card.title}
                        color = {card.color}
                        barValue = {card.barValue}
                        value = {card.value}
                        png = {card.png}
                        series = {card.series}
                    />
                </div>
               
            </div>
            
        )
      })}
    </div>
  )
}

export default Cards

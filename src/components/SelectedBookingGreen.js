import all from 'gsap/all'
import React, {useState, useEffect}from 'react'

export default function SelectedBookingGreen({
    booking,
    allPrices
}) {
    
    const prices = allPrices[allPrices.length - 1]
    const totalAmount = (prices*(0.15)) + prices
    console.log("all the prices on green", allPrices);



  return (
    <div className='actual-offers confirmed' style={{marginTop:"12px"}}>
        <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{booking.booking_ref}</h2>
        <div className='loads-offered'>
            <div>
                <p>10 loads offered</p>
                <p>Confirmed Net Rate: R{prices}</p>
                <p>Value Added Tax: R{(prices*(0.15)).toFixed(2)}</p>
                <p>Total: R{totalAmount}</p>
            </div>

            <div>
            <p style={{color:"#0039BF"}}>View Schedule</p>
            </div>
        </div>
    </div>
  )
}

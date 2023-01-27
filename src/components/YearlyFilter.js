import React from 'react'
import { useStateContextBookings } from '../context/AllBookingsContext'

export default function YearlyFilter() {
    const { 
        getYearlyBookings,
        allOfTheBooking
    } = useStateContextBookings();
    var counter = 0;
  return (
    <div className='dash-date' style={{display:`${allOfTheBooking.length ? "block" : "none"}`}}>
        <div className='dash-date-title'>
            <h2>{(new Date()).getFullYear()}</h2>
            <div className='booking-dash' style={{height: `${!getYearlyBookings.length > 0 && getYearlyBookings.length > 3 ? "200px" :"121px"}`, maxHeight: `${!getYearlyBookings.length > 0 && getYearlyBookings.length > 3 ? "200px" :"121px"}`}}>
                {getYearlyBookings.length > 0 && getYearlyBookings.map((booking, i) => (
                    <div className='book-name' key={i}>
                        <div className='left-book-name'>
                            <h2 style={{fontWeight:"bold", marginRight:"15px"}}>{counter += 1}</h2>
                            <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>{booking.cargoInformation.productName}</p>
                        </div>
                        <div className='right-dash-name'>
                            <div style={{width:"100px"}}>
                                <p style={{marginBottom:"0", textAlign:"end"}}>{booking.cargoInformation.vehicle_type}</p>
                            </div>
                            <div style={{width:"100px", textAlign:"end"}}>
                                <p style={{marginBottom:"0", textAlign:"end"}}>{((booking.puDetails.puCityName).substring(0,3)).toUpperCase()} - {((booking.doDetails.doCityName).substring(0,3)).toUpperCase()}</p>
                            </div>
                            <div style={{width:"100px"}}>
                                <p style={{marginBottom:"0", textAlign:"end"}}>{booking.booking_ref}</p>
                            </div>
                            <div style={{width:"100px"}}>
                                <p style={{ marginBottom:"0", color:"#f90500", fontWeight:"bold", textAlign:"end"}}>Not delivered</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

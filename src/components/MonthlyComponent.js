import React from 'react'
import { useStateContextBookings } from '../context/AllBookingsContext'

export default function MonthlyComponent() {

    const { 
        getJanuaryMonthlyBookings,
        getFebruaryMonthlyBookings,
        getMarchMonthlyBookings,
        getAprilMonthlyBookings,
        getMayMonthlyBookings,
        getJuneMonthlyBookings,
        getJulyMonthlyBookings,
        getAugustMonthlyBookings,
        getSeptemberMonthlyBookings,
        getOctoberMonthlyBookings,
        getNovemberMonthlyBookings,
        getDecemberMonthlyBookings,
        allOfTheBooking
    } = useStateContextBookings();
    var counter = 0;

  return (
    <div className='dash-date' style={{display:`${allOfTheBooking.length ? "block" : "none"}`}}>
        <div className='dash-date-title' style={{display: `${!getJanuaryMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>January {(new Date()).getFullYear()}</h2>
            <div className='booking-dash' style={{height: `${!getFebruaryMonthlyBookings.length > 0 && getJanuaryMonthlyBookings.length > 3 ? "200px" :"121px"}`, maxHeight: `${!getFebruaryMonthlyBookings.length > 0 && getJanuaryMonthlyBookings.length > 3 ? "200px" :"121px"}`}}>
                {getJanuaryMonthlyBookings.length > 0 && getJanuaryMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getFebruaryMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>February {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getFebruaryMonthlyBookings.length > 0 && getFebruaryMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getMarchMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>March {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getMarchMonthlyBookings.length > 0 && getMarchMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getAprilMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>April {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getAprilMonthlyBookings.length > 0 && getAprilMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getMayMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>May {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getMayMonthlyBookings.length > 0 && getMayMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getJuneMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>June {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getJuneMonthlyBookings.length > 0 && getJuneMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getJulyMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>July {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getJulyMonthlyBookings.length > 0 && getJulyMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getAugustMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>August {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getAugustMonthlyBookings.length > 0 && getAugustMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getSeptemberMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>September {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getSeptemberMonthlyBookings.length > 0 && getSeptemberMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getOctoberMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>October {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getOctoberMonthlyBookings.length > 0 && getOctoberMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getNovemberMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>November {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getNovemberMonthlyBookings.length > 0 && getNovemberMonthlyBookings.map((booking, i) => (
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

        <div className='dash-date-title' style={{display: `${!getDecemberMonthlyBookings.length > 0 ? "none" : "block"}`}}>
            <h2>December {(new Date()).getFullYear()}</h2>
            <div className='booking-dash'>
                {getDecemberMonthlyBookings.length > 0 && getDecemberMonthlyBookings.map((booking, i) => (
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

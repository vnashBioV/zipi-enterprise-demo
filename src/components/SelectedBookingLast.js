import React from 'react'

export default function SelectedBookingLast({
    booking,
    allPrices,
    setAllPrices,
    firstPrice,
    handleAccept,
    handleDecline
}) {

    console.log("all price ku last blue", allPrices)

  return (
    <div className='actual-offers counter' style={{marginTop:"12px"}}>
        <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{booking.booking_ref}</h2>
        <div className='loads-offered'>
            <div>
                <p>10 loads offered</p>
                {booking.booking_bids_prices ?
                    <p>Transporter Quotation: R{firstPrice}</p>
                    :
                    <p>Transporter Quotation: R{0}</p>
                }

                {booking.booking_bids_prices ?
                    <p>Counter Offer: R{allPrices[1]}</p>
                    :
                    <p>Counter Offer: R{0}</p>
                }  
            </div>
            <div>
                <button className='decline-offer' onClick={() => handleDecline(booking)}>Decline</button>
            </div>
            <div>
                <button className='accept-offer' onClick={() => handleAccept(booking)}>Accept</button>
            </div>
        </div>
    </div>
  )
}

import React, {useState, useEffect}from 'react'

export default function SelectedBookingFirstBlue({
    booking,
    allPrices,
    setAllPrices
}) {

    console.log("All the prices for the N6v11", allPrices[0])
    const [allPricesFirst, setAllPricesFirst] = useState(0);

    useEffect(() => {
      setAllPricesFirst(allPrices[0])
    }, [allPricesFirst])
    

  return (
    <div className='actual-offers counter' style={{marginTop:"12px"}}>
        <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{booking.booking_ref}</h2>
        <div className='loads-offered'>
            <div>
                <p>10 loads offered</p>
                {booking.booking_bids_prices ? 
                <p>Transporter Quotation: R{allPrices[0]}</p>
                :
                <p>Transporter Quotation: R00.00</p>
                }

                {booking.booking_bids_prices ? 
                <p>Counter Offer: R{allPrices[1]}</p>
                :
                <p>Counter Offer: R00.00</p>
                }
            </div>
            
            <div>
            <p><b>Rate submitted</b></p>
            </div>
        </div>
    </div>
  )
}

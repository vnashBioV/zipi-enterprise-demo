import React, {useContext} from 'react'
import SelectedBookingContext from '../context/SelectedBooking'

export default function SelectedBookingFinal() {
    const SelectedBookingContext = useContext(SelectedBookingContext);
    console.log("context data", SelectedBookingContext.testing_context[0].booking_ref);
  return (
    <div>
        <h2>Hello Context</h2>
    </div>
  )
}

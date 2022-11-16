import React, {useState, useEffect, useRef, useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';
import SingleBooking from './SingleBooking';
import firebase from '../firebase-config';
// import {AllBookingsContext} from '../context/AllBookingsContext'

export default function AllMyBookings({
  setCounterOffer,
  counterOffer,
  setBackColor,
  backColor,
  setRateSubmit,
  rateSubmit,
  setAccepted,
  accepted,
  setFinalOffer,
  setDeactivateAccept
}) {
  const [allBookings, setAllBooking] = useState([])
  // const {allbookingsValue, setAllbookingsValue} = useContext(AllBookingsContext)

  useEffect(() => {
    if(localStorage.getItem("userUid")){
        const Uid = JSON.parse(localStorage.getItem("userUid"))
        const bookingRef = firebase.database().ref('booking'  ).orderByChild('booking_party_uid').equalTo(Uid);
        var childrenArray = []
        bookingRef.on('value', (snapshot) => {
          setAllBooking(Object.values(snapshot.val()));
          // setAllbookingsValue(Object.values(snapshot.val()))
          localStorage.setItem("AllMyBookings", JSON.stringify(childrenArray));
        });
    }
  }, [])

  console.log("all booking", allBookings);

  return (
    <>
    {allBookings && allBookings.map((booking) => (
        <SingleBooking
            booking={booking}
            id={booking.booking_id}
            key={booking.booking_id}
            allBookings={allBookings}
            setCounterOffer={setCounterOffer}
            counterOffer={counterOffer}
            setBackColor={setBackColor}
            backColor={backColor}
            setRateSubmit={setRateSubmit}
            rateSubmit={rateSubmit}
            setAccepted={setAccepted}
            accepted={accepted}
            setFinalOffer={setFinalOffer}
            setDeactivateAccept={setDeactivateAccept}
        />
    ))}
    </>
  )
}

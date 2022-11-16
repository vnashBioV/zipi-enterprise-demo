import React, {useState, useContext, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {UserContext} from '../context/NewContext';
import {AllPricesContext} from '../context/SelectAllPricesContext'
import {SelectedTotal} from '../context/SelectedTotal'
import firebase from '../firebase-config';


export default function SingleBooking({
    booking,
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
    const {selectedValue, setSelectedValue}  = useContext(UserContext)
    const {allPricesValue, setAllPricesValue} = useContext(AllPricesContext)
    const {selectedTotalValue, setSelectedTotalValue} = useContext(SelectedTotal)

    const selectBookingHandler = () =>{
      setSelectedValue(booking)
      var fleets = booking.booking_bids_fleet_id
      if(booking.booking_bids_fleet_id){
        fleets.forEach((fleet) => {
            firebase.database().ref('fleets/' + fleet).child("booking_bids").child(selectedValue.booking_id).on('value', (snapshot) => {
              console.log("booking bids", snapshot.val());
              setAllPricesValue(snapshot.val().price)
              // setFleetsAccepted(snapshot.val()?.fleets)
              // tempVat.push(snapshot.val()?.price[2])
              if(snapshot.val()?.price[1] !== undefined){
                setCounterOffer(true)
                setBackColor(false)
                setRateSubmit(false);
              }
              if(snapshot.val().price[2] !== undefined){
                setFinalOffer(true)
              }
              if(snapshot.val().accepted === true){
                setAccepted(true);
                setDeactivateAccept(true);
              }
              setSelectedTotalValue((snapshot.val()[2]*(14/100)) + (snapshot.val()[2]));
          });
        })
      }

      console.log("my selected booking fleet id", booking.booking_bids_fleet_id)
      localStorage.setItem("selectedItemBidding", JSON.stringify([booking]));
    }


  return (
    <div className='deals-card' key={uuidv4()} onClick={() => {
      selectBookingHandler()
      // setPricesValues()
      }}>
      <div>
        <h2>{booking.booking_ref}</h2>
        <p>{booking.puDetails.CityName} to {booking.doDetails.CityName}</p>
      </div>
      <div>
        <p>{booking.date_created}</p>
        <p>301/405</p>
        <p>{} offers</p>
      </div>
    </div>
  )
}

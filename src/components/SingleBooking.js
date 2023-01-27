import React, {useState, useContext, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {useStateContextSingle} from '../context/SingleSelectedBooking';
import {AllPricesContext} from '../context/SelectAllPricesContext'
import {SelectedTotal} from '../context/SelectedTotal'
import firebase from '../firebase-config';
import { useStateContextAllPrices } from '../context/SelectAllPricesContext'
import { useStateBidding } from '../context/BiddingStatesContext'

export default function SingleBooking({
    booking,
    setRateSubmit,
    rateSubmit,
    setDeactivateAccept
}) {
    const {selectedValue, setSelectedValue}  = useStateContextSingle()
    // const {allPricesValue, setAllPricesValue} = useContext(AllPricesContext)
    const {selectedTotalValue, setSelectedTotalValue} = useContext(SelectedTotal)

    const { 
      backColor, 
      setBackColor,
      counterOffer, 
      setCounterOffer,
      finalOffer, 
      setFinalOffer,
      accepted, 
      setAccepted,
      greenBackground, 
      setGreenBackground,
      blueBackground, 
      setBlueBackground,
      yellowBackground, 
      setYellowBackground,
    } = useStateBidding();

    const { 
      allPricesValue, 
      setAllPricesValue
  } = useStateContextAllPrices();

    const selectBookingHandler = () =>{
      setSelectedValue(booking)
      var fleets = booking.booking_bids_fleet_id
      if(booking.booking_bids_fleet_id){
        fleets.forEach((fleet) => {
            firebase.database().ref('fleets/' + fleet).child("booking_bids").child(booking.booking_id).on('value', (snapshot) => {
              console.log("booking price", snapshot.val().price);
              setAllPricesValue(snapshot.val().price)
              if(snapshot.val().price !== undefined){
                if(snapshot.val().price.length === 1){
                  setYellowBackground(true);
                  setBlueBackground(false);
                  setGreenBackground(false);
                }
                if(snapshot.val().price.length > 1 ){
                  setYellowBackground(false);
                  setBlueBackground(true);
                  setGreenBackground(false);
                }
                if(snapshot.val().price[1] !== undefined) {
                  setCounterOffer(true)
                  // setBackColor(false)
                  setRateSubmit(false);
                }
                if(snapshot.val().price[2]){
                  setFinalOffer(true)
                }
                
              }
              if(snapshot.val().accepted === true){
                setAccepted(true);
                setDeactivateAccept(true);
                setGreenBackground(true);
                setYellowBackground(false);
                setBlueBackground(false);
                setGreenBackground(true);
              }
              
              // console.log("this is the snap shot", snapshot.val().price);
              setSelectedTotalValue((snapshot.val()[2]*(14/100)) + (snapshot.val()[2]));
          });
        })
      }

      console.log("my selected booking fleet id", booking.booking_bids_fleet_id)
      localStorage.setItem("selectedItemBidding", JSON.stringify([booking]));
    }


  return (
    <div className='deals-card' key={uuidv4()} onClick={() => selectBookingHandler()}>
      <div>
        <h2>{booking.booking_ref}</h2>
        <p>{booking.puDetails.puCityName} to {booking.doDetails.doCityName}</p>
      </div>
      <div>
        <p>{booking.date_created}</p>
        <p>301/405</p>
        <p>{booking.booking_bids_fleet_id?.length} offers</p>
      </div>
    </div>
  )
}

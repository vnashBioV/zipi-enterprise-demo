import SelectedBookingContext from '../context/SelectedBooking'
import React, {useState, useEffect, useRef, useContext} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import { v4 as uuidv4 } from 'uuid';
import { set } from 'date-fns';
import { setEmitFlags } from 'typescript';
import { fi } from 'date-fns/locale';

export default function SelectedBookingFinal({
  // fleet,
  // bookingId,
  // bookingRef
}) {
    const [accepted, setAccepted] = useState(false);
    const [backColor, setBackColor] = useState(true);
    const [counterOffer, setCounterOffer] = useState(false);
    const [finalOffer, setFinalOffer] = useState(false);
    const [vat, setVat] = useState();
    const [total, setTotal] = useState();
    const [rateSubmit, setRateSubmit] = useState(true);
    const [allBookingPricess, setAllBookingPricess] = useState([]);
    const [firstPrice, setFirstPrice] = useState(0);
    const [secondPrice, setSecondPrice] = useState(0);
    const [thirdPrice, setThirdPrice] = useState(0);
    const [settleAmount, setSettleAmount] = useState(null);
    const [deactivateAccept, setDeactivateAccept] = useState(false);

    const selectedBookingData = useContext(SelectedBookingContext);
    const fleets = selectedBookingData.selected_Booking.fleets
    const bookingId = selectedBookingData.selected_Booking.booking_id

    const handleSettle = (fleet, bookingId) =>{
      firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).child("price").update({ 
        1: parseFloat(settleAmount)
      });
      console.log("The second price", secondPrice)
    }

    const handleDecline = (fleet, bookingId) => {
      firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).update({ 
        accepted: false
      }); 
    }

    const handleAccept = (fleet, bookingId) =>{
      firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).update({ 
            accepted: true
      }).then(() => {
        var fleet = 'Fundo'
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('lod', () => {
            console.log(xhr.responseText);
        })
        xhr.open('GET', 'https://developer.zipi.co.za/acceptRequestBookingParty.php?sendto=' + "tshilidzirabuda9@gmail.com" + 
            '&name=' + fleet + 
            '&date=' + new Date().toISOString().substring(0,10) 
        )
        xhr.send();
      });
    }

    const getFleetData = (fleet, bookingId) =>{
      var tempVat = []
      firebase.database().ref('fleets/' + fleet).child("booking_bids").child(bookingId).on('value', (snapshot) => {
        setAllBookingPricess([snapshot.val()?.price])
        setFirstPrice(snapshot.val()?.price[0])
        setSecondPrice(snapshot.val()?.price[1])
        // second.push(snapshot.val().price[1])
        setThirdPrice(snapshot.val()?.price[2])
        tempVat.push(snapshot.val()?.price[2])
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
        }
        setVat(((snapshot.val().price[2])*0.15).toFixed(2));
        tempVat.push(((snapshot.val().price[2])*0.15).toFixed(2));
        setTotal(parseFloat(tempVat + vat).toFixed(2));
        console.log("fleets prices", snapshot.val());
      });
    }

    console.log("context data", selectedBookingData);
  return (
    <div>
          {selectedBookingData.selected_Booking.booking_bids_fleet_id ? fleets.map((fleet) => {
            getFleetData(fleet, bookingId)
            return (
              <div className='actual-offers'>
              {!accepted ?
                <span className={backColor ? 'yellowBidding' : 'blueBidding'} ></span>
                : <span className="backGreen"></span>
              }
              <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{selectedBookingData.selected_Booking.booking_ref}</h2>
              <div className='loads-offered'>
                {!accepted ?
                  <div> 
                    <p>{selectedBookingData.selected_Booking?.loads_required} loads offered</p>
                    {allBookingPricess?.length > 0 ?
                      <p>Transporter Quotation: R{firstPrice}</p>
                      : <p>Transporter Quotation: R00</p>
                    }
                    {counterOffer ?
                      <p>Counter Offer: R{secondPrice}</p> 
                      :<></>
                    }
                    {finalOffer ?
                      <p>Final Offer: R{thirdPrice} </p>
                      :<></>
                    }
                  </div> 
                  : <div>
                      <p>10 loads booked</p>
                      <p>Confirmed Net Rate: R{thirdPrice}</p>
                      <p>Value Added Tax: R{vat}</p>
                      <p>Total: R{total}</p>
                    </div>
                } 
  
                {!counterOffer ?
                  <div>
                    <div>
                      <input type="text" placeholder='Amount (R)' value={settleAmount} onChange={event => setSettleAmount(event.target.value)}/>
                      <button onClick={() => handleSettle(fleet, bookingId)}>Settle</button>
                    </div>
                  </div>
                  : <></>
                }
  
                {!counterOffer ?
                    <div>
                      <button className={!deactivateAccept ? 'accept-offer' : 'accept-deactivated'} onClick={() => {handleAccept(fleet, bookingId)}}>Accept</button>
                    </div>
                  : <></>
                }
  
                {!rateSubmit && !finalOffer &&
                  <p style={{fontWeight: 'bold'}}>Rate submitted</p>
                }
  
                {finalOffer && !accepted &&
                  <div>
                    <button className='decline-offer' onClick={() => {handleDecline(fleet, bookingId)}}>Decline</button>
                  </div>
                }
  
                {finalOffer && !accepted &&
                  <div>
                    <button className='accept-offer' onClick={handleAccept}>Accept</button>
                  </div>
                }
              </div>
            </div>
            )
          })
            :
            <div className='actual-offers'>
              {!accepted ?
                <span className={backColor ? 'yellowBidding' : 'blueBidding'} ></span>
                : <span className="backGreen"></span>
              }
              <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{selectedBookingData.selected_Booking.booking_ref}</h2>
              <div className='loads-offered'>
                {!accepted ?
                  <div> 
                    <p>{selectedBookingData.selected_Booking?.loads_required} loads offered</p>
                    {allBookingPricess?.length > 0 ?
                      <p>Transporter Quotation: R{firstPrice}</p>
                      : <p>Transporter Quotation: R00</p>
                    }
                    {counterOffer ?
                      <p>Counter Offer: R{secondPrice}</p> 
                      :<></>
                    }
                    {finalOffer ?
                      <p>Final Offer: R{thirdPrice} </p>
                      :<></>
                    }
                  </div> 
                  : <div>
                      <p>10 loads booked</p>
                      <p>Confirmed Net Rate: R{thirdPrice}</p>
                      <p>Value Added Tax: R{vat}</p>
                      <p>Total: R{total}</p>
                    </div>
                } 
  
                {!counterOffer ?
                  <div>
                    <div>
                      <input type="text" placeholder='Amount (R)' value={settleAmount} onChange={event => setSettleAmount(event.target.value)}/>
                      {/* <button onClick={() => handleSettle(bookingId, fleet)}>Settle</button> */}
                    </div>
                  </div>
                  : <></>
                }
  
                {!counterOffer ?
                    <div>
                      <button className={!deactivateAccept ? 'accept-offer' : 'accept-deactivated'} onClick={handleAccept}>Accept</button>
                    </div>
                  : <></>
                }
  
                {!rateSubmit && !finalOffer &&
                  <p style={{fontWeight: 'bold'}}>Rate submitted</p>
                }
  
                {finalOffer && !accepted &&
                  <div>
                    <button className='decline-offer' onClick={handleDecline}>Decline</button>
                  </div>
                }
  
                {finalOffer && !accepted &&
                  <div>
                    <button className='accept-offer' onClick={handleAccept}>Accept</button>
                  </div>
                }
              </div>
            </div>
          }
    </div>
  )
}

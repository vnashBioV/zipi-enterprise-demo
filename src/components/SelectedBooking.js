import React, {useState, useEffect, useRef, useContext} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import { v4 as uuidv4 } from 'uuid';
import {useStateContextSingle} from '../context/SingleSelectedBooking';
import {StateContextAllPrices} from '../context/SelectAllPricesContext'
import {SelectedTotal} from '../context/SelectedTotal'

// import BiddingDetails from '../components/BiddingDetails';

function SelectedBooking({
    booking,
    fleet,
    fleetId,
}) {

  const [backColor, setBackColor] = useState(true);
  const [counterOffer, setCounterOffer] = useState(false);
  const [finalOffer, setFinalOffer] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [vat, setVat] = useState();
  const [total, setTotal] = useState();
  const [rateSubmit, setRateSubmit] = useState(true);
  const [allBookingPricess, setAllBookingPricess] = useState([]);
  const [firstPrice, setFirstPrice] = useState(0);
  const [secondPrice, setSecondPrice] = useState(0);
  const [thirdPrice, setThirdPrice] = useState(0);
  const [fleetsAccepted, setFleetsAccepted] = useState(false);
  const [settleAmount, setSettleAmount] = useState();
  const [deactivateAccept, setDeactivateAccept] = useState(false);
  const {selectedValue, setSelectedValue}  = useStateContextSingle()
  const {allPricesValue, setAllPricesValue} = useContext(StateContextAllPrices)
  const {selectedTotalValue, setSelectedTotalValue} = useContext(SelectedTotal)


  const handleSettle = () =>{
    firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(booking.booking_id).child("price").update({ 
      1: parseFloat(settleAmount)
    });
    console.log("The second price", secondPrice)
  }

  const handleDecline = () => {
    firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(booking.booking_id).update({ 
      accepted: false
    }); 
  }

  const handleAccept = (booking) =>{
    // console.log(fleetId)
    firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(booking.booking_id).update({ 
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

  useEffect(() => {
    var tempVat = []
    firebase.database().ref('fleets/' + fleet).child("booking_bids").child(booking.booking_id).on('value', (snapshot) => {
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

    // if(selectedValue?.fleets){
    //   setFleetsAccepted(true)
    // }

    return () => {
      setCounterOffer()
    }
  }, [])

  console.log("All prices", allPricesValue)
  console.log("the total amount", selectedTotalValue)
  console.log("see me here", selectedValue)

  return (
    <div>
      {/* {!fleetsAccepted ? */}
        <div className='actual-offers'>
          {!accepted ?
            <span className={backColor ? 'yellowBidding' : 'blueBidding'} ></span>
            : <span className="backGreen"></span>
          }
          <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{booking.booking_ref}</h2>
          <div className='loads-offered'>
            {!accepted ?
              <div>
                <p>{booking?.loads_required} loads offered</p>
                {allPricesValue?.length > 0 ?
                  <p>Transporter Quotation: R{allPricesValue[0]}</p>
                  : <p>Transporter Quotation: R00</p>
                }
                {counterOffer ?
                  <p>Counter Offer: R{allPricesValue[1]}</p> 
                  :<></>
                }
                {finalOffer ?
                  <p>Final Offer: R{allPricesValue[2]} </p>
                  :<></>
                }
              </div> 
              : <div>
                   <p>10 loads booked</p>
                   <p>Confirmed Net Rate: R{allPricesValue[2]}</p>
                   <p>Value Added Tax: R{(allPricesValue[2])*(14/100)}</p>
                   <p>Total: R{selectedTotalValue}</p>
                </div>
            }

            {!counterOffer && !accepted ?
              <div>
                <div>
                  <input type="text" placeholder='Amount (R)' value={settleAmount} onChange={event => setSettleAmount(event.target.value)}/>
                  <button onClick={() => handleSettle(booking.booking_id, fleetId)}>Settle</button>
                </div>
              </div>
              : <></>
            }

            {!counterOffer && !accepted ?
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
        {/* :
        <div>Hello accepted</div>
      }  */}
             
    </div>
  )
}
export default React.memo(SelectedBooking)
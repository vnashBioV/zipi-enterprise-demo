import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import { v4 as uuidv4 } from 'uuid';
import BiddingDetails from '../components/BiddingDetails';
import SelectedBooking from '../components/SelectedBooking';
import Alert from '../components/Alerts/Alert'
import Spinner from '../components/Spinner'
import SelectedBookingFirstBlue from '../components/SelectedBookingFirstBlue'
import SelectedBookingLast from '../components/SelectedBookingLast';
import SelectedBookingGreen from '../components/SelectedBookingGreen';
import testPdf from '../icons/enclosures.pdf'

export default function BiddingPage() {

  const [userEmail, setUserEmail] = useState("");
  const [company, setCompany] = useState("")
  const [userUid, setUserUid] = useState("")
  const [user, setUser] = useState("")
  const [allBookings, setAllBooking] = useState([])
  const [selectedBooking, setSelectedbooking] = useState([])
  const [openDetails, setOpenDetails] = useState(false);
  const [settleAmount, setSettleAmount] = useState(0)
  const [thePrices, setThePrices] = useState()
  const [updatedData, setUpdatedData] = useState([])
  const [deactivateAccept, setDeactivateAccept] = useState(false)
  const [biddingPrices, setBiddingPrices] = useState([])
  const [firstPrice, setFirstPrice] = useState(() => 0)
  const [secondPrice, setSecondPrice] = useState(() => 0)
  const [allPrices, setAllPrices] = useState(() => [])
  const [thirdPrice, setThirdPrice] = useState(0)
  const [getBooking, setGetBooking] = useState([]);
  const [openSpinner, setOpenSpinner] = useState(false);
  const [openAlert, setAlert] = useState(false)
  const [openAlertTwo, setAlertTwo] = useState(false)
  const [openAlertThree, setAlertThree] = useState(false)
  const pricess = []
  const theBooking = []
  const [bookingRefNumber, setBookingRefNumber] = useState()
  const [driverAcceptBook, setDriverAcceptBook] = useState()
  const [bookingAccept, setBookingAccept] = useState()
  const [settleAmountSwitch, setSettleAmountSwitch] = useState(false)
  const [counterOffer, setCounterOffer] = useState(false)
  const [declineSwitch, setDeclineSwitch] = useState(false)
  const [acceptSwitch, setAcceptSwitch] = useState(false)
  const [transporterQuote, setTransporterQuote] = useState(false)
  const [confirmedNet, setConfirmedNet] = useState(false)
  const [valueAdde, setValueAdded] = useState(false)
  const [totalSwitch, setTotalSwitch] = useState(false)
  const [viewSchedule, setViewSchedule] = useState(false)
  const booking = "hey"

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
            setUser(user)
          var uid = user.uid;
          setUserUid(uid)
          firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                const company = snapshot.val().companyDetails.registeredCompanyName
                setCompany(company)
            });
          // ...
        } else {
        }
    });
}, [])

useEffect(() => {
  document.body.style.cssText="margin-top:98px !important";
  return () => {
      document.body.style.marginTop= "0px";
  };
}, []);

useEffect(() => {
  if(localStorage.getItem("userUid")){
      const Uid = JSON.parse(localStorage.getItem("userUid"))
      const bookingRef = firebase.database().ref('booking').orderByChild('booking_party_uid').equalTo(Uid);
      var childrenArray = []
      bookingRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKeys = childSnapshot.val()
          childrenArray.push(childKeys)
        });
        console.log(childrenArray);
        setAllBooking(childrenArray);
        localStorage.setItem("AllMyBookings", JSON.stringify(childrenArray));
     });
  }
}, [])

useEffect(() => {
  if(localStorage.getItem("biddingPrices")){
    const biddingPrices = JSON.parse(localStorage.getItem("biddingPrices"))
    setBiddingPrices(biddingPrices);
  }
}, [])

console.log("These are all my bookings", allBookings);
console.log("This is the selected booking", selectedBooking);

const fetchDataFnc = (booking) => {
  const fleetId = booking.booking_bids_fleet_id
  const bookingId = booking.booking_id
  console.log("fleetId" ,fleetId)
  if(booking.booking_bids_fleet_id){
    firebase.database().ref('fleets/' + fleetId[0]).child("booking_bids").child(bookingId).on('value', (snapshot) => {
      console.log("fleet snap",snapshot.val())
        setFirstPrice(snapshot.val().price[0])
        setAllPrices(snapshot.val().price)
        console.log("all the prices", snapshot.val().price)
        console.log("fleet collect", snapshot.val());
        
    });
  }
  if(booking.booking_bids_fleet_id){
    firebase.database().ref('booking/' + bookingId).child("booking_bids_prices").set({
      firstPrice
    });
  }
}
useEffect(() => {
  fetchDataFnc(booking)
}, [booking])

// console.log("first price", firstPrice)

const handleSettle = (booking)=>{
  const bookingId = booking.booking_id
  const fleetId = booking.booking_bids_fleet_id
  setDeactivateAccept(true)
  firebase.database().ref('/fleets/' + fleetId).child("booking_bids").child(bookingId).child("price").update({ 
          1: parseFloat(settleAmount)
  });
  if(booking.booking_bids_fleet_id){
    firebase.database().ref('/booking/' + bookingId).child("booking_bids_prices").set({
      firstPrice,
      allPrices,
      accepted: false
    });

  // setOpenSpinner(true)
  // const closeSpinner = () => {
  // setOpenSpinner(false)
  // }
  // setTimeout(closeSpinner, 1000);
  // const openAlert = ()=>{
  //     setAlert(true);
  // }
  // const closeAlert = ()=>{
  // setAlert(false);
  // } 
  // setTimeout(openAlert, 2000); 
  // setTimeout(closeAlert, 5000); 
  // window.location.reload(false);
  }

}

// const showFirstPrice = (booking) => {
//   const bookingId = booking.booking_id
//   const fleetId = booking.booking_bids_fleet_id
//   if(booking.booking_bids_fleet_id){
//     firebase.database().ref('/booking/' + bookingId).child("booking_bids_prices").set({
//       firstPrice
//     });
//   }
// }

const handleDecline = (booking) => {
  const bookingId = booking.booking_id
  const fleetId = booking.booking_bids_fleet_id
  firebase.database().ref('/fleets/' + fleetId).child("booking_bids").child(bookingId).update({ 
    accepted: false
  });
  firebase.database().ref('/booking/' + bookingId).child("booking_bids_prices").update({
    accepted: false
  });
  setOpenSpinner(true)
  const closeSpinner = () => {
  setOpenSpinner(false)
  }
  setTimeout(closeSpinner, 1000);
  const openAlert = ()=>{
      setAlertThree(true);
  }
  const closeAlert = ()=>{
  setAlertThree(false);
  } 
  setTimeout(openAlert, 2000); 
  setTimeout(closeAlert, 5000);
}

const handleAccept = (booking) =>{
  const bookingId = booking.booking_id
  const fleetId = booking.booking_bids_fleet_id
  console.log(fleetId)
  firebase.database().ref('/fleets/' + booking.booking_bids_fleet_id).child("booking_bids").child(bookingId).update({ 
        accepted: true
  });
  firebase.database().ref('/booking/' + bookingId).child("booking_bids_prices").update({
    accepted: true
  });
  setOpenSpinner(true)
  const closeSpinner = () => {
  setOpenSpinner(false)
  }
  setTimeout(closeSpinner, 1000);
  const openAlert = ()=>{
      setAlertTwo(true);
  }
  const closeAlert = ()=>{
  setAlertTwo(false);
  } 
  setTimeout(openAlert, 2000); 
  setTimeout(closeAlert, 5000); 
}

 useEffect(() => {
  fetchDataFnc(booking)
 }, [booking])

 useEffect(() => {
  var tempVat = []
  firebase.database().ref('fleets/' + fleet).child("booking_bids").child(bookingId).on('value', (snapshot) => {
      setAllBookingPricess([snapshot.val().price])
      setFirstPrice(snapshot.val().price[0])
      setSecondPrice(snapshot.val().price[1])
      // second.push(snapshot.val().price[1])
      setThirdPrice(snapshot.val().price[2])
      tempVat.push(snapshot.val().price[2])
      if(snapshot.val().price[1] !== undefined){
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

  return () => {
    setCounterOffer()
  }

}, [])
 
  console.log("firstPrice", firstPrice)
  return (
    <div className='bidding'>
      <EnterpriseNav name={company}/>
        <div  style={{display:"flex", alignItems:"center", marginBottom:"17px"}}>
            <Link to='/schedule' style={{textDecoration:"none"}}><i className="fa-solid fa-chevron-left"></i></Link>
            <span className='bidding-navigation'>
                <p>Requests</p>
            </span>
        </div>
        <div className='deals'>
          <div className='default-filter'>
              <div>
                <h1>Deals</h1>
                <p>Default filter: <span style={{color:"blue"}}>start date</span></p>
              </div>

                {allBookings.length > 0 ? allBookings.map((booking) =>(
                      <div className='deals-card' key={uuidv4()} onClick={() => {
                          setSelectedbooking([booking])
                          localStorage.setItem("selectedItemBidding", JSON.stringify([booking]));
                      }}>
                        <div>
                          <h2>{booking.booking_ref}</h2>
                          <p>{booking.puDetails.puCityName} to {booking.doDetails.doCityName}</p>
                        </div>
                        <div>
                          <p>{booking.date_created}</p>
                          <p>301/405</p>
                          <p>{} offers</p>
                        </div>
                      </div>
                    ))
                      : <></>
                }

          </div>
          <div className='trip-deals'>
              <div>
                  <div>
                      <h2>Trip Deals</h2>
                      {selectedBooking.length > 0 ? selectedBooking.map((booking) =>(
                          <p>{booking.booking_ref}</p>
                      ))
                        : <p>Deal ref number</p>
                      }
                  </div>
                  <div>
                      <span>X</span>
                      <p>Cancel Request</p>
                  </div>
              </div>
              <div className='asking-rate'>
                {selectedBooking.length > 0 ? selectedBooking.map((booking) =>(
                    <p style={{marginBottom:"10px"}}>{booking.puDetails.puCityName} to {booking.doDetails.doCityName}</p>
                ))
                  : <p>Destination</p>
                }
                <div>
                  {selectedBooking.length > 0 ? selectedBooking.map((booking) =>(
                    <p style={{color:"#606060"}}>Your asking rate: R{booking.rate_required}</p>
                  ))
                    : <p style={{color:"#606060"}}>Your asking rate: R00.00</p>
                  }
                  <p style={{color:"#0039BF", cursor:"pointer"}} onClick={() => setOpenDetails(true)}>View Details</p>
                </div>

                  {selectedBooking.length > 0 ? selectedBooking.map((booking) =>(
                    <p style={{
                      fontSize:"11px",
                      marginTop:"3px",
                      color:"#606060"
                    }}>{} Offers (avg. R{booking.rate_required})</p>
                  ))
                    : <p style={{
                      fontSize:"11px",
                      marginTop:"3px",
                      color:"#606060"
                    }}>0 Offers (avg. R00.00)</p>
                  }   

              </div>
              <div className='offer-title'>
                <h2>Offers</h2>
                <p>All rates submitted exclude Value Added Tax and will be charged where applicable.</p>
              </div>
              <div className='offer-indication'>
                <div style={{display:"flex"}}>
                  <div>
                      <div style={{background:"#FFE200"}}></div>
                      <p>New Offer</p>
                    </div>
                    <div>
                      <div style={{background:"#213164"}}></div>
                      <p style={{color:"black"}}>Negotiation</p>
                    </div>
                    <div>
                      <div style={{background:"#059E00"}}></div>
                      <p>Bookings</p>
                    </div>
                </div>
                 <div>
                    <p style={{fontSize:"11px"}}>Default filter: <span style={{fontSize:"11px", color:"#0039BF"}}>Rates (low - high)</span></p>
                 </div>
              </div>

              {selectedBooking.length > 0 ? selectedBooking.map((booking)=>{
                // showFirstPrice(booking)
                if(Math.random() > 0.5) {
                  fetchDataFnc(booking)
                }
                return( 
                  <>
                  {/* {firstSel && */}
                    <SelectedBooking
                      booking_ref={booking.booking_ref}
                      firstPrice={firstPrice}
                      secondPrice={secondPrice}
                      thirdPrice={thirdPrice}
                      setSecondPrice={setSecondPrice}
                      setThirdPrice={setThirdPrice}
                      setFirstPrice={setFirstPrice}
                      booking={booking}
                      handleSettle={handleSettle}
                      setSettleAmount={setSettleAmount}
                      settleAmount={settleAmount}
                      allPrices={allPrices}
                      handleAccept={handleAccept}
                    />
                  {/* }  */}
                  </>
                )
              }):
                <></> 
              }

              {selectedBooking.length > 0 ? selectedBooking.map((booking)=>{
                if(booking.booking_bids_fleet_id){
                  return( 
                    <SelectedBookingFirstBlue
                      booking={booking} 
                      setAllPrices={setAllPrices}
                      allPrices={allPrices} 
                      handleDecline={handleDecline}
                      handleAccept={handleAccept}
                    />
                  )
                }
              }):
                <></>
              }

              {selectedBooking.length > 0 ? selectedBooking.map((booking)=>{
                if(booking.booking_bids_fleet_id){
                  return( 
                      <SelectedBookingLast
                        booking={booking} 
                        setAllPrices={setAllPrices}
                        allPrices={allPrices} 
                        handleDecline={handleDecline}
                        firstPrice={firstPrice}
                        handleAccept={handleAccept}
                      />
                    )
                  }
              }):
                <></>
              }

            {selectedBooking.length > 0 ? selectedBooking.map((booking)=>{
                if(!booking.booking_bids_prices) {
                  return( 
                    <></>
                  )
                }else{
                  return (
                    <SelectedBookingGreen
                      booking={booking} 
                      setAllPrices={setAllPrices}
                      allPrices={allPrices} 
                      handleDecline={handleDecline}
                      firstPrice={firstPrice}
                      handleAccept={handleAccept}
                    />
                  )
                }
              }):
                <></>
              }  
          </div>
        </div>
        {openDetails &&
            <BiddingDetails openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        }

        {openSpinner && <Spinner/>}
            {openAlert && 
                <Alert >
                    <div style={{width:"256px"}}>
                        <p style={{
                            position:"absolute",
                            right:"0px",
                            top:"0px",
                            padding:"7px",
                            cursor:"pointer",
                            fontWeight:"bold"
                        }}
                        onClick={() => setAlert(false)}
                        >X</p>
                        <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Settle offer amount sent..</h1>
                    </div>
                </Alert>
            } 
            {openAlertTwo && 
                <Alert >
                    <div style={{width:"256px"}}>
                        <p style={{
                            position:"absolute",
                            right:"0px",
                            top:"0px",
                            padding:"7px",
                            cursor:"pointer",
                            fontWeight:"bold"
                        }}
                        onClick={() => setAlert(false)}
                        >X</p>
                        <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Request accepted..</h1>
                    </div>
                </Alert>
            } 
            {openAlertThree && 
                <Alert >
                    <div style={{width:"256px"}}>
                        <p style={{
                            position:"absolute",
                            right:"0px",
                            top:"0px",
                            padding:"7px",
                            cursor:"pointer",
                            fontWeight:"bold"
                        }}
                        onClick={() => setAlert(false)}
                        >X</p>
                        <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Request declined..</h1>
                    </div>
                </Alert>
            }   
    </div>
  )
}

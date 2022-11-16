import firebase from '../firebase-config';
import TestinContext from './TestinContext';
import TestingView from './SelectedBookingFinal';
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import EnterpriseNav from '../components/EnterpriseNav'
import SelectedBooking from '../components/SelectedBooking';
import { v4 as uuidv4 } from 'uuid';
import emptyIcon from '../icons/box.png'
import BiddingDetails from '../components/BiddingDetails';
import AllMyBookings from '../components/AllMyBookings';
import SelectedBookingContext from '../context/SelectedBooking'
import SelectedBookingFinal from '../components/SelectedBookingFinal';

export default function SetDataToContext() {

    const [userEmail, setUserEmail] = useState("");
    const [company, setCompany] = useState("")
    const [userUid, setUserUid] = useState("")
    const [user, setUser] = useState("")
    const [openDetails, setOpenDetails] = useState(false);
    const [fleetOpBooking, setFleetOpBooking] = useState([]);
    const [pricesFromFlt, setPricesFromFlt] = useState([]);
    const [settleAmount, setSettleAmount] = useState();
    const pricesFromFleet = []
    const [selected_Booking, set_Selected_booking] = useState(SelectedBookingContext);
    const [allBookings, setAllBookings] = useState([])
    const [testing_context, set_testing_context] = useState(TestinContext)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUser(user)
                var uid = user.uid;
              setUserUid(uid)
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const company = snapshot.val().bookingPartyDetails.companyName
                    setCompany(company)
                });
              // ...
            } else {
            }
        });
    }, [])

    const handleAccept = (booking) =>{
        const bookingId = booking.booking_id
        const fleetId = booking.booking_bids_fleet_id
        console.log(fleetId)
        firebase.database().ref('/fleets/' + booking.booking_bids_fleet_id).child("bookings").child(bookingId).update({ 
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
        document.body.style.cssText="margin-top:98px !important";
        return () => {
            document.body.style.marginTop= "0px";
        };
      }, []);
  
      const handleDecline = (booking) => {
        const bookingId = booking.booking_id
        const fleetId = booking.booking_bids_fleet_id
        firebase.database().ref('/fleets/' + fleetId).child("booking_bids").child(bookingId).update({ 
          accepted: false
        });
      }

    useEffect(() => {
            const Uid = JSON.parse(localStorage.getItem("userUid"))
            const bookingRef = firebase.database().ref('booking'  ).orderByChild('booking_party_uid').equalTo(Uid);
            var childrenArray = []
            bookingRef.on('value', (snapshot) => {
              setAllBookings(Object.values(snapshot.val()));
            //   set_Selected_booking(Object.values(snapshot.val()))
            console.log("all the bookings", Object.values(snapshot.val()));
           });
    }, [])
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

                {allBookings.length > 0 && allBookings.map((booking) => (
                    <div className='deals-card' key={booking.booking_ref} onClick={() => {
                        set_Selected_booking(booking)
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
                }                

            </div>
            <div className='trip-deals'>
            <div>
                <div>
                    <h2>Trip Deals</h2>
                    
                        <p>Deal ref number</p>
                </div>
                <div>
                    <span>X</span>
                    <p>Cancel Request</p>
                </div>
            </div>
            <div className='asking-rate'>
                <p>Destination</p>
                <div>
                  
                    <p style={{color:"#606060"}}>Your asking rate: R00.00</p>
                    <p style={{color:"#0039BF", cursor:"pointer"}} onClick={() => setOpenDetails(true)}>View Details</p>
                </div>
               
                        <p style={{
                        fontSize:"11px",
                        marginTop:"3px",
                        color:"#606060"
                        }}>0 Offers (avg. R00.00)</p>
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
            <div>
                <div className="fleets-offers"> 
                    <SelectedBookingContext.Provider value={{selected_Booking, set_Selected_booking}}>
                        <SelectedBookingFinal
                        />
                    </SelectedBookingContext.Provider>
                </div>
            </div>
        </div>
        </div>
        {openDetails &&
            <BiddingDetails openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        }
    </div>
  )
}

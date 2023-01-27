import React, {useState, useEffect, useRef, useContext} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import '../css/bidding.css'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import SelectedBooking from '../components/SelectedBooking';
import { v4 as uuidv4 } from 'uuid';
import emptyIcon from '../icons/box.png'
import BiddingDetails from '../components/BiddingDetails';
import AllMyBookings from '../components/AllMyBookings';
import {useStateContextSingle} from '../context/SingleSelectedBooking';
import { useStateContextAllPrices } from '../context/SelectAllPricesContext'
import {SelectedTotal} from '../context/SelectedTotal'
import { useStateContext } from '../context/DashboardStateContext'
import { useStateBidding } from '../context/BiddingStatesContext'

function BiddingPageTwo() {
    const [userEmail, setUserEmail] = useState("");
    const [company, setCompany] = useState("")
    const [userUid, setUserUid] = useState("")
    const [user, setUser] = useState("")
    const [openDetails, setOpenDetails] = useState(false);
    const [fleetOpBooking, setFleetOpBooking] = useState([]);
    const [pricesFromFlt, setPricesFromFlt] = useState([]);
    const pricesFromFleet = []
    const {selectedValue, setSelectedValue}  = useStateContextSingle();
    const [isBiddingLoaded, setIsBiddingLoaded] = useState(false);
    const navigate = useNavigate();
    const { 
      isEnterprise,
      setIsEnterprise,
      isTracking,
      setIsTracking,
      isShowSchedule,
      setIsShowSchedule,
      setIsShowRequest,
      isShowRequest,
      setCargoLink
    } = useStateContext();

    const {
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

  useEffect(() => {
    setTimeout(() =>{
      setIsBiddingLoaded(true);
    }, 300)
  }, [])
  

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUser(user)
                var uid = user.uid;
              setUserUid(uid)
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const company = snapshot.val().companyName
                    setCompany(company)
                });
              // ...
            } else {
              navigate('/login')
            }
        });
    }, [])

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

      const { 
        allPricesValue, 
        setAllPricesValue
    } = useStateContextAllPrices(); 

      const {selectedTotalValue, setSelectedTotalValue} = useContext(SelectedTotal)
      const handleSettle = (bookingId, fleet) =>{
        firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).child("price").update({ 
          1: parseFloat(settleAmount)
        });
      }

      const handleDecline = (bookingId, fleet) => {
        firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).update({ 
          accepted: false
        }); 
      }

      const handleAccept = (bookingId, fleet) =>{
        firebase.database().ref('/fleets/' + fleet).child("booking_bids").child(bookingId).update({ 
              accepted: true
        })
        // .then(() => {
        //   var fleet = 'Fundo'
        //   var xhr = new XMLHttpRequest();
        //   xhr.addEventListener('lod', () => {
        //       console.log(xhr.responseText);
        //   })
        //   xhr.open('GET', 'https://developer.zipi.co.za/acceptRequestBookingParty.php?sendto=' + userEmail + 
        //       '&name=' + fleet + 
        //       '&date=' + new Date().toISOString().substring(0,10) 
        //   )
        //   xhr.send();
        // });
      }
  return (
    <div className={`duration-500 ease-in-out ${isBiddingLoaded ? 'open-bidding' : 'bidding'}`}>
        <div  className='nav-tracking' style={{padding:"1rem 0"}}>
            <span className='bidding-navigation'>
                <p 
                    style={{color:"grey", cursor: "pointer"}}
                    onClick={() => {
                        setIsShowSchedule(false);
                        setIsTracking(false);
                        setIsEnterprise(true);
                        setCargoLink(false);
                        setIsShowRequest(false);
                    }}
                >Booking</p> 
                <p>&nbsp;&nbsp;&nbsp;/&nbsp; Bidding Page</p> 
            </span>
        </div>
        <div className='deals'>
            <div className='default-filter'>
                <div>
                    <h1>Deals</h1>
                    <p>Default filter: <span style={{color:"blue"}}>start date</span></p>
                </div>
                <AllMyBookings
                  setCounterOffer={setCounterOffer}
                  counterOffer={counterOffer}
                  setRateSubmit={setRateSubmit}
                  rateSubmit={rateSubmit}
                  setAccepted={setAccepted}
                  accepted={accepted}
                  setFinalOffer={setFinalOffer}
                  setDeactivateAccept={setDeactivateAccept}
                />
            </div>
            <div className='trip-deals'>
              <div>
                  <div>
                      <h2>Trip Deals</h2>
                        <p>{selectedValue.booking_ref ? selectedValue.booking_ref : "NE06YI"}</p>
                  </div>
                  <div onClick={()=> {
                      if(localStorage.getItem("userUid")){
                        const Uid = JSON.parse(localStorage.getItem("userUid"))
                        const bookingRef = firebase.database().ref('/booking/' + selectedValue.booking_id);
                        bookingRef.remove().then(() =>{
                          firebase.database().ref('/deleted_bookings/' + selectedValue.booking_id).update({
                            ...selectedValue
                          })
                        })
                      }
                  }}>
                      <span className='cancel-ex'>X</span>
                      <p>Cancel Request</p>
                  </div>
              </div>
              <div className='asking-rate'>
                    <p style={{marginBottom:"10px"}}>{selectedValue?.details ? selectedValue?.details?.CityName : "Johannesburg"} to {selectedValue.details ? selectedValue.details?.CityName : "Johannesburg"}</p>
                <div>
                      <p style={{color:"#606060"}}>Your asking rate: R{selectedValue.rate_required}</p>
                    <p style={{color:"#0039BF", cursor:"pointer"}} onClick={() => setOpenDetails(true)}>View Details</p>
                </div>
                        <p style={{
                        fontSize:"11px",
                        marginTop:"3px",
                        color:"#606060"
                        }}
                        >{} Offers (avg. R{selectedValue?.rate_required})</p>
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
                {
                  !!Object.keys(selectedValue)?.length && !!selectedValue.booking_bids_fleet_id && 
                  !!selectedValue.booking_bids_fleet_id.length ?
                  selectedValue.booking_bids_fleet_id.map((fleet, key) => {
                    console.log("data", fleet);
                    return(
                    <div className='actual-offers' key={key}>
                     {yellowBackground &&
                        <span className='yellowBidding'></span>
                     }
                     {blueBackground &&
                        <span className='blueBidding'></span>
                     }
                     {greenBackground &&
                        <span className='backGreen'></span>
                     }
                      <h2 style={{fontWeight:"400", fontSize:"14px", marginBottom:"7px"}}>{selectedValue.booking_ref}</h2>
                      <div className='loads-offered'>

                        {yellowBackground && 
                        !blueBackground && 
                        !greenBackground && 
                        !allPricesValue.length > 1 &&
                          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                              <div style={{width:"40%"}}>
                                <p>{selectedValue?.loads_required} loads offered</p>
                                <p>Transporter Quotation: R{allPricesValue[0]}</p>
                              </div>
                              <div style={{width:"60%", display:"flex", justifyContent:"end", alignItems:"center"}}>
                                <div>
                                  <input className='settle-inp' type="text" placeholder='Amount (R)' value={settleAmount} onChange={event => setSettleAmount(event.target.value)}/>
                                  <button className='settle-bt' onClick={() => handleSettle(selectedValue.booking_id, fleet)}>Settle</button>
                                </div>
                                <button className='decline-offer' onClick={() => handleDecline(selectedValue.booking_id, fleet)}>Decline</button>
                                <button className='accept-offer' style={{marginLeft:"0.5rem"}}>Accept</button>
                              </div>
                          </div>
                        }

                        {blueBackground && 
                        !allPricesValue.length > 3 &&
                        !greenBackground && 
                          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                              <div style={{width:"40%"}}>
                                <p>{selectedValue?.loads_required} loads offered</p>
                                <p>Transporter Quotation: R{allPricesValue[0]}</p>
                                <p>Counter Offer: R{allPricesValue[1]}</p> 
                              </div>
                          </div>
                        }

                        {allPricesValue?.length === 3 && !accepted &&
                          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                            <div style={{width:"40%"}}>
                              <p>{selectedValue?.loads_required} loads offered</p>
                              <p>Transporter Quotation: R{allPricesValue[0]}</p>
                              <p>Counter Offer: R{allPricesValue[1]}</p> 
                              <p>Final Offer: R{allPricesValue[2]} </p>
                            </div>
                            <div style={{width:"60%", display:"flex", justifyContent:"end", alignItems:"center"}}>
                                <button className='decline-offer' onClick={() => handleDecline(selectedValue.booking_id, fleet)}>Decline</button>
                                <button className='accept-offer' onClick={() => handleAccept(selectedValue.booking_id, fleet)} style={{marginLeft:"0.5rem"}}>Accept</button>
                              </div>
                          </div>
                        }

                        {accepted && !allPricesValue?.length <= 3 &&
                          <div>
                            <p>Booking accepted</p>
                            <p>{selectedValue.actual_loads_for_cargo} loads booked</p>
                            <p>Confirmed Net Rate: R{allPricesValue[2] !== undefined ? allPricesValue[2] : allPricesValue[1]}</p>
                            <p>Value Added Tax: R{allPricesValue[2] !== undefined ? (allPricesValue[2]*0.14).toFixed(0) : (allPricesValue[1]*0.14).toFixed(0)}</p>
                            <p>Total: R{allPricesValue[2] ? (allPricesValue[2] + (allPricesValue[2]*0.14)).toFixed(0) : (allPricesValue[1] + (allPricesValue[1]*0.14)).toFixed(0) }</p>
                          </div>
                        }

                      </div>
                  </div> 
                  
                  )
                  })
                  : 
                 <div 
                    style={{
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      flexDirection: 'column', 
                      height: '100%', 
                      marginTop: '50px'}}
                  >
                    <img src={emptyIcon} alt="" style={{width: '100px'}}/>
                    <p style={{marginTop: '20px', color: 'grey'}}>
                      Currently there are no offers
                    </p>
                </div>
                }
              </div>
          </div>
        </div>
        {openDetails &&
            <BiddingDetails openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        }
    </div>
  )
}
export default React.memo(BiddingPageTwo)

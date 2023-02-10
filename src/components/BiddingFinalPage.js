import firebase from 'firebase';
import React, {useState, useEffect} from 'react';
import { useStateContextBookings } from '../context/AllBookingsContext'
import emptyIcon from '../icons/box.png'
import { useStateContext } from '../context/DashboardStateContext'
import BiddingDetails from './BiddingDetails';

export default function BiddingFinalPage() {
    const { 
        allOfTheBooking,
        setAllOfTheBooking,
    } = useStateContextBookings();

    const [selectedBook, setSelectedBook] = useState(allOfTheBooking[0])
    const [fleetIds, setFleetIds] = useState(null);
    const [settleAmount, setSettleAmount] = useState(null);
    const [ openDetails, setOpenDetails] = useState(false);
    const [acceptedBooking, setAcceptedBooking] = useState(null);
    const [checkAccepted, setCheckAccepted] = useState(false);
    // const [fleetUid, setFleetUid] = useState(false);
    const [biddingData, setBiddingData] = useState({
        loads:"",
        transQuotation:"",
    })

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

    const fetchFromFleet = (selected) =>{
        setFleetIds(selected?.booking_bids_fleet_id);
        const quoteFleet = selected?.booking_bids_fleet_id
        const bookingId = selected?.booking_id
        const bookingRef = selected?.booking_ref
        const loads = selected?.actual_loads_for_cargo
        if(quoteFleet !== undefined){
            quoteFleet.forEach((fleet) => {
                firebase.database().ref('/fleets/' + `${fleet}/booking_bids`).child(bookingId).on('value', (snapshot) => {
                    const price = snapshot.val()?.price
                    var isSettled = false
                    var finalOffer = false
                    var isPrice = false
                    var isAccepted = false
                    if(snapshot.val()?.price?.length >= 2){
                        isSettled = true
                    }
                    if(snapshot.val()?.price?.length === 3){
                        finalOffer = true
                    }
                    if(snapshot.val()?.accepted === true){
                        isAccepted = true
                    }
                    setBiddingData((prevState) => ({
                        ...prevState,
                        loads:loads,
                        transQuotation:{
                            price
                        },
                        isAccepted:isAccepted,
                        isSettled: isSettled,
                        finalOffer: finalOffer,
                        bookingRef: bookingRef, 
                        }))
                });
            })
        }
    }

    const handleSettle = (fleet)=>{
        firebase.database().ref('/fleets/' + `${fleet}/booking_bids`).child(selectedBook.booking_id).child("price").update({
            1: parseFloat(settleAmount)
        });
    }
    const handleAccept = (fleet)=>{
        firebase.database().ref('/fleets/' + `${fleet}/booking_bids`).child(selectedBook.booking_id).update({
            accepted: true
        });
    }
    const handleDecline = (fleet)=>{
        firebase.database().ref('/fleets/' + `${fleet}/booking_bids`).child(selectedBook.booking_id).update({
            accepted: false
        });
    }

    useEffect(() => {
        firebase.database().ref('fleets').on('value', snapshot => {
            if(snapshot.exists()){
                const FleetBooking = Object?.values(snapshot.val())
                const bookingAccepted = FleetBooking.map((book) => book.bookings[selectedBook?.booking_id])
                setAcceptedBooking(bookingAccepted)
                if(bookingAccepted[0]){
                    setCheckAccepted(true)
                }
            }
        })
    }, [selectedBook?.booking_id])
    

    console.log(biddingData)

    // console.log("accepted booking", acceptedBooking[0])


  return (
    <div style={{position:"relative"}}>
        <div  className='nav-tracking' style={{padding:"1rem 0", width:"90%", margin:"auto"}}>
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
        <div className='bidding-page-container'>
            <div>
                <div className='booking-card'>
                    <p>Deals</p>
                    <p>Default filter: <span style={{color:"blue"}}>start date</span> </p>
                </div>
                {allOfTheBooking.length ? allOfTheBooking.map((booking) => (
                    <div className='card-container' onClick={() => {
                            setSelectedBook(booking)
                            fetchFromFleet(booking)
                        }}>
                        <div>
                            <p>{booking.booking_ref}</p>
                            <p>{booking.puDetails.puCityName} to {booking.puDetails.puCityName}</p>
                        </div>
                        <div>
                            <p>{booking.date_created}</p>
                            <p>{booking.actual_loads_for_cargo}/{booking.actual_loads_for_cargo}</p>
                            <p> offers</p>
                        </div>
                    </div>
                )) :

                    <div className='dash-date' style={{
                        width:"100%", 
                        height:"100%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"column",
                        top:"30%",
                        height:"fit-content",
                        marginTop:"9%",
                        marginBottom:"9%",
                        textAlign:"center",
                        fontSize:"11.5px"
                    }}>
                        <img src={emptyIcon} width={100} height={100}/>
                        Please make some bookings, it would appear you have none.
                    </div>
                }
                
            </div>
            <div>
                <div className='tril-deal-container'>
                    <h1 style={{fontSize:"16px"}}>Trip Deals</h1>
                    <div><button onClick={()=> {
                        const bookingRef = firebase.database().ref('/booking/' + selectedBook.booking_id);
                        bookingRef.remove().then(() =>{
                          firebase.database().ref('/booking/' + selectedBook.booking_id).update({
                            deleted_bookings: {...selectedBook}
                          })
                        })
                  }}>X</button> <span style={{fontSize:"13px", color:"red"}}>Cancel Request</span></div>
                </div>
                {selectedBook?.length ? selectedBook.map((book) => (
                    <p style={{color:"grey"}}>{book.booking_ref}</p>
                    )):
                    <p style={{color:"grey"}}>{selectedBook?.booking_ref}</p>
                }

                <div style={{
                                marginTop:"2.5rem", 
                                display:"flex", 
                                justifyContent:"space-between", 
                                padding:"17px",
                                borderRadius:"15px",
                                boxShadow:"rgb(150 150 150 / 29%) -1px 19px 94px 42px"
                            }}>
                    {selectedBook?.length ? selectedBook.map((book) => (
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"start"}}>
                            <p>{book.puDetails.puCityName} to {book.doDetails.doCityName}</p>
                            <p>Your asking rate: R{book.rate_required}</p>
                            <p>Offers (avg. R{book.rate_required})</p>
                        </div>
                        )):

                        <div style={{display:"flex", flexDirection:"column", justifyContent:"start"}}>
                            <p>{selectedBook?.puDetails?.puCityName} to {selectedBook?.doDetails?.doCityName}</p>
                            <p>Your asking rate: R{selectedBook?.rate_required}</p>
                            <p>Offers (avg. R{selectedBook?.rate_required})</p>
                        </div>
                    }
                    <div>
                        <p style={{color:"blue", cursor:"pointer"}} onClick={() => setOpenDetails(true)}>View Details</p>
                    </div>
                </div>
                <div className='offer-container-last'>
                    <h1>Offers</h1>
                    <div>
                        <p>All rates submitted exclude Value Added Tax and will be charged where applicable.</p>
                        <p>Default filter: <span style={{color:'blue'}}>Rates &#40;low - High&#41;</span></p>
                    </div>
                    <div>
                        <div className='negotiation-block'>
                            <span><p style={{background:"#fce303"}}></p><p>New Offer</p></span> <span><p style={{background:"#213164"}}></p><p>Negotiation</p></span> <span><p style={{background:"#1d9f00"}}></p><p>Bookings</p></span>
                        </div>
                    </div>
                    <div className='bid-container'>
                        {fleetIds?.length && fleetIds.map((fleet) => (
                            <div className='bid-parent'>
                                {!biddingData?.isSettled &&
                                    <span className='color-bid' style={{background:"#fde202"}}></span>
                                }
                                {biddingData?.isSettled &&
                                    <span className='color-bid' style={{background:"rgb(33, 49, 100)"}}></span>
                                }
                                {biddingData?.isAccepted &&
                                    <span className='color-bid' style={{background:"rgb(29, 159, 0)"}}></span>
                                }
                                <div className='actual-bid-block'>
                                    <p style={{fontSize:"0.9rem"}}>{biddingData.bookingRef}</p>
                                    <p>{biddingData?.loads} loads {biddingData.isAccepted ? "booked" : "offered"}</p>
                                    {!biddingData?.isAccepted &&
                                        <p>Transporter Quotation: R{biddingData.transQuotation.price ? biddingData.transQuotation.price[0] : "00"}</p>
                                    }
                                    {biddingData?.isSettled && !biddingData?.isAccepted &&
                                        <p>Counter Offer: R {biddingData?.transQuotation?.price[1]}</p>
                                    }
                                    {biddingData?.finalOffer && !biddingData?.isAccepted &&
                                        <p>Final Offer: {biddingData?.transQuotation?.price[2]}</p>
                                    }
                                    {biddingData?.isAccepted &&
                                        <>
                                            <p>Confirmed Net Rate: {biddingData?.transQuotation?.price[2]}</p>
                                            <p>Value Added Tax: {((biddingData?.transQuotation?.price[2])*(14/100)).toFixed(2)}</p>
                                            <p>Total {parseFloat((((biddingData?.transQuotation?.price[2])*(14/100)).toFixed(2))+(biddingData?.transQuotation?.price[2]))}</p>
                                        </>
                                    }
                                </div>
                                <div className='btn-settle-block'>
                                        {!biddingData?.isSettled && 
                                            <>
                                                <div>
                                                    <input type="text" placeholder='Amount (R)'  onChange={(e)=> setSettleAmount(e.target.value)}/>
                                                    <button onClick={() => handleSettle(fleet)}>Settle</button>
                                                </div>
                                                <button className='accept-the-bid'>Accept</button>
                                            </>
                                        }
                                        {biddingData?.isSettled && !biddingData?.finalOffer &&
                                            <p>Rate submitted</p>
                                        }
                                        {biddingData?.finalOffer && !biddingData?.isAccepted &&
                                            <>
                                                <button className='accept-the-bid' onClick={() => handleDecline(fleet)} style={{marginRight:"1.7rem", background:"#fff", border:"1px solid"}}>Decline</button>
                                                <button className='accept-the-bid' onClick={() => handleAccept(fleet)}>Accept</button>
                                            </>
                                        }
                                    
                                </div>
                            </div>
                        ))                        
                        }
                        {!fleetIds?.length && !checkAccepted &&
                            <div className='dash-date' style={{
                                width:"100%", 
                                height:"100%",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                flexDirection:"column",
                                top:"30%",
                                height:"fit-content",
                                textAlign:"center",
                                fontSize:"11.5px"
                            }}>
                                <img src={emptyIcon} width={65} height={65}/>
                                Currently there are no bids at the moment.
                            </div>
                        }
                        {checkAccepted && !fleetIds?.length > 0 &&
                            <div className='bid-parent'>
                                <span className='color-bid' style={{background:"rgb(29, 159, 0)"}}></span>
                                <div className='actual-bid-block' style={{width:"100%"}}>
                                    {/* <p style={{fontSize:"0.9rem"}}>{biddingData.bookingRef}</p> */}
                                    <p>The following booking has been accepted</p>
                                    <p>{acceptedBooking[0]?.total_loads} loads offered</p>
                                    <p>Accepted Offer: {acceptedBooking[0]?.price}</p>
                                </div>
                                {/* <div className='btn-settle-block'>
                                      
                                </div> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        {openDetails &&
            <BiddingDetails
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                openDetails={openDetails}
                setOpenDetails={setOpenDetails}
            />
        }
    </div>
  )
}

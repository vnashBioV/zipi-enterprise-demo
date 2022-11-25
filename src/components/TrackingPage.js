import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import '../css/tracking.css'
import filterIcon from '../icons/bars.png'
import downIcon from '../icons/download-pdf.png'
import {Avatar} from '@mui/material';
import printIcon from '../icons/awesome-print.png'
import chatIcon from '../icons/chat.png';
import { v4 as uuidv4 } from 'uuid';
import DriverTrackingBar from '../components/DriverTrackingBar'
import BookingTrackingBar from './BookingTrackingBar';
import ReactToPdf from 'react-to-pdf';

// import PdfComponent from './PdfComponent'

function TrackingPage() {
    const [userEmail, setUserEmail] = useState("");
    const [company, setCompany] = useState("")
    const [telephone, setTelephone] = useState("")
    const [userUid, setUserUid] = useState("")
    const [user, setUser] = useState("")
    const [allBookingarr, setAllBookingarr] = useState([])
    const [bookingDriver, setBookingDriver] = useState([])
    const [driverData, setDriverData] = useState([])
    const [userArray, setUserArray] = useState([])
    const [singleBook, setSingleBook] = useState([])
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [documentComp, setDocumentComp] = useState(false);
    const [clickOnRight, setClickOnRight] = useState(false);

    var bookingArray = [];

    const ref = React.createRef();

    const onSearchChange = (query) =>{
        let matches = []
        if (query.length>0){
            matches = allBookingarr.filter(booking =>{
                const regex = new RegExp(`${query}`, "gi");
                return booking.booking.puDetails.puName.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQuery(query)
    }

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
                    setTelephone(snapshot.val().phoneNumber)
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
              setAllBookingarr(Object.values(snapshot.val()));
            //   setAllBookingarr(childrenArray.filter(filter => filter.booking_bids_fleet_id));
              localStorage.setItem("AllMyBookings", JSON.stringify(childrenArray));
           });
        }
      }, [])

      const getDriverDataFnc = (booking) =>{
        const fleetId = booking.booking_bids_fleet_id
        const bookingId = booking.booking_id
        firebase.database().ref('/fleets/' + fleetId).once('value', (snapshot) => {
            console.log("the driver info", snapshot.val())
            setDriverData([snapshot.val()])
        });
      }

      useEffect(() => {
        setClickOnRight(true);
      }, [])

    console.log("all the booking", allBookingarr);
    console.log("the booking driver", bookingDriver);
    console.log("user information", userArray);
    console.log("The selected single booking", singleBook)
    console.log("user", user)
    console.log("driver data", driverData)
    // console.log("selected booking side", selectedDriverBook)

    return (
    <div className='tracking'>
        <EnterpriseNav name={company}/>
        <div  className='nav-tracking'>
            <Link to='/bidding' style={{textDecoration:"none"}} className="nav-nav-link"><i className="fa-solid fa-chevron-left"></i></Link>&nbsp;&nbsp;
            <span className='bidding-navigation'>
                <p style={{color:"grey"}}>Requests</p> <p>&nbsp;&nbsp;&nbsp;/&nbsp; Tracking Page</p> 
            </span>
        </div>
        <h1 style={{fontWeight:"normal"}}>Load Summary</h1>
        <div className='tracking-child' ref={ref}>
            <div className='left-tracking-info'>
                    <div className='load-shipping'>
                        <div>
                            <p style={{color:"grey"}}>Booking Party</p>
                            <p>{company}</p>
                            <p>{telephone}</p>
                            <p>{userEmail}</p>
                        </div>

                        {singleBook.length > 0 ? singleBook.map((single) => (
                            <>
                                <div>
                                    <p style={{color:"grey"}}>Pick-up</p>
                                    <p>{single.puDetails.puCompanyName}</p>
                                    <p>{single.puDetails.puAddress}</p>
                                    <p>{single.puDetails.puCityName}</p>
                                </div>
                                <div>
                                    <p style={{color:"grey"}}>Drop off</p>
                                    <p>{single.doDetails.doCompanyName}</p>
                                    <p>{single.doDetails.doAddress}</p>
                                    <p>{single.doDetails.doCityName}</p>
                                </div>
                            </>
                        ))
                        :<>
                            <div>
                                <p style={{color:"grey"}}>Pick-up</p>
                                <p>Company Name</p>
                                <p>Address</p>
                                <p>CityName</p>
                            </div>
                            <div>
                                <p style={{color:"grey"}}>Drop off</p>
                                <p>Company Name</p>
                                <p>Address</p>
                                <p>CityName</p>
                            </div>
                        </>
                        } 
                    </div>

                    {singleBook.length > 0 ? singleBook.map((single) => (
                        <div className='cargo-cargo'>
                           <div>
                               <p style={{color:"grey"}}>Cargo</p>
                               <p>{single.cargoInformation.productName}</p>
                               <p>SKU: {single.cargoInformation.productCode}</p>
   
                               <p style={{color:"grey", marginTop:"10px"}}>Packaging</p>
                               <div className='package-type-container'>
                                   <div>
                                       <p>Package Type:</p>
                                       <p>Dimensions:</p>
                                       <p>Quantity:</p>
                                       <p>Total Weight:</p>
                                   </div>
                                   <div>
                                       <p>{single.cargoInformation.productCode}</p>
                                       <p>{single.cargoInformation.breadth}cm x {single.cargoInformation.weight}cm x {single.cargoInformation.height}cm</p>
                                       <p>{single.cargoInformation.quantity}</p>
                                       <p>{single.cargoInformation.weight}t</p>
                                   </div>
                               </div>
                               <a href={single.sdsUrl} className="btn-download">Download SDS <span><img src={downIcon} alt="" /></span></a>
                           </div>
                        </div>
                        ))
                        :
                        <div className='cargo-cargo'>
                            <div>
                                <p style={{color:"grey"}}>Cargo</p>
                                <p>Manganese</p>
                                <p>SKU: 001232MANG</p>

                                <p style={{color:"grey", marginTop:"10px"}}>Packaging</p>
                                <div className='package-type-container'>
                                    <div>
                                        <p>Package Type:</p>
                                        <p>Dimensions:</p>
                                        <p>Quantity:</p>
                                        <p>Total Weight:</p>
                                    </div>
                                    <div>
                                        <p>Box</p>
                                        <p>120cm x 120cm x 100cm</p>
                                        <p>30</p>
                                        <p>32t</p>
                                    </div>
                                </div>
                                <button className="btn-download">Download SDS <span><img src={downIcon} alt="" /></span></button>
                            </div>
                        </div>
                        } 

                    <div className='print-block'>
                        <span>
                            <span style={{marginLeft:"10px"}}>
                            <ReactToPdf targetRef={ref} filename=".pdf" x={18} y={1} >
                                {({toPdf}) => (
                                    <p onClick={toPdf} style={{padding:'10px', color:'#fff', background:'grey', borderRadius:"10px", cursor:"pointer"}}>Generate PDF</p>
                                )}
                            </ReactToPdf>
                            </span> 
                        </span>

                        <div style={{marginLeft:"10px", width:"60%", display:"flex", justifyContent:"end", alignItems:"center"}}>
                            <Avatar className='Enterprise-icon'>{company.toUpperCase().substring(0,2)}</Avatar>
                            <span style={{
                                display:"flex",
                                flexDirection:"column",
                                marginLeft:"10px"
                            }}>
                                <p>{company}</p>
                            </span>
                            <span className='chat-ico'>
                                <img src={chatIcon} alt="" />
                            </span>
                        </div>
                    </div>
            </div>
            <div>
                <h1>Overview</h1>
                <div className='tracking-pannel'>
                    <h1>Tracking</h1>
                    <div className='search-panel'>
                        <input type="text" placeholder='Advanced search' onChange={e => onSearchChange(e.target.value)}/>
                        {/* <div><img src={filterIcon} alt="" /></div> */}
                    </div>

                    {allBookingarr.length > 0 ? allBookingarr.map((booking) => {
                        const actualLoads = booking.undelivered_loads ? booking.undelivered_loads + "px" : '300px'
                        return(
                            <>
                                 <BookingTrackingBar
                                    key={uuidv4()}
                                    booking={booking}
                                    setSingleBook={setSingleBook}
                                    singleBook={singleBook}
                                    actualLoads={actualLoads}
                                    getDriverDataFnc={getDriverDataFnc}
                                    setDriverData={setDriverData}
                                    driverData={driverData}
                                 />
                            </>
                        )
                        })
                        : <></>
                    }
                </div>
            </div>
        </div>
        {/* {documentComp && 
            <PdfComponent singleBook={singleBook} setDocumentComp={setDocumentComp}/>
        } */}
         {clickOnRight &&
            <div className='login-alert cargo-alertt' style={{border:"1px solid #c3c3c3"}}>
                <p style={{fontSize:"13.5px"}}>Please click on right section to see the booking information</p>
                <button className='alert-btnn' onClick={() => setClickOnRight(false) }>Ok</button>
            </div>
        } 
    </div>
  )
}
export default React.memo(TrackingPage)

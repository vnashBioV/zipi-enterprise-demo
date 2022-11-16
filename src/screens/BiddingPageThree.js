import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Link } from 'react-router-dom';
import '../css/bidding.css'
import EnterpriseNav from '../components/EnterpriseNav'
import firebase from '../firebase-config';
import SelectedBooking from '../components/SelectedBooking';
import { v4 as uuidv4 } from 'uuid';
import emptyIcon from '../icons/box.png'
import BiddingDetails from '../components/BiddingDetails';
import AllMyBookings from '../components/AllMyBookings';

export default function BiddingPageThree() {
  const [userEmail, setUserEmail] = useState("");
  const [company, setCompany] = useState("")
  const [userUid, setUserUid] = useState("")
  const [user, setUser] = useState("")
  // const [selectedBooking, setSelectedbooking] = useState(allBookings)
  const [openDetails, setOpenDetails] = useState(false);

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
  
  // useEffect(() => {
  //   if(localStorage.getItem("userUid")){
  //       const Uid = JSON.parse(localStorage.getItem("userUid"))
  //       const bookingRef = firebase.database().ref('booking').orderByChild('booking_party_uid').equalTo(Uid);
  //       var childrenArray = []
  //       bookingRef.on('value', (snapshot) => {
  //         snapshot.forEach((childSnapshot) => {
  //           var childKeys = childSnapshot.val()
  //           childrenArray.push(childKeys)
  //         });
  //         console.log(childrenArray);
  //         setAllBooking(childrenArray);
  //         setSelectedbooking([childrenArray[0]]);
  //         localStorage.setItem("AllMyBookings", JSON.stringify(childrenArray));
  //      });
  //   }
  // }, [])

  useEffect(() => {
    document.body.style.cssText="margin-top:98px !important";
    return () => {
        document.body.style.marginTop= "0px";
    };
  }, []);

  // console.log("Selected booking", selectedBooking)

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

                <AllMyBookings
                  // setSelectedbooking={setSelectedbooking}
                  // allBookings={allBookings}
                />
            </div>

              <div>{}</div>         
        </div>
    </div>
  )
}

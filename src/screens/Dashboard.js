import React, {useState, useEffect} from 'react';
import logo from '../icons/logo.png';
import '../css/dashboard.css';
import firebase from '../firebase-config';
import { Link, useNavigate  } from 'react-router-dom'
import loader from '../icons/loader.png';
import time from '../icons/clock.gif';
import check from '../icons/check.gif';
import conversation from '../icons/conversation.png';
import setting from '../icons/settings.png';
import crossDash from '../icons/cross.png';
import Loader from '../components/loader/Loader';
import CircularProgress from '@mui/material/CircularProgress';
import Enterprise from './Enterprise';
import TrackingPage from '../components/TrackingPage';
import Schedule from './Schedule';
import BiddingPageTwo from '../screens/BiddingPageTwo';
import EnterpriseNav from '../components/EnterpriseNav'
import { useStateContext } from '../context/DashboardStateContext'
import Myfleet from '../components/Myfleet';
import Myreferrals from '../components/Myreferrals';
import GetHelp from '../components/GetHelp';
import { useStateContextBookings } from '../context/AllBookingsContext'
import emptyIcon from '../icons/box.png'
import MonthlyComponent from '../components/MonthlyComponent';
import YearlyFilter from '../components/YearlyFilter';

export default function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCross, setIsCross] = useState(false)
    const [isChevUp, setIsChevUp] = useState(false)
    const [isSpinner, setIsSpinner] = useState(true)
    const [userEmail,setUserEmail] = useState("")
    const [userUid, setUserUid] = useState("");
    const navigate = useNavigate();
    const [fleetLink, setFleetLink] = useState(false);
    const [referalLink, setReferalLink] = useState(false);
    const [profileLink, setProfileLink] = useState(false);
    const [analysisLink, setAnalysisLink] = useState(false);
    const [walletLink, setWalletLink] = useState(false);
    const [getHelpLink, setGetHelpLink] = useState(false);
    const [contactLink, setContactLink] = useState(false);
    const [dashTitle, setDashTitle] = useState("");
    const [showNavigation, setShowNavigation] = useState(false);
    const [showNavigationX, setShowNavigationX] = useState(false);
    const [monthFilter, setMonthFilter] = useState(true);
    const [yearFilter, setYearFilter] = useState(false);
    // const [counter, setCounter] = useState(0);

    const {
        isEnterprise,
        setIsEnterprise,
        isTracking,
        setIsTracking,
        isShowSchedule,
        setIsShowSchedule,
        setIsShowRequest,
        isShowRequest,
        cargoLink,
        setCargoLink
    } = useStateContext();

    const { 
        allOfTheBooking,
        setAllOfTheBooking,
        getJanuaryMonthlyBookings,
        getFebruaryMonthlyBookings,
        getMarchMonthlyBookings,
        getAprilMonthlyBookings,
        getMayMonthlyBookings,
        getJuneMonthlyBookings,
        getJulyMonthlyBookings,
        getAugustMonthlyBookings,
        getSeptemberMonthlyBookings,
        getOctoberMonthlyBookings,
        getNovemberMonthlyBookings,
        getDecemberMonthlyBookings
    } = useStateContextBookings();

    useEffect(() => {
        setShowNavigation(false);
        setShowNavigationX(false);
    }, [])
    
    const [isDashboard, setIsDashboard] = useState(false);
    const [company, setCompany] = useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid);
              var uid = user.uid;
              localStorage.setItem("userUid", JSON.stringify(uid));
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const userInfo = snapshot.val();
                    const company = snapshot.val().firstName
                    localStorage.setItem("userInformation", JSON.stringify(userInfo));
                    setCompany(company)
                });

              // ...
            } else {
                navigate('/login');
            }
        });
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid);
              var uid = user.uid;
                firebase.database().ref('/booking/').orderByChild('booking_party_uid').equalTo(uid).on('value', (snapshot) => {
                    if(snapshot.exists()){
                        setAllOfTheBooking(Object?.values(snapshot.val()));
                    }
                });
              // ...
            } else {
                navigate('/login');
            }
        });

    }, [])

    useEffect(() => {
      setTimeout(() => {
        setIsSpinner()
      }, 3000)
      setMonthFilter(true)
    }, [])
    
    useEffect(() => {
        console.log("the monthly state", monthFilter)
    }, [])
    return (
    <div className='dashboard'>
        <div className="left-dash myLinks">
            <div>
                <img className="zipiicon" src={logo} />
                {/* {!showNavigation &&
                    <i 
                        class="fa-solid fa-bars" 
                        style={{color:"#000", fontSize:"29px", cursor:"pointer"}}
                        onClick={() => {
                            setShowNavigation(!showNavigation)
                            setShowNavigationX(!showNavigationX)
                        }}
                    ></i>
                }
                {showNavigationX &&
                    <i 
                        class="fa-solid fa-xmark"
                        style={{color:"#000", fontSize:"29px", cursor:"pointer"}}
                        onClick={() => {
                            setShowNavigation(!showNavigation)
                            setShowNavigationX(!showNavigationX)
                        }}
                    ></i>
                } */}
                
            </div>
        <div>
        <div><div className={`transition-all ease-in-out cursor-pointer ${
        cargoLink && "active"
        } options`}
        onClick={() => {
            setCargoLink(true)
            setFleetLink(false)
            setReferalLink(false)
            setProfileLink(false)
            setAnalysisLink(false)
            setWalletLink(false)
            setGetHelpLink(false)
            setContactLink(false)
            setIsEnterprise(false)
        }}
    >
        <i class="fa-sharp fa-solid fa-cube dash-link-icon"></i>My cargo
    </div>
    <div
        className={` transition-all cursor-pointer ease-in-out ${
        fleetLink && "active"
        } options`}
        onClick={() => {
            setCargoLink(false)
            setFleetLink(true)
            setReferalLink(false)
            setProfileLink(false)
            setAnalysisLink(false)
            setWalletLink(false)
            setGetHelpLink(false)
            setContactLink(false)
            setIsEnterprise(false)
        }}
    >
        <i class="fa-sharp fa-solid fa-bus dash-link-icon"></i>My fleet
    </div>
    <div
        className={`transition-all cursor-pointer ease-in-out ${referalLink && "active"} options`}
        onClick={() => {
            setCargoLink(false)
            setFleetLink(false)
            setReferalLink(true)
            setProfileLink(false)
            setAnalysisLink(false)
            setWalletLink(false)
            setGetHelpLink(false)
            setContactLink(false)
        }}
    >
        <i class={`fa-solid fa-user dash-link-icon`}></i>My referrals
    </div>

    <div className="option1">
        <Link
        to="/"
        className="drop-down-dash-anc transition-all ease-in-out options1"
        onClick={() => setIsChevUp(!isChevUp)}
        >
        <i class="fa-solid fa-briefcase dash-link-icon"></i>Account
        <i className={`fa-solid arrow-chev ${
            isChevUp ? "fa-chevron-up" : "fa-chevron-down"
            }`} onClick={() => setIsChevUp(!isChevUp)}
        ></i>
        </Link>
    </div>
    <div className={`${!isChevUp ? "account-menu" : "account-menu-open"} transition-all ease-in-out`}>
    
    <div className="moreOptions">
    <Link to='/profile' class="options">
            <i class={`fa-solid fa-briefcase dash-link-icon ${profileLink && "active"}`}></i>Profile
    </Link>
    <Link to='/wallet' class="options">
        <i class="fa-sharp fa-solid fa-wallet dash-link-icon"></i>Wallet
    </Link>
    <Link to='/'  class="options"
            onClick={()=> {
                firebase.auth().signOut().then(() => {
                    navigate('/')
                    }).catch((error) => {
                    alert(error)  
                    });
            }}
        ><i class="fa-sharp fa-solid fa-right-from-bracket dash-link-icon"></i>Sign out
    </Link>        
    </div>
    
    
        </div>
    <div 
        className={`transition-all cursor-pointer ease-in-out ${contactLink && "active"} options`}
        onClick={() => {
            navigate('/contactLink')
        }}
    >
        <i class={`fa-solid fa-address-book dash-link-icon`}></i>Contact
    </div>
    <div
        className={`transition-all cursor-pointer ease-in-out ${getHelpLink && "active"} options`}
        onClick={() => {
            navigate('/gethelp')
        }}
    >
        <i class={`fa-solid fa-circle-info dash-link-icon`}></i>Get help
    </div>
    
    </div>
    <div className="settings-menu">
        <img src={setting} alt="settings icon" className="theIcon" />
        <p>Version 1.0.1</p>
    </div>
    </div>
    </div>
        {cargoLink &&
        <div style={{height:"100%", overflowY:"auto", width:"81%", position:"relative"}}>
            <div className='right-top-section'>
                <div className='dash-top-links'>
                    <h2 className='dash-title'>{cargoLink && "My Cargo" || fleetLink && "My Fleet" || referalLink && "My Referral"}</h2>
                    <ul className='dash-act-links'>
                        {/* <li><Link to='/' className='hover:decoration-yellow	 transition-all ease-in-out'>Dashboard</Link></li> */}
                        <li style={{marginRight:"0px"}}>
                            <div 
                            onClick={() => {
                                setIsEnterprise(true)
                                setIsShowRequest(false)
                                setCargoLink(false)
                                setIsShowSchedule(false)
                                setIsTracking(false)
                            }} 
                            className='book-load hover:bg-white transition-all ease-in-out'>
                            Book a load</div></li>
                    </ul>
                </div>
                <h4 className='dash-subtitle'>Dashboard</h4>
                <p className='mt-3'>Click one of the tables to view more information below</p>
                <div style={{position:"relative", width:"fit-content"}} className="dash-select-container" id='collapse-sel'>
                    <select className='filter-select' name="" id="" onChange={(e) => {
                        if(e.target.value === "Monthly") {
                            setMonthFilter(true)
                            setYearFilter(false)
                            console.log("month:", monthFilter, "day:", yearFilter);
                        }
                        if(e.target.value === "Yearly") {
                            setMonthFilter(false)
                            setYearFilter(true)
                            console.log("month:", monthFilter, "day:", yearFilter);

                        }
                    }}>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                    <i className="fa-solid fa-angle-down dash-select-arrow"></i>
                </div>
            </div>
            <div className='stat-card'>
                <div>
                    <div className='transition ease-in-out hover:scale-105 hover:cursor-pointer' id="tshili">
                        <div className='stat-ico'>
                            <CircularProgress className="stat-ico" variant="determinate" value={95} />

                            {/* <img src={loader} style={{transform:"rotate(279deg)"}} alt="" /> */}
                            <p style={{color:"#2cdc00"}}>+2.5% (+3)</p>
                        </div>
                        <div className='dash-mid-values'>
                            <p style={{
                                    fontSize:"21px", 
                                    fontWeight:"bold", 
                                    marginTop:"8px"
                            }}>95%</p>
                        </div>
                        <p style={{
                                textTransform:"uppercase", 
                                color:"#9a9a9a",
                                marginTop:"3px",
                                fontSize:"11px",
                                fontWeight:"bold",
                        }}>success rate</p>
                    </div>
                    <div className='transition ease-in-out hover:scale-105 hover:cursor-pointer'>
                        <div className='stat-ico'>
                            <img src={time} alt="" />
                            <p style={{color:"#2cdc00"}}>+1.8% (2 min)</p>
                        </div>
                        <div className='dash-mid-values'>
                            <p style={{
                                    fontSize:"21px", 
                                    fontWeight:"bold", 
                                    marginTop:"8px"
                            }}>15 hours</p>
                        </div>
                        <p style={{
                                textTransform:"uppercase", 
                                color:"#9a9a9a",
                                marginTop:"3px",
                                fontSize:"11px",
                                fontWeight:"bold",
                        }}>average trip time</p>
                    </div>
                    <div className='transition ease-in-out hover:scale-105 hover:cursor-pointer'>
                        <div className='stat-ico'>
                            <img src={check} alt="" />
                            <p style={{color:"#2cdc00"}}>+1.8% (2 min)</p>
                        </div>
                        <div className='dash-mid-values'>
                            <p style={{
                                    fontSize:"21px", 
                                    fontWeight:"bold", 
                                    marginTop:"8px"
                            }}>2812</p>
                        </div>
                        <p style={{
                                textTransform:"uppercase", 
                                color:"#9a9a9a",
                                marginTop:"3px",
                                fontSize:"11px",
                                fontWeight:"bold",
                        }}>deliveries</p>
                    </div>
                    <div className='transition ease-in-out hover:scale-105 hover:cursor-pointer'>
                        <div className='stat-ico'>
                            <img src={conversation} alt="" />
                        </div>
                        <div className='dash-mid-values'>
                            <p style={{
                                    fontSize:"21px", 
                                    fontWeight:"bold", 
                                    marginTop:"8px"
                            }}>2130</p>
                        </div>
                        <p style={{
                                textTransform:"uppercase", 
                                color:"#9a9a9a",
                                marginTop:"3px",
                                fontSize:"11px",
                                fontWeight:"bold",
                        }}>bids and offers</p>
                        <p className='bids-i-p'><i class="fa-regular fa-clock"></i>12 pending</p>
                    </div>
                </div>
            </div>
            {monthFilter && 
                <MonthlyComponent/>
            }

            {yearFilter && 
                <YearlyFilter/>
            }

            {!allOfTheBooking.length > 0 &&
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
                            }}>
                    <img src={emptyIcon} width={100} height={100}/>
                    Please make some bookings, it would appear you have none.
                </div>
            }
                        
        </div>
        }
        
        {!cargoLink &&
        <div style={{height:"100%", overflowY:"auto", width:"81%"}}>
            <EnterpriseNav 
                name={company}
            />
        
        {isEnterprise &&
            <Enterprise/>
        }
        {isTracking &&
            <TrackingPage/>
        }
        {isShowSchedule &&
            <Schedule/>
        }
        {isShowRequest &&
            <BiddingPageTwo/>
        }
        {fleetLink &&
            <Myfleet/>
        }
        {referalLink &&
            <Myreferrals/>
        }
        {getHelpLink &&
            <GetHelp/>
        } 
        </div>
        }
        {isSpinner && <Loader/>}
    </div>
  )
}

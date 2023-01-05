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
import ReactSpinner from '../components/ReactSpinner'
import CircularProgress from '@mui/material/CircularProgress';


export default function Dashboard() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCross, setIsCross] = useState(false)
    const [isChevUp, setIsChevUp] = useState(false)
    const [isSpinner, setIsSpinner] = useState(true)
    const [userEmail,setUserEmail] = useState("")
    const [userUid, setUserUid] = useState("");
    const navigate = useNavigate();
    const [cargoLink, setCargoLink] = useState(true);
    const [fleetLink, setFleetLink] = useState(false);
    const [referalLink, setReferalLink] = useState(false);
    const [profileLink, setProfileLink] = useState(false);
    const [analysisLink, setAnalysisLink] = useState(false);
    const [walletLink, setWalletLink] = useState(false);
    const [getHelpLink, setGetHelpLink] = useState(false)
    const [contactLink, setContactLink] = useState(false)
    const [dashTitle, setDashTitle] = useState("")
    // const collapseSelect = () => {
    //   const selectDashi  = document.getElementById("collapseSelect")
    //   selectDashi.click()
    // }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid);
              var uid = user.uid;
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
    }, [])
    

  return (
    <div className='dashboard'>
        <div className='left-dash'>
        <div className='logo-section'>
            <img className='zipilogo' src={logo} />
            {!isMenuOpen &&
                <i class="fa-solid fa-bars-staggered dash-bars" onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                    setIsCross(!isCross)
                }}></i>
            }
            {isCross && <img src={crossDash} className='close-ex' alt="" onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                    setIsCross(!isCross)
                }}/>}
        </div>
        <div className={`side-menu-section transition-all ease-in-ou`} style={{height: isMenuOpen && 'auto', height: isMenuOpen && 'auto'}}>
            <ul className='side-links'>
                <li>
                    <div 
                        onClick={() => {
                            setCargoLink(true)
                            setFleetLink(false)
                            setReferalLink(false)
                            setProfileLink(false)
                            setAnalysisLink(false)
                            setWalletLink(false)
                            setGetHelpLink(false)
                            setContactLink(false)
                        }}
                        className={`hover:tracking-wider transition-all ease-in-out cursor-pointer ${cargoLink && "active"}`} 
                    >
                        <i class="fa-sharp fa-solid fa-cube dash-link-icon"></i>My cargo
                    </div>
                </li>
                <li>
                    <div 
                        className={`hover:tracking-wider transition-all cursor-pointer ease-in-out ${fleetLink && "active"}`}
                        onClick={() => {
                            setCargoLink(false)
                            setFleetLink(true)
                            setReferalLink(false)
                            setProfileLink(false)
                            setAnalysisLink(false)
                            setWalletLink(false)
                            setGetHelpLink(false)
                            setContactLink(false)
                        }}
                    >
                        <i class="fa-sharp fa-solid fa-bus dash-link-icon"></i>My fleet
                    </div>
                </li>
                <li>
                    <div 
                        className={`hover:tracking-wider transition-all cursor-pointer ease-in-out ${referalLink && "active"}`}
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
                </li>
                <li style={{position:'relative'}}>

                    <Link 
                        to='/'
                        className='hover:tracking-wider drop-down-dash-anc transition-all ease-in-out' onClick={() => setIsChevUp(!isChevUp)}><i class="fa-solid fa-briefcase dash-link-icon"></i>Account<i className={`fa-solid arrow-chev ${isChevUp ? "fa-chevron-up" : "fa-chevron-down"}`} onClick={() => setIsChevUp(!isChevUp)}></i></Link>
                    <ul className={`${!isChevUp ? "account-menu" : "account-menu-open"} transition-all ease-in-out`}>
                        <li>
                            <Link 
                                to='/profile'
                            >
                                <i class={`fa-solid fa-briefcase dash-link-icon ${profileLink && "active"}`}></i>Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/analysis'
                            >
                                <i class={`fa-solid fa-chart-area dash-link-icon ${analysisLink && "active"}`}></i>Analysis
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/wallet'
                            >
                                <i class="fa-sharp fa-solid fa-wallet dash-link-icon"></i>Wallet
                            </Link>
                        </li>
                        <li><Link to='/'
                            onClick={()=> {
                                firebase.auth().signOut().then(() => {
                                    navigate('/')
                                    }).catch((error) => {
                                    alert(error)
                                    });
                            }}
                        ><i class="fa-sharp fa-solid fa-right-from-bracket dash-link-icon"></i>Sign out</Link></li>
                    </ul>
                </li>
                <li>
                    <div 
                        className={`hover:tracking-wider cursor-pointer transition-all ease-in-out ${contactLink && "active"}`}
                        onClick={() => {
                            setCargoLink(false)
                            setFleetLink(false)
                            setReferalLink(false)
                            setProfileLink(false)
                            setAnalysisLink(false)
                            setWalletLink(false)
                            setGetHelpLink(false)
                            setContactLink(true)
                        }}
                    >
                        <i class="fa-solid fa-address-book dash-link-icon"></i>Contact
                    </div>
                </li>
                <li>
                    <div 
                        className={`hover:tracking-wider cursor-pointer transition-all ease-in-out ${getHelpLink && "active"}`}
                        onClick={() => {
                            setCargoLink(false)
                            setFleetLink(false)
                            setReferalLink(false)
                            setProfileLink(false)
                            setAnalysisLink(false)
                            setWalletLink(false)
                            setGetHelpLink(true)
                            setContactLink(false)
                        }}
                        to='/'
                    >
                        <i class="fa-solid fa-circle-info dash-link-icon"></i>Get help
                    </div>
                </li>
            </ul>
            <div className='dash-setting mobile-setting'>
                <div className='dash-icon-container'>
                    <div className='dash-setting-icon transition ease-in-out hover:scale-105 hover:cursor-pointer'>
                        <img src={setting} alt="" />
                    </div>
                    <p style={{fontSize:"10px", color:"#3c3c3c"}} className="dash-version">version 1.0.1</p>
                </div>
                <p></p>
            </div>
        </div>
        <div className='dash-setting'>
            <div className='dash-icon-container'>
                <div className='dash-setting-icon transition ease-in-out hover:scale-105 hover:cursor-pointer'>
                    <img src={setting} alt="" />
                </div>
                <p style={{fontSize:"10px", color:"#3c3c3c"}}>version 1.0.1</p>
            </div>
            <p></p>
        </div>
    </div>
        <div>
            <div className='right-top-section'>
                <div className='dash-top-links'>
                    <h2 className='dash-title'>{cargoLink && "My Cargo" || fleetLink && "My Fleet" || referalLink && "My Referral"}</h2>
                    <ul className='dash-act-links'>
                        <li><Link to='/' className='hover:decoration-yellow	 transition-all ease-in-out'>Dashboard</Link></li>
                        <li style={{marginRight:"0px"}}><Link to='/enterprise' className='book-load hover:bg-white transition-all ease-in-out'>Book a load</Link></li>
                    </ul>
                </div>
                <h4 className='dash-subtitle'>Dashboard</h4>
                <p className='mt-3'>Click one of the tables to view more information below</p>
                <div style={{position:"relative", width:"fit-content"}} className="dash-select-container" id='collapse-sel'>
                    <select className='filter-select' name="" id="">
                        <option value="">Monthly</option>
                        <option value="">Daily</option>
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
            <div className='dash-date'>
                <div className='dash-date-title'>
                    <h2>February 2022</h2>
                    <div className='booking-dash'>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>1</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px", textAlign:"end"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>2</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>3</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0", textAlign:"end"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>

                <div className='dash-date-title'>
                    <h2>January 2022</h2>
                    <div className='booking-dash'>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>1</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ color:"red", fontWeight:"bold", textAlign:"end"}}>Not delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>2</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>3</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>

                <div className='dash-date-title'>
                    <h2>December 2022</h2>
                    <div className='booking-dash'>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>1</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"red", fontWeight:"bold", textAlign:"end"}}>Not delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>2</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className='book-name'>
                            <div className='left-book-name'>
                                <h2 style={{fontWeight:"bold", marginRight:"15px"}}>3</h2>
                                <p style={{fontSize:"12px", textAlign:"center", fontSize:"11px", marginBottom:"0"}}>Bunch of Bananas</p>
                            </div>
                            <div className='right-dash-name'>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>Car Carrier</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>JOH - DUR</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{marginBottom:"0", textAlign:"end"}}>ZIP1234</p>
                                </div>
                                <div style={{width:"100px"}}>
                                    <p style={{ marginBottom:"0", color:"#25be17", fontWeight:"bold", textAlign:"end"}}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        {isSpinner && <ReactSpinner/>}
    </div>
  )
}

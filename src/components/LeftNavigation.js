import React, {useState} from 'react'
import logo from '../icons/logo.png';
import crossDash from '../icons/cross.png';
import { Link, useNavigate  } from 'react-router-dom'
import firebase from '../firebase-config';
import setting from '../icons/settings.png';
import ContactLink from './ContactLink';

export default function LeftNavigation({
    cargoLink,
    setCargoLink,
    fleetLink,
    setFleetLink,
    referalLink,
    setReferalLink,
    profileLink,
    setProfileLink,
    analysisLink,
    setAnalysisLink,
    walletLink,
    setWalletLink,
    getHelpLink,
    setGetHelpLink,
    contactLink,
    setContactLink
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCross, setIsCross] = useState(false)
    const [isChevUp, setIsChevUp] = useState(false)
    const navigate = useNavigate();

  return (
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
                        <i class="fa-sharp fa-solid fa-cube dash-link-icon"></i>My Cargo
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
                        className={`hover:tracking-wider transition-all ease-in-out ${contactLink && "active"}`}
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
                    <Link 
                        className={`hover:tracking-wider transition-all ease-in-out ${getHelpLink && "active"}`}
                        onClick={() => {
                            setCargoLink(false)
                            setFleetLink(false)
                            setReferalLink(false)
                            setProfileLink(false)
                            setAnalysisLink(false)
                            setWalletLink(false)
                            setGetHelpLink(true)
                        }}
                        to='/'
                    >
                        <i class="fa-solid fa-circle-info dash-link-icon"></i>Get help
                    </Link>
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
  )
}

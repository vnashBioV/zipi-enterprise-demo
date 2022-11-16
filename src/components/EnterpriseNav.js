import React, { useState, useEffect, useRef} from 'react'
import {Avatar} from '@mui/material';
import logo from '../icons/zipilogoo.png'
import {Link, useNavigate } from "react-router-dom";
import '../css/enterprisenav.css'
import firebase from '../firebase-config';


export default function EnterpriseNav({name}) {
    // const name = "Jane Doe";
    const iconName = name.substring(0,2);
    const navigate = useNavigate();
    const [mobNav, setMobNav] = useState(false);

  return (
    <div className='nav-container duration-500 ease-in-out'>
        <div className='nav duration-500 ease-in-out'>
            <div className='logo'>
                <Link to={'/'}><img src={logo} alt="" /></Link>
                <p>enterprise</p>
            </div>
            {!mobNav ? 
              <i class="fa-solid fa-bars" onClick={() => {
                if(mobNav === false){
                  setMobNav(true)
                }else{
                  setMobNav(false)
                }
                }}></i>

                :
                <i class="fa-solid fa-xmark" onClick={() => {
                  if(mobNav === false){
                    setMobNav(true)
                  }else{
                    setMobNav(false)
                  }
                  }}></i>

            }
            <ul className={`duration-500 ease-in-out ${!mobNav? 'dropdown-wrapper mobile-dropdown' : 'dropdown-wrapper mobile-dropdown-show'}`}>
                    <li><Link to="/tracking"><i className="fa-solid fa-location-arrow"></i>Tracking</Link></li>
                    <li><Link to="/schedule"><i className="fa-solid fa-calendar"></i>Schedule</Link></li>
                    <li><Link to="/bidding"><i className="fa-solid fa-clipboard-list"></i>Requets</Link></li>
                    <li><Link to="" onClick={()=> {
                        firebase.auth().signOut().then(() => {
                            navigate('/')
                          }).catch((error) => {
                            alert(error)
                          });
                    }}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link></li>
                </ul>
            <div className='profile'>
                <p>{name}</p>
                <Avatar className='Enterprise-icon'>{iconName.toUpperCase()}</Avatar>
                <i className="fa-solid fa-chevron-down chearrow"></i>
                <ul className='dropdown-wrapper'>
                    <li><Link to="/tracking"><i className="fa-solid fa-location-arrow"></i>Tracking</Link></li>
                    <li><Link to="/schedule"><i className="fa-solid fa-calendar"></i>Schedule</Link></li>
                    <li><Link to="/bidding"><i className="fa-solid fa-clipboard-list"></i>Requets</Link></li>
                    <li><Link to="" onClick={()=> {
                        firebase.auth().signOut().then(() => {
                            navigate('/Login')
                          }).catch((error) => {
                            alert(error)
                          });
                    }}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}


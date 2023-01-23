import React, { useState, useEffect, useRef} from 'react'
import {Avatar} from '@mui/material';
import logo from '../icons/zipilogoo.png'
import {Link, useNavigate } from "react-router-dom";
import '../css/enterprisenav.css'
import firebase from '../firebase-config';
import { useStateContext } from '../context/DashboardStateContext'

export default function EnterpriseNav({
  name,
  
}) {
    // const name = "Jane Doe";
    const iconName = name?.substring(0,2);
    const navigate = useNavigate();
    const [mobNav, setMobNav] = useState(false);
    const { 
      isEnterprise,
      setIsEnterprise,
      isTracking,
      setIsTracking,
      isShowSchedule,
      setIsShowSchedule,
      setIsShowRequest,
      isShowRequest,
      setCargoLink,
      cargoLink
  } = useStateContext();

  return (
    <div className='nav-container duration-500 ease-in-out' style={{width:"100%"}}>
        <div className='nav duration-500 ease-in-out'>
          <div  style={{height:"100%",cursor:"pointer", display:"flex", alignItems:"center"}}>
            <i class="fa-solid fa-chevron-left"
              onClick={() => {
                setCargoLink(true)
                setIsEnterprise(false)
                setIsTracking(false)
                setIsShowSchedule(false)
                setIsShowRequest(false)
             }}
            ></i><p style={{color:"#fff", marginLeft:"10px", fontSize:"20px", marginBottom:"0px"}}>My Cargo</p>
          </div>
            {/* <div className='logo'>
                <Link to={'/enterprise'}><img src={logo} alt="" /></Link>
                <p>enterprise</p>
            </div> */}
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
            <li><div className="nav-nav" 
                    onClick={() => {
                      setIsTracking(true);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowSchedule(false);
                      setIsShowRequest(false);
                    }}><i className="fa-solid fa-location-arrow nav-awe"></i>Tracking</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(true);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowRequest(false);
                    }}className="nav-nav"><i className="fa-solid fa-calendar nav-awe"></i>Schedule</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(false);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowRequest(true);
                    }}className="nav-nav"><i className="fa-solid fa-clipboard-list nav-awe"></i>Requets</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(false);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(true);
                      setIsShowRequest(false);
                    }}className="nav-nav" to="/dashboard"><i class="fa-solid fa-table-columns nav-awe"></i>Dashboard</div></li>
                    <li><div className="nav-nav" onClick={()=> {
                        firebase.auth().signOut().then(() => {
                            navigate('/Login')
                          }).catch((error) => {
                            alert(error)
                          });
                    }}><i className="fa-solid fa-arrow-right-from-bracket nav-awe"></i>Logout</div></li>
                </ul>
            <div className='profile'>
                <p>{name}</p>
                <Avatar className='Enterprise-icon'>{iconName.toUpperCase()}</Avatar>
                <i className="fa-solid fa-chevron-down chearrow"></i>
                <ul className='dropdown-wrapper'>
                    <li><div className="nav-nav" 
                    onClick={() => {
                      setIsTracking(true);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowSchedule(false);
                      setIsShowRequest(false);
                    }}><i className="fa-solid fa-location-arrow nav-awe"></i>Tracking</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(true);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowRequest(false);
                    }}className="nav-nav"><i className="fa-solid fa-calendar nav-awe"></i>Schedule</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(false);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(false);
                      setIsShowRequest(true);
                    }}className="nav-nav"><i className="fa-solid fa-clipboard-list nav-awe"></i>Requets</div></li>
                    <li><div onClick={() => {
                      setIsShowSchedule(false);
                      setIsTracking(false);
                      setIsEnterprise(false);
                      setCargoLink(true);
                      setIsShowRequest(false);
                    }}className="nav-nav" to="/dashboard"><i class="fa-solid fa-table-columns nav-awe"></i>Dashboard</div></li>
                    <li><div className="nav-nav" onClick={()=> {
                        firebase.auth().signOut().then(() => {
                            navigate('/Login')
                          }).catch((error) => {
                            alert(error)
                          });
                    }}><i className="fa-solid fa-arrow-right-from-bracket nav-awe"></i>Logout</div></li>
                </ul>
            </div>
        </div>
    </div>
  )
}


import React from 'react'
import construction from '../icons/construction.png'
import { useStateContext } from '../context/DashboardStateContext'
import { Link, useNavigate  } from 'react-router-dom'

export default function Wallet() {
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
      cargoLink,
      setCargoLink,
  } = useStateContext();
  return (
    <div> 
        <div style={{height:"100%",cursor:"pointer", padding:"1rem", display:"flex", alignItems:"center"}}>
            <i class="fa-solid fa-chevron-left"
              onClick={() => {
                setCargoLink(true)
                setIsEnterprise(false)
                setIsTracking(false)
                setIsShowSchedule(false)
                setIsShowRequest(false)
                navigate('/dashboard')

             }}
            ></i><p style={{color:"#000", marginLeft:"10px", fontSize:"20px", marginBottom:"0px"}}>My Cargo</p>
        </div>
         <div className='my-referals'>
          <img src={construction} alt="construction-icon" width={50} height={50}/>
          <p style={{marginTop:"30px"}}>This page is still under construction</p>
        </div>
    </div>
  )
}

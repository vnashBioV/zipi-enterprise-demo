import React, {useState} from 'react'
import LeftNavigation from './LeftNavigation'
import construction from '../icons/construction.png'

export default function Myfleet() {
  return (
    <div className='fleet-container'>
        <img src={construction} alt="construction-icon" width={50} height={50}/>
        <p style={{marginTop:"30px"}}>This page is still under construction</p>
    </div>
  )
}

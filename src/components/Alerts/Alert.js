import React from 'react'
import '../../css/alert.css'
import tick from '../../icons/tick.gif'

export default function Alert(props) {
  return (
    <div className='alert-container'>
        <div className='alert'>
            <img src={tick} alt="" style={{width:"17%", marginRight:"10px"}} />
            {props.children}
        </div>
    </div>
  )
}

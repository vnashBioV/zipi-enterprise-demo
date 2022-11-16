import React from 'react'
import '../css/search.css'

export default function Search(props) {
  return (
    <div className='search duration-500 ease-in-out'>
        {props.children}
    </div>
  )
}

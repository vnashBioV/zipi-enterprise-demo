import React from 'react'
import '../css/contacts.css'

export default function ContactsDetails({children,setContactDate}) {
  return (
    <div className={`contacts-details ${setContactDate && "margin-zero"}`}>
        {children}
    </div>
  )
}

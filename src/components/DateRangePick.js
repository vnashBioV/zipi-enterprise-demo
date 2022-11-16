import React, {useState, useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePick({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {


  return (
    <div className='date-pickk'>
      <div> 
        <p>Start date</p>
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={date => setStartDate(date)}
        />
      </div>
      <div>
        <p>End date</p>
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date) => {
            setEndDate(date)
          }}
        />
      </div>
      
  </div>
  )
}



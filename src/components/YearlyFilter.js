import React from 'react'
import { useStateContextBookings } from '../context/AllBookingsContext'

export default function YearlyFilter() {
    const { 
        getJanuaryMonthlyBookings,
        getFebruaryMonthlyBookings,
        getMarchMonthlyBookings,
        getAprilMonthlyBookings,
        getMayMonthlyBookings,
        getJuneMonthlyBookings,
        getJulyMonthlyBookings,
        getAugustMonthlyBookings,
        getSeptemberMonthlyBookings,
        getOctoberMonthlyBookings,
        getNovemberMonthlyBookings,
        getDecemberMonthlyBookings
    } = useStateContextBookings();
    var counter = 0;
  return (
    <div>YearlyFilter</div>
  )
}

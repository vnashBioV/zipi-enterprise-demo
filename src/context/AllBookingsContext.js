
import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from '../firebase-config';


const Context = createContext();

export const AllBookingsContext  = ({ children }) => {
    const [allOfTheBooking, setAllOfTheBooking] = useState([]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getJanuaryMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[0])
    const getFebruaryMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[1])
    const getMarchMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[2])
    const getAprilMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[3])
    const getMayMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[4])
    const getJuneMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[5])
    const getJulyMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[6])
    const getAugustMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[7])
    const getSeptemberMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[8])
    const getOctoberMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[9])
    const getNovemberMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[10])
    const getDecemberMonthlyBookings = allOfTheBooking.filter((booking) => months[(new Date(booking.date_created)).getMonth()] === months[11])
    const getYearlyBookings = allOfTheBooking.filter((booking) => (new Date(booking.date_created)).getYear() === (new Date()).getYear())

    console.log("get the full year booking", getYearlyBookings);

    return (
        <Context.Provider
            value={{
                allOfTheBooking,
                setAllOfTheBooking,
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
                getDecemberMonthlyBookings,
                getYearlyBookings
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContextBookings = () => useContext(Context);
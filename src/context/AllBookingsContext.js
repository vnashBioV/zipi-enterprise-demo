
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

    console.log("month from January context", getJanuaryMonthlyBookings);
    console.log("month from February context", getFebruaryMonthlyBookings);
    console.log("month from March context", getMarchMonthlyBookings);
    console.log("month from April context", getAprilMonthlyBookings);
    console.log("month from May context", getMayMonthlyBookings);
    console.log("month from June context", getJuneMonthlyBookings);
    console.log("month from July context", getJulyMonthlyBookings);
    console.log("month from August context", getAugustMonthlyBookings);
    console.log("month from September context", getSeptemberMonthlyBookings);
    console.log("month from October context", getOctoberMonthlyBookings);
    console.log("month from November context", getNovemberMonthlyBookings);
    console.log("month from December context", getDecemberMonthlyBookings);

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
                getDecemberMonthlyBookings
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContextBookings = () => useContext(Context);
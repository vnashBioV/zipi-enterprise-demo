import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const StateContext = ({ children }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [isShowSchedule, setIsShowSchedule] = useState(false);
    const [isShowRequest, setIsShowRequest] = useState(false);
    const [cargoLink, setCargoLink] = useState(true);
    const [isEnterprise, setIsEnterprise] = useState(false);

    return (
        <Context.Provider
            value={{
               isEnterprise,
               setIsEnterprise,
               isTracking,
               setIsTracking,
               isShowSchedule,
               setIsShowSchedule,
               setIsShowRequest,
               isShowRequest,
               cargoLink,
               setCargoLink
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContext = () => useContext(Context);
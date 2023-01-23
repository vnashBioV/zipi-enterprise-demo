import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const StateContext = ({ children }) => {

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
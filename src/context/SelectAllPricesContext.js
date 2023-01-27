import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const StateContextAllPrices = ({ children }) => {
   const [allPricesValue, setAllPricesValue] = useState([])
    console.log("prices from prices of context", allPricesValue);
    return (
        <Context.Provider
            value={{
                allPricesValue, 
                setAllPricesValue
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContextAllPrices = () => useContext(Context);
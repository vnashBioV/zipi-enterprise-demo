import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const StateSingleSelected = ({ children }) => {
   const [selectedValue, setSelectedValue] = useState([])
    console.log("selected context", selectedValue);
    return (
        <Context.Provider
            value={{
                selectedValue, setSelectedValue
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContextSingle = () => useContext(Context);
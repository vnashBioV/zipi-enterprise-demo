import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const AddressStateContextTwo = ({ children }) => {
    const [isAddressAuto, setIsAddressAuto] = useState("");

    return (
        <Context.Provider
            value={{
                isAddressAuto,
                setIsAddressAuto
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateContext = () => useContext(Context);
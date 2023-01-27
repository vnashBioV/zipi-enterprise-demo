import React, { createContext, useContext, useState, useEffect } from "react";
const Context = createContext();

export const StateBidding = ({ children }) => {
    const [yellowBackground, setYellowBackground] = useState(false);
    const [blueBackground, setBlueBackground] = useState(false);
    const [counterOffer, setCounterOffer] = useState(false);
    const [finalOffer, setFinalOffer] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [greenBackground, setGreenBackground] = useState(false);
    return (
        <Context.Provider
            value={{
                counterOffer, 
                setCounterOffer,
                finalOffer, 
                setFinalOffer,
                accepted, 
                setAccepted,
                greenBackground, 
                setGreenBackground,
                yellowBackground, 
                setYellowBackground,
                blueBackground, 
                setBlueBackground
            }}
        >
            {children}
        </Context.Provider>
    )
}   
export const useStateBidding = () => useContext(Context);
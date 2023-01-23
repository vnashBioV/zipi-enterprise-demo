import React, {useState, useEffect} from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import '../css/locationAuto.css';
import { useStateContext } from '../context/BookingAddress'



export default function LocationSearchInput({
  setBookingArray,
  bookingArray
}) {
  const { 
    isAddressAuto,
    setIsAddressAuto
  } = useStateContext();
  // // const [address, setAddress] = useState("");
  const handleChange = (value) => {
    setIsAddressAuto(value);
    console.log("this the value", value);
  }
  const handleSelect = (value) => {
    setIsAddressAuto(value);
    console.log("this the value selected", value);
  }
  console.log("check right here the results", isAddressAuto);
  return (
    <div>
      <PlacesAutocomplete value={isAddressAuto} onChange={handleChange} onSelect={handleSelect}>
          {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
            <div>
              <input {...getInputProps({
                placeholder: 'Physical address',
                className: 'location-search-input',
              })}/>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active ? 
                {background: "#f9dd07", cursor: "pointer"} :
                {background: "white", cursor: "pointer"}

                return(
                  <div style={{fontSize:"13.5px"}} {...getSuggestionItemProps(suggestion, {style})}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
          )}
      </PlacesAutocomplete>
    </div>
  )
}

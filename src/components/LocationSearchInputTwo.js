import React, {useState, useEffect} from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import '../css/locationAuto.css';
import { useStateContext } from '../context/BookingAddressTwo'

export default function LocationSearchInputTwo({
  setBookingArrayTwo,
  bookingArrayTwo
}) {

  const { 
    isAddressAuto,
    setIsAddressAuto
  } = useStateContext();

  const handleChange = (value) => {
    setIsAddressAuto(value);
    console.log("this the value", value);
  }
  const handleSelect = (value) => {
    setIsAddressAuto(value);
    console.log("this the value selected", value);
  }
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
                  <div {...getSuggestionItemProps(suggestion, {style})}>
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

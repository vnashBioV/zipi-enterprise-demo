import React, {useState, useEffect} from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import '../css/locationAuto.css';


export default function LocationSearchInput({
  setBookingArray,
  bookingArray
}) {
  // const [address, setAddress] = useState("");
  const handleChange = (value) => {
    setBookingArray((prevState) => ({
      ...prevState,
      details:{
          ...prevState.details,
          Address:value
      } 
    }))
  }
  const handleSelect = (value) => {
    setBookingArray((prevState) => ({
      ...prevState,
      details:{
          ...prevState.details,
          Address:value
      } 
    }))
  }
  return (
    <div>
      <PlacesAutocomplete value={bookingArray.details?.Address ? bookingArray.details?.Address: ""} onChange={handleChange} onSelect={handleSelect}>
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

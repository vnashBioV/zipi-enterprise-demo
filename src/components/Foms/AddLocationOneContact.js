import React, {useEffect, useState, useRef} from 'react'
import '../../css/addContacts.css'
import firebase from '../../firebase-config';
import {Avatar} from '@mui/material';
import Alert from '../Alerts/Alert';
import Spinner from '../Spinner';
import Autocomplete from '../LocationSearchInput'
import Loader from '../../components/loader/Loader'
import { useStateContext } from '../../context/BookingAddress'

export default function AddLocationOneContact({
        setBookingArray, 
        businessType, 
        handleBusiness, 
        residenceType, 
        handleResidence,
        closeLocationModal,
        bookingArray,
        setDefaultPick,
        setPickHomeIcon,
        setPickDefault,
        setPickSelected,
        setTrackLocation,
        setContactDate,
        setLocationtitle,
        setSearchLocationOne,
        setContactBackground,
        setLocationOneWrapper,
        setChangeContact,
        setNextBtn,
        setlocationTwo,
        // setAllPuDetails,
        // allPuDetails
        setAllContacts,
        allContacts
    }) {

    const iconName = ("Jane").substring(0,2);
    const [openAlert, setAlert] = useState(false);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [userUid, setUserUid] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [isAddOne, setIsaddOne] = useState(false);
    const [query, setQuery] = useState("");
    const keys = ["Name", "CompanyName","Surname"];
    const [suggestions, setSuggestions] = useState([]);
    const [validationOpsHours, setValidationOpsHours] = useState(false);
    const [checkOpsHoursOpen, setCheckOpsHoursOpen] = useState(false);
    const [checkOpsHoursClose, setCheckOpsHoursClose] = useState(false);
  

    const { 
        isAddressAuto,
        setIsAddressAuto
    } = useStateContext();

    // useEffect(() => {
        
    //     console.log("the address is right here", isAddressAuto);
    // }, [])
    

    //=========STATES ARRAY=========================================================================
    const [bookingArrayInst, setBookingArrayInst] = useState([])
    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
    // console.log(bookingArray)
    console.log("booking working array",allContacts)
    //========END CONSOLE LOGS======================================================================

    //==========FUNCTIONS===========================================================================
    const savePickContactFnc = async ()=>{
        return await firebase.database().ref().push()
    }
    const onSearchChange = (query) =>{
        let matches = []
        if (query.length>0){
            matches = allContacts.filter(booking =>{
                const regex = new RegExp(`${query}`, "i");
                return booking.details?.CompanyName?.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQuery(query)
    }
    //==========END FUNCTIONS=======================================================================


    //=========USE EFFECTS==========================================================================
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setUserUid(user.uid);
              var uid = user.uid
              // ...
            } else {
            }
        });
    }, [])

    // useEffect(() => {
    //   console.log("operating hours", bookingArray?.details?.OperatingHours?.open, bookingArray.details?.OperatingHours?.close)
    // }, [])
    

    useEffect(() => {
        setTimeout(() =>{
            setIsaddOne(true);
        }, 300)
    }, [])

    //===========END USE EFFECFS====================================================================

  return (
    <div className={`modal-container duration-500 ease-in-out ${isAddOne ? 'opacity-1' : 'opacity-0'}`}>
        <div className={`duration-500 ease-in-out ${isAddOne ? 'animate-addcontact-one' : 'modal'}`} >
        <div className='add-contacts-wrapper' style={{width: "709px"}}>
        <div>
            <h2>New address</h2>
            <p>Add a new contact by adding their information</p>
            <div className='address-type'>
                <label 
                    className={!businessType ? 'btn-address-type' : 'deactivate'}
                    onClick={handleBusiness}
                    value="business"
                >
                    Business
                </label>
                <label 
                    className={!residenceType ? 'btn-address-type' : 'deactivate'}
                    onClick={handleResidence}
                    value="residence"
                >
                    Residence
                </label>
            </div>
            <input 
                type="text" 
                placeholder='Company Name'
                onChange={e =>{setBookingArray((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        CompanyName:e.target.value
                    } 
                }))
                    onSearchChange(e.target.value) 
                    }
                }
                value={query}
            />
            {query.length>0 ? 
                <div className='search-results-pick' style={{cursor:"pointer"}}>
                    {suggestions?.length > 0 ? suggestions?.filter((booking) =>
                        keys?.some((key) => booking?.details[key].includes(query))
                    ).map((booking, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                const selected = ([booking])
                                setDefaultPick(selected)
                                setPickHomeIcon(true)
                                setPickDefault(false)
                                setPickSelected([booking])
                                setTrackLocation(true)
                                setContactDate(false)
                                setLocationtitle(false)
                                setSearchLocationOne(false)
                                setContactBackground(false)
                                setLocationOneWrapper(true)
                                setChangeContact(false)
                                setNextBtn(false)
                                setlocationTwo(true)
                                localStorage.setItem("pickSelectd", JSON.stringify(selected));
                                setIsLoading(true)
                                setTimeout(() =>{
                                    setIsLoading(false);
                                    closeLocationModal()
                                }, 1000)
                            }}
                        >
                            <p style={{marginTop:"5px", fontWeight:"bold", fontSize:"11.5px"}}>{booking.details.Name}</p>
                            <p style={{marginBottom:"5px", fontSize:"10px"}}>{booking.details.CompanyName}</p>
                            <hr />
                        </div>
                    )): <></>}
                </div>
                : <></>
            }


            <Autocomplete/>
            
            <input 
                type="text" 
                placeholder='City Name'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        CityName:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='Complex / Building'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        ComplexBuilding:e.target.value
                    } 
                    }))
                }
            />
            <p className='complex-label'>Building or complex name, floor or unit number</p>
            <div className='text-area-wrap'>
                <textarea 
                    cols="20" 
                    rows="5" 
                    placeholder='Special instructions for driver'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            SpecialInstructions:e.target.value
                        } 
                        }))
                    }
                >
                </textarea>
            </div>
            <div className='gate-in'><h1>Gate in - Gate out Duration</h1></div>
            <div className='gigo-container'>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="20 mins" name='gigo' 
                        onClick={e =>setBookingArray((prevState) => ({
                            ...prevState,
                            details:{
                                ...prevState.details,
                                GateInGateOut:e.target.value
                            } 
                            }))
                        }
                    />
                    20 mins
                </label>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="2 hrs" name='gigo'
                        onClick={e =>setBookingArray((prevState) => ({
                            ...prevState,
                            details:{
                                ...prevState.details,
                                GateInGateOut:e.target.value
                            } 
                            }))
                        }
                    />
                    2 hrs
                </label>
            </div>
            <div className='gigo-container' style={{marginTop:"5px"}}>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="40 mins" name='gigo'
                        onClick={e =>setBookingArray((prevState) => ({
                            ...prevState,
                                details:{
                                    ...prevState.details,
                                    GateInGateOut:e.target.value
                                } 
                            }))
                        }
                    />
                    40 mins
                </label>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="3 hrs" name='gigo'
                        onClick={e =>setBookingArray((prevState) => ({
                            ...prevState,
                                details:{
                                    ...prevState.details,
                                    GateInGateOut:e.target.value
                                } 
                            }))
                        }
                    />
                    3 hrs
                </label>
            </div>
            <div className='gigo-container' style={{marginTop:"5px", width:"192px"}}>
                <div className='column-other'>
                    <label htmlFor="twentymins" className='twentymins'>
                        <input type="radio" value="60 mins" name='gigo'
                            onClick={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                    details:{
                                        ...prevState.details,
                                        GateInGateOut:e.target.value
                                    } 
                                }))
                            }
                        />
                        60 mins
                    </label>
                    <label htmlFor="twentymins" className='twentymins' style={{marginTop:"5px"}}>
                        <input type="radio" value="90 mins" name='gigo' 
                            onClick={e =>setBookingArray((prevState) => ({
                                ...prevState,
                                    details:{
                                        ...prevState.details,
                                        GateInGateOut:e.target.value
                                    } 
                                }))
                            }
                        />
                        90 mins
                    </label>
                </div>
                <div className='other-mins'>
                    <input type="text" name='gigo' placeholder='Other (mins)'
                        onChange={e =>setBookingArray((prevState) => ({
                            ...prevState,
                                details:{
                                    ...prevState.details,
                                    GateInGateOut:e.target.value
                                } 
                            }))
                        }
                    />
                </div>
            </div>
            <div className='loading-offload-bays'>
                <input type="number" placeholder='Loading/offloading Bays'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                            details:{
                                ...prevState.details,
                                LoadingBays:e.target.value
                            } 
                        }))
                    }
                />
            </div>
            <span style={{display:"flex", alignItems:"center"}}>
                <h2 style={{fontSize:"13px", marginTop:"11px", marginBottom:"8px"}}>Operating Hours</h2>
                <i className="fa-solid fa-asterisk" style={{fontSize:"10px", color:"red", marginLeft:"5px"}}></i>
            </span>
            <div className='operating-hours'>
                <div>
                    <div>Open</div>
                    <div>Close</div>
                </div>

                <div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArray((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    OperatingHours:{
                                        ...prevState.details?.OperatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                                    setCheckOpsHoursOpen(true)
                                }
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArray((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    OperatingHours:{
                                        ...prevState.details.OperatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
                                    setCheckOpsHoursClose(true);
                                }
                            }
                        />
                    </div>
                </div>

            </div>
            <div className='operating-hours'>
                <h3 style={{fontSize:"13px", marginTop:"10px", marginBottom:"12px"}}>Public Holidays</h3>
                <div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArray((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    PublicHoliday:{
                                        ...prevState.details.PublicHoliday,
                                            open:e.target.value
                                    }
                                } 
                                }))
                                }
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArray((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    PublicHoliday:{
                                        ...prevState.details.PublicHoliday,
                                            close:e.target.value
                                    }
                                } 
                                }))
                                }
                            }
                        />
                    </div>
                   
                </div>
                
            </div>
            <div className='horizontal'>
                <hr />
            </div>
            <input 
                type="text" 
                placeholder='Email'
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        Email:e.target.value
                    } 
                    }))
                }
            />
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Name'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Name:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Surname'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Surname:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Phone'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Phone:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="tel" 
                    placeholder='Telephone'
                    onChange={e =>setBookingArray((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Telephone:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <select 
                onChange={e =>setBookingArray((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        NotificationType:e.target.value
                    } 
                    }))
                }
            >
                <option value="">Notification Type</option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="Both">Both</option>
            </select>
            <div className='add-to-contact'>
                <button 
                    onClick={() =>{
                        if(
                            checkOpsHoursClose && 
                            checkOpsHoursOpen 
                        ){
                            var contact_Uid
                            const pick_up_details = bookingArray.details
                            savePickContactFnc().then((data ) => {
                                contact_Uid = data.key
                                firebase.database().ref('/booking_party/' + userUid).child("contacts").push({
                                    details: {
                                        ...pick_up_details,
                                        Address: isAddressAuto
                                    },
                                    date: new Date().toISOString().substring(0,10)
                                });
                                console.log("pick_up_details", bookingArray);
                                console.log("contact_Uid", contact_Uid);
                            });
                            setIsLoading(true);
                            setTimeout(() => {
                                    setIsLoading(false);
                            }, 2000)
                        }else{
                            setValidationOpsHours(true);
                        }
                        }
                    }
                >
                    Add to contacts
                </button>
                {openSpinner && <Spinner/>}
                {openAlert && 
                    <Alert >
                        <div style={{width:"256px"}}>
                            <p style={{
                                position:"absolute",
                                right:"0px",
                                top:"0px",
                                padding:"7px",
                                cursor:"pointer",
                                fontWeight:"bold"
                            }}
                            onClick={() => setAlert(false)}
                            >X</p>
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact Successfully added...</h1>
                        </div>
                    </Alert>
                }
            </div>
        </div>
        <div>
            <h2 style={{marginBottom:"17px"}}>Contacts</h2>
            {allContacts?.length > 0 ? allContacts?.filter((booking) =>
                        keys?.some((key) => booking?.details[key]?.includes(query))
                    ).map((booking, i) =>(
                <React.Fragment key={i}>
                    <div className='contact-wrapper'
                        onClick={() => {
                            const selected = ([booking])
                            setDefaultPick(selected)
                            setPickHomeIcon(true)
                            setPickDefault(false)
                            setPickSelected([booking])
                            const acceptThisOne = allContacts.filter((b) => booking.details.Address !== b.details.Address )
                            setAllContacts(acceptThisOne)
                            console.log("accept this one", acceptThisOne);
                            setTrackLocation(true)
                            setContactDate(false)
                            setLocationtitle(false)
                            setSearchLocationOne(false)
                            setContactBackground(false)
                            setLocationOneWrapper(true)
                            setChangeContact(false)
                            setNextBtn(false)
                            setlocationTwo(true)
                            localStorage.setItem("pickSelectd", JSON.stringify(selected));
                            setIsLoading(true)
                            setTimeout(() =>{
                                setIsLoading(false);
                                closeLocationModal()
                            }, 1000)

                        }}
                    >
                        <Avatar className='Enterprise-icon'>{booking.details.Name.toUpperCase().substring(0,2)}</Avatar>
                        <div>
                            <p>{booking.details?.Name}</p>
                            <p>{booking.details?.CompanyName}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))
            
            : <div className='no-contacts'>
                <p>
                    You currently don't have any contact for the 
                    new address. Fill in the contact details here.
                </p>
                <div>
                    <i class="fa-solid fa-arrow-trend-down"></i>
                </div>
            </div>
            }
        </div>
        </div>
        <div className='cancel-add-btn'>
            <button onClick={closeLocationModal}>Cancel</button>
            <button onClick={closeLocationModal}>Save</button>
        </div> 
        </div>

        {isLoading  &&
            <Loader/>
        }
        {validationOpsHours &&
            <div className='ops-validation'>
                <div>
                    <p>Please fill in the operating hours</p>
                    <button onClick={() => {setValidationOpsHours(false)} }>Ok</button>
                </div>
            </div>
        }
    </div>

    
  )
}

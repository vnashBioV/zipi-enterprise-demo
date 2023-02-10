import React, {useEffect, useState, useRef} from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import Alert from '../Alerts/Alert';
import Spinner from '../Spinner';
import firebase from '../../firebase-config';
import Autocomplete from '../LocationSearchInputTwo'
import Loader from '../loader/Loader'
import { useStateContext } from '../../context/BookingAddressTwo'
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

export default function AddLocationOneContact({
        setBookingArrayTwo, 
        businessTypeTwo, 
        handleBusinessTwo, 
        residenceTypeTwo, 
        handleResidenceTwo,
        closeLocationModalTwo,
        bookingArrayTwo,
        doDetails,
        setDoDetails,
        setPickHomeIconTwo,
        setPickDefaultTwo,
        setDropSelected,
        setTrackLocationTwo,
        setContactDateTwo,
        setLocationtitleTwo,
        setSearchLocationTwo,
        setContactBackgroundTwo,
        setLocationTwoWrapper,
        setChangeContactTwo,
        setNextBtnTwo,
        setCargoShow,
        setDefaultDrop,
        allContacts,
        setAllContacts
    }) {

    const iconName = ("Jane").substring(0,2);

    //=========STATES ARRAY=========================================================================
    const [bookingArrayTwoInst, setBookingArrayTwoInst] = useState([])
    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);
    const [userUid, setUserUid] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [isAddTwo, setIsaddTwo] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([])
    const keysTwo = ["Name", "CompanyName","Surname"];
    const [isLoadingTwo , setIsLoadingTwo] = useState(false);
    const [validationOpsHours, setValidationOpsHours] = useState(false);
    const [checkOpsHoursOpen, setCheckOpsHoursOpen] = useState(false);
    const [checkOpsHoursClose, setCheckOpsHoursClose] = useState(false);
    const [suggestionsName, setSuggestionsName] = useState([]);
    const [queryName, setQueryName] = useState("");
    const [open, setOpen] = React.useState(
        dayjs('2018-01-01T00:00:00.000Z'),
    );
    const [close, setClose] = React.useState(
        dayjs('2018-01-01T00:00:00.000Z'),
    );
    const [pubOpen, setPubOpen] = React.useState(
        dayjs('2018-01-01T00:00:00.000Z'),
    );
    const [pubClose, setPubClose] = React.useState(
        dayjs('2018-01-01T00:00:00.000Z'),
    );

    const { 
        isAddressAuto,
        setIsAddressAuto
    } = useStateContext();

    console.log("this is address two", isAddressAuto)
    const saveDropContactFnc = async ()=>{
        return  await firebase.database().ref().push()
    }

    const onSearchChange = (query) =>{
        const suggest = allContacts.filter((item) => {
            return query.toLowerCase() === '' ? item : item.details.CompanyName.toLowerCase().includes(query)
        })
        setSuggestions(suggest)
    }

    const onSearchChangeName = (queryName) =>{
        const suggest = allContacts.filter((item) => {
            return queryName.toLowerCase() === '' ? item : item.details.Name.toLowerCase().includes(queryName)
        })
        setSuggestionsName(suggest)
    }

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
    useEffect(() => {
        setTimeout(() =>{
            setIsaddTwo(true);
        }, 300)
    }, [])

    useEffect(() => {

        setBookingArrayTwo((prevState) => ({
            ...prevState,
            details:{
                ...prevState.details,
                OperatingHours:{
                    ...prevState?.details?.OperatingHours,
                        open:open.$d.toString().substring(15,21)
                }
            } 
        }))

        setBookingArrayTwo((prevState) => ({
            ...prevState,
            details:{
                ...prevState.details,
                OperatingHours:{
                    ...prevState?.details?.OperatingHours,
                        close:close.$d.toString().substring(15,21)
                }
            } 
        }))

        setBookingArrayTwo((prevState) => ({
            ...prevState,
            details:{
                ...prevState.details,
                PublicHoliday:{
                    ...prevState.details.PublicHoliday,
                        open:pubOpen.$d.toString().substring(15,21)
                }
            } 
        }))

        setBookingArrayTwo((prevState) => ({
            ...prevState,
            details:{
                ...prevState.details,
                PublicHoliday:{
                    ...prevState?.details?.PublicHoliday,
                        close:pubClose.$d.toString().substring(15,21)
                }
            } 
        }))

    }, [open, close, pubOpen, pubClose])

    console.log("contacts hours on the drop", bookingArrayTwo?.details?.OperatingHours, bookingArrayTwo?.details?.PublicHoliday);

  return (
    <div className={`modal-container duration-500 ease-in-out ${isAddTwo ? 'opacity-1' : 'opacity-0'}`}>
        <div className={`modal duration-500 ease-in-out ${isAddTwo ? 'animate-addcontact-one' : 'modal'}`}>
        <div className='add-contacts-wrapper' style={{width: "709px"}}>
        <div>
            <h2>New address</h2>
            <p>Add a new contact by adding their information</p>
            <div className='address-type'>
                <label 
                    className={!businessTypeTwo ? 'btn-address-type' : 'deactivate'}
                    onClick={handleBusinessTwo}
                    value="business"
                >
                    Business
                </label>
                <label 
                    className={!residenceTypeTwo ? 'btn-address-type' : 'deactivate'}
                    onClick={handleResidenceTwo}
                    value="residence"
                >
                    Residence
                </label>
            </div>
            <input 
                type="text" 
                placeholder='Company Name'
                onChange={e =>{setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        CompanyName:e.target.value
                    } 
                }))
                setQuery(e.target.value)
                onSearchChange(e.target.value) 
                }
            }
            />

            {query.length>0 ? 
                <div className='search-results-drop' style={{cursor:"pointer"}}>
                    {suggestions?.length > 0 ? suggestions?.map((booking, i) => (
                        <div
                        style={{display:"flex", marginTop:"10px"}}
                        key={i}
                        onClick={() => {
                            setPickHomeIconTwo(true)
                            setPickDefaultTwo(false)
                            setDropSelected([booking])
                            const selected = ([booking])
                            setDefaultDrop(selected)
                            // setDoDetails(selected)
                            setTrackLocationTwo(true)
                            setContactDateTwo(false)
                            setLocationtitleTwo(false)
                            setSearchLocationTwo(false)
                            setContactBackgroundTwo(false)
                            setLocationTwoWrapper(true)
                            setChangeContactTwo(false)
                            setNextBtnTwo(false)
                            setCargoShow(true)
                            setIsLoading(true)
                            localStorage.setItem("dropSelectd", JSON.stringify(selected));
                            setTimeout(() =>{
                                setIsLoading(false);
                                closeLocationModalTwo()
                            }, 1000)
                        }}
                        >
                            <Avatar className='Enterprise-icon'>{booking.details.Name.toUpperCase().substring(0,2)}</Avatar>
                            <div style={{marginLeft:"10px"}}>
                                <p style={{margin:"2px 0", fontWeight:"bold", fontSize:"11.5px"}}>{booking.details.Name}</p>
                                <p style={{marginBottom:"5px", fontSize:"10px"}}>{booking.details.CompanyName}</p>
                            </div>
                            <hr />
                        </div>
                        // <div>hey</div>
                    )): <></>}
                </div>
                : <></>
            }

            <Autocomplete/>

            <input 
                type="text" 
                placeholder='City Name'
                onChange={e =>setBookingArrayTwo((prevState) => ({
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
                onChange={e =>setBookingArrayTwo((prevState) => ({
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
                    onChange={e =>setBookingArrayTwo((prevState) => ({
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

            
            <div className='loading-offload-bays'>
                <input type="text" placeholder='Loading/offloading Bays'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
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
            </span>
            <div className='operating-hours'>
                <div>
                    <div>Open</div>
                    <div>Close</div>
                </div>
                <div>
                    <div>
                        {/* <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    OperatingHours:{
                                        ...prevState.details.OperatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                                    setCheckOpsHoursOpen(true);
                                }
                            }
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                value={open}
                                onChange={setOpen}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                value={close}
                                onChange={setClose}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {/* <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>{setBookingArrayTwo((prevState) => ({
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
                        /> */}
                    </div>
                </div>

                

            </div>
            <div className='operating-hours'>
                <h3 style={{fontSize:"13px", marginTop:"10px", marginBottom:"12px"}}>Public Holidays</h3>
                <div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                value={pubOpen}
                                onChange={setPubOpen}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {/* <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    PublicHoliday:{
                                        ...prevState.details.operatingHour,
                                            open:e.target.value
                                    }
                                } 
                                }))
                            }
                        /> */}
                    </div>
                    <div>
                        {/* <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                details:{
                                    ...prevState.details,
                                    PublicHolidays:{
                                        ...prevState.details.operatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
                            }
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <TimePicker
                                value={pubClose}
                                onChange={setPubClose}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                </div>
                
            </div>
            <div className='horizontal'>
                <hr />
            </div>
            <input 
                type="text" 
                placeholder='Email'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    details:{
                        ...prevState.details,
                        Email:e.target.value
                    } 
                    }))
                }
            />
            <div className='double-inputs'>
                <div className='name-div'>
                <input 
                    type="text" 
                    placeholder='Name'
                    onChange={e =>{setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Name:e.target.value
                        } 
                        }))
                        setQueryName(e.target.value) 
                        onSearchChangeName(e.target.value);
                        }
                    }
                    />
                    {queryName.length>0 ? 
                        <div style={{cursor:"pointer", position:"absolute", background:"#fff", padding:"10px", width:"100%", display:`${suggestionsName.length ? "block": "none"}`}}>
                            {suggestionsName?.length > 0 ? suggestionsName?.map((booking, i) => (
                                <div
                                    style={{display:"flex", marginTop:"10px"}}
                                    key={i}
                                    onClick={() => {
                                        setPickHomeIconTwo(true)
                                        setPickDefaultTwo(false)
                                        setDropSelected([booking])
                                        const selected = ([booking])
                                        setDefaultDrop(selected)
                                        setTrackLocationTwo(true)
                                        setContactDateTwo(false)
                                        setLocationtitleTwo(false)
                                        setSearchLocationTwo(false)
                                        setContactBackgroundTwo(false)
                                        setLocationTwoWrapper(true)
                                        setChangeContactTwo(false)
                                        setNextBtnTwo(false)
                                        setCargoShow(true)
                                        setIsLoading(true)
                                        localStorage.setItem("dropSelectd", JSON.stringify(selected));
                                        setTimeout(() =>{
                                            setIsLoading(false);
                                            closeLocationModalTwo()
                                        }, 1000)
                                    }}
                                >
                                    <div style={{marginLeft:"10px"}}>
                                        <p style={{margin:"2px 0", fontWeight:"bold", fontSize:"11.5px"}}>{booking.details.Name}</p>
                                        <p style={{marginBottom:"5px", fontSize:"10px"}}>{booking.details.CompanyName}</p>
                                    </div>
                                    <hr />
                                </div>
                            )): <></>}
                        </div>
                        : <></>
                    }

                </div>

                <input 
                    type="text" 
                    placeholder='Surname'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
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
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        details:{
                            ...prevState.details,
                            Phone:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Telephone'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
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
                onChange={e =>setBookingArrayTwo((prevState) => ({
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
            
        </div>
        <div>
            <h2 style={{marginBottom:"17px"}}>Contacts</h2>
            {allContacts.length > 0 ? allContacts.map((booking, i) =>(
                <React.Fragment key={i}>
                    <div className='contact-wrapper'
                        onClick={() => {
                            setPickHomeIconTwo(true)
                            setPickDefaultTwo(false)
                            setDropSelected([booking])
                            const selected = ([booking])
                            setDefaultDrop(selected)
                            // setDoDetails(selected)
                            setTrackLocationTwo(true)
                            setContactDateTwo(false)
                            setLocationtitleTwo(false)
                            setSearchLocationTwo(false)
                            setContactBackgroundTwo(false)
                            setLocationTwoWrapper(true)
                            setChangeContactTwo(false)
                            setNextBtnTwo(false)
                            setCargoShow(true)
                            setIsLoading(true)
                            localStorage.setItem("dropSelectd", JSON.stringify(selected));
                            setTimeout(() =>{
                                setIsLoading(false);
                                closeLocationModalTwo()
                            }, 1000)
                        }}
                    >
                        <Avatar className='Enterprise-icon'>{booking.details?.Name.toUpperCase().substring(0,2)}</Avatar>
                        <div>
                            <p>{booking.details.Name}</p>
                            <p>{booking.details.CompanyName}</p>
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
        <div className='add-to-contact'>
                <button onClick={closeLocationModalTwo} style={{background:"#fff", width:"15%", marginRight:"1rem"}}>Cancel</button>
                <button 
                    style={{width:"15%"}}
                    onClick={() =>{
                                var contact_Uid
                                const drop_of_details = bookingArrayTwo.details
                                saveDropContactFnc().then((data ) => {
                                    contact_Uid = data.key
                                    firebase.database().ref('/booking_party/' + userUid).child("contacts").push({
                                        details:{
                                            ...drop_of_details,
                                            Address: isAddressAuto
                                        },
                                        date: new Date().toISOString().substring(0,10)
                                    });
                                    console.log("drop_of_details", bookingArrayTwo);
                                    console.log("contact_Uid", contact_Uid);
                                });
                                setIsLoading(true);
                                setTimeout(() => {
                                        setIsLoading(false);
                                        closeLocationModalTwo()
                                }, 2000)
                            }
                        }
                >
                    Save
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

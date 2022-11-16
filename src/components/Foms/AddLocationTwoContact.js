import React, {useEffect, useState, useRef} from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import Alert from '../Alerts/Alert';
import Spinner from '../Spinner';
import firebase from '../../firebase-config';
import Autocomplete from '../LocationSearchInputTwo'
import Loader from '../../components/loader/Loader'


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
        allDoDetails,
        setAllDuDetails
    }) {

    const iconName = ("Jane").substring(0,2);
    // var bookingWorkingArray = []

    //=========STATES ARRAY=========================================================================
    const [bookingArrayTwoInst, setBookingArrayTwoInst] = useState([])
    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);
    const [userUid, setUserUid] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const [isAddTwo, setIsaddTwo] = useState(false);
    // const [allDoDetails,setAllDuDetails] = useState([]);


    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
    console.log(bookingArrayTwo)
    console.log("booking working array",bookingArrayTwo.length)
    //========END CONSOLE LOGS======================================================================

    //==========FUNCTIONS===========================================================================
    const saveDropContactFnc = async ()=>{
        return  await firebase.database().ref().push()
    }
    //==========END FUNCTIONS=======================================================================


    //=========USE EFFECTS==========================================================================
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
    useEffect(() => {
        setTimeout(() =>{
            setIsaddTwo(true);
        }, 300)
    }, [])
    //===========END USE EFFECFS====================================================================

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
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doCompanyName:e.target.value
                    } 
                }))
            }
            />
            {/* <input 
                type="text" 
                placeholder='Physical Address'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doAddress:e.target.value
                    } 
                    }))
                }
            /> */}

            <Autocomplete bookingArrayTwo={bookingArrayTwo} setBookingArrayTwo={setBookingArrayTwo}/>


            <input 
                type="text" 
                placeholder='City Name'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doCityName:e.target.value
                    } 
                    }))
                }
            />
            <input 
                type="text" 
                placeholder='Complex / Building'
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doComplexBuilding:e.target.value
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
                        doDetails:{
                            ...prevState.doDetails,
                            doSpecialInstructions:e.target.value
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
                        onClick={e =>setBookingArrayTwo((prevState) => ({
                            ...prevState,
                            doDetails:{
                                ...prevState.doDetails,
                                doGateInGateOut:e.target.value
                            } 
                            }))
                        }
                    />
                    20 mins
                </label>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="2 hrs" name='gigo'
                        onClick={e =>setBookingArrayTwo((prevState) => ({
                            ...prevState,
                            doDetails:{
                                ...prevState.doDetails,
                                doGateInGateOut:e.target.value
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
                        onClick={e =>setBookingArrayTwo((prevState) => ({
                            ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doGateInGateOut:e.target.value
                                } 
                            }))
                        }
                    />
                    40 mins
                </label>
                <label htmlFor="twentymins" className='twentymins'>
                    <input type="radio" value="3 hrs" name='gigo'
                        onClick={e =>setBookingArrayTwo((prevState) => ({
                            ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doGateInGateOut:e.target.value
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
                            onClick={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doGateInGateOut:e.target.value
                                    } 
                                }))
                            }
                        />
                        60 mins
                    </label>
                    <label htmlFor="twentymins" className='twentymins' style={{marginTop:"5px"}}>
                        <input type="radio" value="90 mins" name='gigo' 
                            onClick={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doGateInGateOut:e.target.value
                                    } 
                                }))
                            }
                        />
                        90 mins
                    </label>
                </div>
                <div className='other-mins'>
                    <input type="text" name='gigo' placeholder='Other (mins)'
                        onChange={e =>setBookingArrayTwo((prevState) => ({
                            ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doGateInGateOut:e.target.value
                                } 
                            }))
                        }
                    />
                </div>
            </div>
            <div className='loading-offload-bays'>
                <input type="text" placeholder='Loading/offloading Bays'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                            doDetails:{
                                ...prevState.doDetails,
                                doLoadingBays:e.target.value
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.doOperatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doOperatingHours:{
                                        ...prevState.doDetails.doOperatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
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
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doPublicHolidays:{
                                        ...prevState.doDetails.operatingHours,
                                            open:e.target.value
                                    }
                                } 
                                }))
                            }
                        />
                    </div>
                    <div>
                        <input 
                            className='time-pill' 
                            type="time" 
                            placeholder=''
                            onChange={e =>setBookingArrayTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doPublicHolidays:{
                                        ...prevState.doDetails.operatingHours,
                                            close:e.target.value
                                    }
                                } 
                                }))
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
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doEmail:e.target.value
                    } 
                    }))
                }
            />
            <div className='double-inputs'>
                <input 
                    type="text" 
                    placeholder='Name'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doName:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Surname'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doSurname:e.target.value
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
                        doDetails:{
                            ...prevState.doDetails,
                            doPhone:e.target.value
                        } 
                        }))
                    }
                />
                <input 
                    type="text" 
                    placeholder='Telephone'
                    onChange={e =>setBookingArrayTwo((prevState) => ({
                        ...prevState,
                        doDetails:{
                            ...prevState.doDetails,
                            doTelephone:e.target.value
                        } 
                        }))
                    }
                />
            </div>
            <select 
                onChange={e =>setBookingArrayTwo((prevState) => ({
                    ...prevState,
                    doDetails:{
                        ...prevState.doDetails,
                        doNotificationType:e.target.value
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
                            // setBookingArrayTwoInst([bookingArrayTwo])
                            var contact_Uid
                            const drop_of_details = bookingArrayTwo.doDetails
                            saveDropContactFnc().then((data ) => {
                                contact_Uid = data.key
                                firebase.database().ref('contacts').child(userUid).push({
                                   "drop_of_details":{
                                    details: drop_of_details,
                                    date: new Date().toISOString().substring(0,10)
                                    }
                                });
                                console.log("drop_of_details", bookingArrayTwo);
                                console.log("contact_Uid", contact_Uid);
                            });
                            setIsLoading(true);
                            setTimeout(() => {
                                    setIsLoading(false);
                            }, 2000)
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
            {allDoDetails.length > 0 ? allDoDetails.map((booking) =>(
                <React.Fragment key={booking.id}>
                    <div className='contact-wrapper'
                        onClick={() => {
                            setPickHomeIconTwo(true)
                            setPickDefaultTwo(false)
                            // setDropSelected([booking])
                            const selected = ([booking])
                            setDefaultDrop(selected)
                            setDoDetails(selected)
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
                            setTimeout(() =>{
                                setIsLoading(false);
                                closeLocationModalTwo()
                            }, 1000)
                        }}
                    >
                        <Avatar className='Enterprise-icon'>{booking.drop_of_details.details.doName.toUpperCase().substring(0,2)}</Avatar>
                        <div>
                            <p>{booking.drop_of_details.details.doName}</p>
                            <p>{booking.drop_of_details.details.doCompanyName}</p>
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
            <button onClick={closeLocationModalTwo}>Cancel</button>
            <button onClick={closeLocationModalTwo}>Save</button>
        </div> 
        </div>   
        {isLoading  &&
            <Loader/>
        }
    </div>

    
  )
}

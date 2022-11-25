import React, {useEffect, useState, useRef} from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import EnterpriseNav from '../components/EnterpriseNav';
import '../css/schedule.css'
import firebase from '../firebase-config';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import Alert from '../components/Alerts/Alert'
import Spinner from '../components/Spinner'
import axios from 'axios';
import Box from '@mui/material/Box';
import DateRangePick from '../components/DateRangePick'
// import 'rsuite/dist/styles/rsuite-default.css';
// import { LicenseInfo } from '@mui/x-data-grid-pro';




export default function SchedulingPage() {
    const [userEmail, setUserEmail] = useState("");
    const [userUid, setUserUid] = useState("");
    const [company, setCompany] = useState("");
    const [pickUpDetails , setPickUpDetails] = useState([])
    const [dropDetails , setDropDetails] = useState([])
    const [cargoDetails , setCargoDetails] = useState([])
    const [prerequisites , setPrerequisites] = useState([])
    const [fileUrl, setFileUrl] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [cargoSchedule, setCargoSchedule] = useState([]);
    const [operationDays, setOperationDays] = useState([])
    const [includeHolidays, setIncludeHolidays] = useState(false)
    const [rateIndication, setRateIndication] = useState(null)
    const [finalPick, setFinalPick] = useState([])
    const [finalDrop, setFinalDrop] = useState([])
    const [prerequisitesArray, setPrerequisitesArray] = useState([]);
    const [vehicleType, setVehicleType] = useState([])
    const [gateInOutDuration, setGateInOutDuration] = useState([]);
    const [bays, setBays] = useState(0);
    const [loadCalChange,setLoadCalChange] = useState(0);
    const navigate = useNavigate();
    const [rangeValue, setRangeValue] = useState(0);
    const [loadsCount, setLoadsCount] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [numberChangeVal, setNumberChangeVal] = useState(numberOfDays);
    const [moredayss, setMoredayss] = useState(() => 0)
    const [testVar, setTestVar] = useState(0);
    const [isScheduleLoaded, setIsScheduleLoaded] = useState(false);
    const [actualLoad, setActualLoad] = useState();

    
    // const [valueNewRange, setValueNewRange] = useState(new Date())

    var loadcal = []
    var moreloadss = loadcal
    var moreloadCal = loadcal
    var moveload = 0

    //email
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("hello")

    const [openAlert, setAlert] = useState(false)
    const [openSpinner, setOpenSpinner] = useState(false);

    const rangeRef = useRef()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            setUserEmail(user.email);
              setUserUid(user.uid);
              var uid = user.uid
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const company = snapshot.val().companyName
                    setCompany(company)
                });
              // ...
            } else {
            }
        });
    }, [])

    useEffect(() => {
        if(localStorage.getItem("pickSelectd")){
            const storedList = JSON.parse(localStorage.getItem("pickSelectd"))
            setPickUpDetails(storedList);
            setFinalPick(storedList[0].details);
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("dropSelectd")){
            const storedList = JSON.parse(localStorage.getItem("dropSelectd"))
            setDropDetails(storedList);
            setFinalDrop(storedList[0].details);
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("Prerequisites")){
            const storedList = JSON.parse(localStorage.getItem("Prerequisites"))
            setPrerequisites(storedList);
        }
    }, [])

    // useEffect(() => {
    //     return () => {
    //         if(localStorage.getItem("vehicleType")){
    //             const storedList = JSON.parse(localStorage.getItem("vehicleType"))
    //             setVehicleType(storedList);
    //         }
    //       }
    // }, [])

    useEffect(() => {
        if(localStorage.getItem("cargoSelectd")){
            const storedList = JSON.parse(localStorage.getItem("cargoSelectd"))
            const vehicleType = JSON.parse(localStorage.getItem("vehicleType"))
            storedList.details.vehicle_type = vehicleType[0]
            setCargoDetails([storedList]);
            console.log("This is the new cargo", storedList);
        }
        
    }, [])
    

    useEffect(() => {
        const startDateString = startDate.toString().substring(0,16)
        const endDateString = endDate.toString().substring(0,16)
        setCargoSchedule({
            pickUpDetails: pickUpDetails,
            dropDetails: dropDetails,
            prerequisites:prerequisites,
            startDateString: startDateString,
            endDateString: endDateString,
            operationDays: operationDays,
            includeHolidays: includeHolidays,
            rateIndication: rateIndication
        })
        const cargo = cargoSchedule
        // localStorage.setItem("cargoSchedule", JSON.stringify([cargo]))
    }, [])

    const getBookingIFnc = async ()=>{
        return  await firebase.database().ref().push()
    }

    console.log("final pick", finalPick);
    console.log("final drop", finalDrop);

    // console.log("Selected pick up details", pickUpDetails);
    // console.log("Selected drop off details", dropDetails);
    // console.log("This is is is prerequisites", prerequisites);
    // console.log("start date", startDate)
    // console.log("end date", endDate)
    // console.log("cargo schedule", cargoSchedule)
    // console.log("operation days", operationDays)
    // console.log("rate indication", rateIndication)
    // console.log("this is bays", bays)
    // console.log("this is gate in out duration", gateInOutDuration)
    // console.log("range value", rangeValue)
    // console.log("prerequisites for testing", prerequisites[0].prerequisites.ad_hoc_services);

    useEffect(() => {
        document.body.style.cssText="margin-top:98px !important";
    
        return () => {
            document.body.style.marginTop= "0px";
        };
    }, []);

    useEffect(() => {
        setTimeout(() =>{
            setIsScheduleLoaded(true);
        }, 800)
    },[])

    // useEffect(() => {
    //     setActualLoad((((parseFloat((cargoDetails??.details?.weight)))/32)).toFixed(3))
    // },[])
    
        //Calculate number of days from start date to end date
        const d1 = startDate,
        d2 = endDate,
        diff = (d2-d1)/864e5,
        dateFormat = {weekday:'long',month:'short',day:'numeric'},
        dates = Array.from(
            {length: diff+1},
            (_,i) => {
            const date = new Date() 
            date.setDate(d1.getDate()+i) 
            const [weekdayStr, dateStr] = date.toLocaleDateString('en-US',dateFormat).split(', ')
            return `${dateStr} ${weekdayStr}`
            }
        )
            
    // console.log("Dates between", dates);
    // console.log("vehicle type", prerequisites)
    // console.log("start date", startDate.toISOString().substring(8,10));
    // console.log("end date", endDate.toISOString().substring(8,10));
    // console.log("number of days", numberOfDays);
    // console.log("numberChangeVal", numberChangeVal);
    // console.log("the cargo", cargoDetails);

  return (
    <div className={`duration-500 ease-in-out ${isScheduleLoaded ? 'open-schedule' : 'schedule-page'}`}>
         <EnterpriseNav 
            name={company}
        />
        <div  style={{display:"flex", alignItems:"center", marginBottom:"17px"}}>
            <Link to='/' style={{textDecoration:"none"}}><i className="fa-solid fa-chevron-left"></i></Link>
            <span className='schedule-navigation'>
                <p>Booking</p>
                <p>/</p>
                <p>Schedule</p>
            </span>
        </div>
        <div className='schedule-sum'>
            <div>
                <div>
                    <p>Summary</p>
                    {/* <div>
                        <p>Empty Depot</p>
                    </div> */}
                    <div>
                        <p>Load Cargo</p>
                    </div>
                    {/* <div>
                        <p>Staging Area</p>
                    </div> */}
                    <div>
                        <p>Offload Cargo</p>
                    </div>
                    <div style={{height:"397px"}}>
                        <p>Cargo</p>
                    </div>
                    {/* <div style={{height:"199px"}}>
                        <p>Vehicle</p>
                    </div> */}
                    <div>
                        <p>Prerequisites</p>
                    </div>
                </div>
                <div>
                    <p style={{marginBottom:"36px"}}></p>
                    {/* <div style={{height: "69px"}}>
                       <p>Not selected</p>
                    </div> */}

                    {pickUpDetails.length > 0 ? pickUpDetails.map((pick) =>(
                        <React.Fragment key={pick.date}>
                            <div style={{height: "69px"}}>
                                <p>{pick.details?.Name}</p> 
                                <p>{pick.details?.CompanyName}</p> 
                                <p>{pick.details?.Email}</p>    
                            </div>
                        </React.Fragment>
                    ))
            
                    : <div style={{height: "69px"}}><p>Not selected</p></div> 
                    }
                    

                    {/* <div style={{height: "69px"}}>
                       <p>Not selected</p>
                    </div> */}
                    {dropDetails.length > 0 ? dropDetails.map((drop) =>(
                        <React.Fragment key={drop?.date}>
                            <div style={{height: "69px"}}>
                                <p>{drop.details?.Name}</p> 
                                <p>{drop.details?.CompanyName}</p> 
                                <p>{drop.details?.Email}</p>    
                            </div>
                        </React.Fragment>
                    ))
            
                    : <div style={{height: "69px"}}><p>Not selected</p></div> 
                    }

                    <div className='cargo-sum-sched'>
                        {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                            <React.Fragment key={cargo.date}>
                                <div>
                                    <h1>{cargo.details?.productName}</h1> 
                                    <p>SKU: {cargo.details?.productCode}</p> 
                                </div>
                            </React.Fragment>
                        ))
                
                            : <div>
                                <h1>Not selected</h1>
                                <p>Not selected</p>
                            </div>
                        }
                        <div>
                            <div className='quantity-plus-info'> 

                                <div>
                                    <p>Quantity</p>
                                    <p>Length</p>
                                    <p>Breadth</p>
                                    <p>Height</p>
                                </div>

                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                <React.Fragment key={cargo.date}>
                                    <div>
                                        <p>: {cargo.details?.quantity}</p> 
                                        <p>: {cargo.details?.lengthValue} cm</p> 
                                        <p>: {cargo.details?.breadth} cm</p> 
                                        <p>: {cargo.details?.height} cm</p> 
                                    </div>
                                </React.Fragment>
                                ))
                        
                                    : <div>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                    </div>
                                }
                            </div>

                            <div className='quantity-plus-info'>
                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                <React.Fragment key={cargo?.date}>
                                    <div>
                                        <p>{
                                                cargo.details?.lengthValue *
                                                cargo.details?.breadth *
                                                cargo.details?.height

                                            }cm&#179; :</p> 
                                        <p>{
                                                ((cargo.details?.lengthValue *
                                                cargo.details?.breadth *
                                                cargo.details?.height)/1000000).toFixed(5)

                                            }&#x33a5; :</p> 
                                        <p>{parseFloat((cargo.details?.weight)/1000).toFixed(3)}t :</p> 
                                        <p>{parseFloat((cargo.details?.weight)/1000).toFixed(3)}t :</p> 
                                    </div>
                                </React.Fragment>
                                ))
                        
                                    : <div>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                        <p>Not selected</p>
                                    </div>
                                }

                                <div>
                                    <p>Net Volume</p>
                                    <p>Total Volume</p>
                                    <p>Net Weight</p>
                                    <p>Total Weight</p>
                                </div>
                            </div>
                        </div>

                        <div className='hazardous-cargo'>
                            <div>
                                <p>Hazardous Cargo</p>
                            </div>
                            <div className='hazardous-wrapper'>
                                <div className='hazardous-second-child'>
                                    <div>
                                        <p>Package Type</p>
                                        <p>Fragile Cargo</p>
                                    </div>
                                    {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo?.date}>
                                        <div style={{textAlign:"start"}}>
                                            <p>: {cargo.details?.packageType}</p> 
                                        <p>: No</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                    }

                                </div>

                                <div className='hazardous-second-child'>
                                    {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo.date}>
                                        <div style={{justifyContent:"end", textAlign:"end"}}>
                                            <p>{cargo.details?.imoClass} :</p> 
                                            <p>{cargo.details?.unNumber} :</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                    }

                                    <div>
                                        <p>IMO</p>
                                        <p>UN Number</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='temperature-controlled'>
                            <div>
                                <p>Temperature Controlled Cargo</p>
                            </div>
                            <div className='hazardous-second-child'>
                                <div>
                                    <p>Min</p>
                                    <p>Max</p>
                                </div>
                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                                    <React.Fragment key={cargo.date}>
                                        <div style={{justifyContent:"start", textAlign:"start"}}>
                                            <p>: {cargo.details.hazard?.min_temp}</p> 
                                            <p>: {cargo.details.hazard?.max_temp}</p>
                                        </div>
                                    </React.Fragment>
                                    ))
                            
                                        : <div>
                                            <p>Not selected</p>
                                            <p>Not selected</p>
                                        </div>
                                }
                            </div>
                        </div>

                        {cargoDetails.length > 0 ? cargoDetails.map((cargo) =>(
                            <React.Fragment key={cargo?.date}>
                                 <a href={cargo?.sds_url}  className='view-sds'>View SDS <i className="fa-solid fa-eye"></i></a>
                            </React.Fragment>
                            ))
                    
                                : <a href="" className='view-sds'>View SDS <i className="fa-solid fa-eye"></i></a>
                        }                    
                    </div>

                    <div className='prerequisites'>
                        <h2>{vehicleType}</h2>
                        <div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Ad-hoc Services</p>
                                {prerequisites.length > 0  ? prerequisites[0].prerequisites.ad_hoc_services.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                    { pre && <p>{pre}</p> }
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Documentation</p>
                                {prerequisites.length > 0 ? prerequisites[0].prerequisites.documentation.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>{pre}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                        </div>

                        <div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Personal Protective Equipment</p>
                                {prerequisites.length > 0 ? prerequisites[0].prerequisites.personal_protective.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>{pre}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                            </div>
                            <div>
                                <p style={{fontWeight:"bold"}}>Vehicle Equipment</p>
                                <div>
                                    {prerequisites.length > 0 ? prerequisites[0].prerequisites.vehicle_equipment.map((pre, key) =>{
                                    return(
                                        <p key={uuidv4()}>{pre}</p>
                                    )})
                                        : <p>Not selected</p>
                                    }
                                </div>
                                
                            </div>
                        </div>
                        <div className='insurance'>
                            <h2>Insurance (Goods in Transit)</h2>
                            {prerequisites.length > 0 ? prerequisites.map((pre, key) =>(
                                <React.Fragment key={uuidv4()}>
                                        <p>R{pre.prerequisites.goods_in_transit}</p> 
                                </React.Fragment>
                                ))
                        
                                    : 
                                        <p>Not selected</p>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className='schedule-the-cargo'>
                <h2>Schedule this cargo</h2>
                <p>When would you like to move this cargo?</p>
                <div className='pick-the-date'>
                        <DateRangePick
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            numberOfDays={numberOfDays}
                            setNumberOfDays={setNumberOfDays}
                        />
                </div>
                <p style={{marginTop:"10px", marginBottom:"10px"}}>Handling Operation Days</p>
                <div className='days-of-week' style={{marginBottom:"10px"}}>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Monday">M</button>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Tuesday">T</button>
                    <button onClick={(e) => {
                             e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Wednesday">W</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Thursday">T</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Friday">F</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Saturday">S</button>
                    <button onClick={(e) => {
                            e.target.style.background = "#f9dd07"
                            setOperationDays([...operationDays, e.target.value])
                        }
                    } value="Sunday">S</button>
                </div>
                <label htmlFor="" style={{fontSize:"12px"}}>
                    <input type="checkbox" name="" id="" style={{marginRight:"8px"}} onClick={() => setIncludeHolidays(true)}/>
                    Include public holidays
                </label>

                <div className='gate-duration'>
                    <p>Gate in - gate out duration</p>
                    <div className='gate-in-out'>
                        <label htmlFor="15 mins">
                            <input value="15 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            15 mins
                        </label>
                        <label htmlFor="30 mins">
                            <input value="30 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            30 mins
                        </label>
                        <label htmlFor="60 mins">
                            <input value="60 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            60 mins
                        </label>
                    </div>

                    <div className='gate-in-out'>
                        <label htmlFor="90 mins">
                            <input value="90 mins" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            90 mins
                        </label>
                        <label htmlFor="2 hrs">
                            <input value="2 hrs" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            2 hrs
                        </label>
                        <label htmlFor="3 hrs">
                            <input value="3 hrs" name='transit' type="radio" onClick={(e) => setGateInOutDuration(e.target.value)}/>
                            3 hrs
                        </label>
                    </div>
                    <div className='other-mins'>
                        <input type="text" placeholder='Other mins' onChange={(e) => setGateInOutDuration(e.target.value)}/>
                    </div>
                    <div className='bay-container'>
                        <div className='bays'>
                            <p>Bays</p>
                            <input type="text" placeholder='e.g 5' onChange={(e) => {
                                setBays(e.target.value)
                            }}/>
                        </div>
                        <div>
                            {/* <p>Daily Load Capacity</p> */}
                            {pickUpDetails.length > 0 ? pickUpDetails.map((booking) =>{
                                const Closehours = booking?.details.OperatingHours.close.substring(0,2)
                                const Openhours =  booking?.details.OperatingHours.open.substring(0,2)
                                const OH = (Closehours - Openhours)*(60)
                                  loadcal.push(((OH)/(parseFloat(gateInOutDuration)))*(bays))
                                console.log("loadsCount: ", loadcal);
                                return(
                                    <></>
                                )})
                                    : <></>
                            }
                        </div>
                    </div>
                    <div className='time-loads'>
                        <p>Time vs Loads</p>
                        <p style={{fontSize:"10px"}}>Move the slider to see how it's going to affect loads and duration.</p>
                        <input 
                            type="range" 
                            max={dates.length} 
                            min={1} 
                            onChange={(e) =>{
                                setRangeValue(e.target.value)
                                var i 
                                for(i=1; i < moreloadCal; i++) {
                                    console.log("logged numbers", i)
                                    setTestVar((i+1)/(e.target.value))
                                }
                            }}
                            className='range-input'
                        />
                        <div className='track-label'>
                            <div>
                                <p>More days</p>
                                <p>{rangeValue} days</p>
                            </div>
                            <div>
                                <p>More loads</p>
                                {cargoDetails.length > 0 ? cargoDetails.map((cargo) => (
                                <p key={uuidv4()} style={{color: 'red'}}>{rangeValue === 0 ? ((parseFloat((cargo.details.weight)).toFixed(3))/32) : (((parseFloat((cargo.details.weight)).toFixed(3))/32)/rangeValue).toFixed(3)} per day</p>
                                ))
                                    : <></>
                                }
                                {/* <p style={{color: 'red'}}>{loadcal} per day</p> */}
                            </div>
                        </div>
                        <div className='load-required-date'>
                            <p>Actual loads for the cargo</p>
                            {cargoDetails.length > 0 ? cargoDetails.map((cargo) => (
                                <p>{(parseFloat((cargo.details.weight)).toFixed(3))/32}t</p>
                            ))
                                : <></>
                            }
                            
                            <p style={{fontSize: '11px'}}>Est. Date of Completion</p>
                            <p style={{fontSize: '14px'}}>{endDate.toISOString().substring(0,10)}</p>
                        </div>
                    </div>
                </div>
                <span style={{ display:"flex"}}>
                    <h2 style={{fontSize:"11px", fontWeight:"normal", marginBottom:"10px"}}>Rate Indication per Truck</h2><i className="fa-solid fa-info"></i>
                </span>
                <span style={{display:"flex"}} className="book-btn-proceed">
                    <input type="text" name="" placeholder='e.g 17 00' id="" onChange={(e) => setRateIndication(e.target.value)}/>
                    <button onClick={() => {
                            const startDateString = startDate.toISOString().substring(0,10)
                            const endDateString = endDate.toISOString().substring(0,10)
                            const cargo = cargoDetails[0].details
                            const cargoSds = cargoDetails[0] ? cargoDetails[0].sds_url : null
                            const starting_location = finalPick.Address
                            const destination = finalDrop.Address
                            const start_date = startDateString
                            const due_date = endDateString
                            const total_loads = parseInt(parseInt((cargo.quantity)/34).toFixed(0))
                            const vehicle_type_required = prerequisites[0].prerequisites.vehicle_type[0]
                            const asking_rate = rateIndication
                            var booking_id 
                            
                            getBookingIFnc().then((data ) => {
                               booking_id = data.key
                               const bookingref = booking_id.substring(1,7)
                               const cargoquantity = cargoDetails[0].details.quantity
                               firebase.database().ref('/booking/' + booking_id).update({
                                puDetails:{
                                    puCityName: finalPick.CityName,
                                    puCompanyName: finalPick.CompanyName,
                                    puComplexBuilding: finalPick.ComplexBuilding,
                                    puEmail: finalPick.Email,
                                    puGateInGateOut: finalPick.GateInGateOut,
                                    puLoadingBays: finalPick.LoadingBays,
                                    puName: finalPick.Name,
                                    puNotificationType: finalPick.NotificationType,
                                    puOperatingHours: finalPick.OperatingHours,
                                    puPhone: finalPick.Phone,
                                    puPublicHoliday: finalPick.PublicHoliday,
                                    puSpecialInstructions: finalPick.SpecialInstructions,
                                    puSurname: finalPick.Surname,
                                    puTelephone: finalPick.Telephone,
                                    puAddress: finalPick.Address
                                },
                                doDetails:{
                                    doCityName: finalDrop.CityName,
                                    doCompanyName: finalDrop.CompanyName,
                                    doComplexBuilding: finalDrop.ComplexBuilding,
                                    doEmail: finalPick.Email,
                                    doGateInGateOut: finalDrop.GateInGateOut,
                                    doLoadingBays: finalDrop.LoadingBays,
                                    doName: finalDrop.Name,
                                    doNotificationType: finalDrop.NotificationType,
                                    doOperatingHours: finalDrop.OperatingHours,
                                    doPhone: finalDrop.Phone,
                                    doPublicHoliday: finalDrop.PublicHoliday,                                   
                                    doSpecialInstructions: finalDrop.SpecialInstructions,
                                    doSurname: finalDrop.Surname,
                                    doTelephone: finalDrop.Telephone,
                                    doAddress: finalDrop.Address,
                                },
                                prerequisites:prerequisites[0].prerequisites,
                                dates_time_selection: {
                                    start_date_string: startDateString,
                                    end_date_string: endDateString,
                                    operation_days: operationDays,
                                    include_holidays: includeHolidays,
                                    bays: bays
                                },
                                rate_required: parseFloat(rateIndication),
                                booking_party_uid: userUid,
                                date_created: (new Date()).toISOString().substring(0,10),
                                gate_in_gate_out_duration: gateInOutDuration,
                                "cargoInformation":
                                    {...cargo
                                        ,sdsUrl: cargoSds === undefined ? "" : cargoSds,
                                    },
                                
                                booking_ref: booking_id.substring(1,7),
                                booking_id: booking_id,
                                loads_per_day: !testVar === "" ? testVar.toFixed(0) : moreloadCal,
                                actual_loads_for_cargo: parseInt(parseInt((cargo?.quantity)/34).toFixed(0)) ? parseInt(parseInt((cargo?.quantity)/34).toFixed(0)) : 0
                            }).then(() => {
                                var message = 'hello world'
                                var xhr = new XMLHttpRequest();
                                xhr.addEventListener('lod', () => {
                                    console.log(xhr.responseText);
                                })
                                xhr.open('GET', 'https://developer.zipi.co.za/my-new-request.php?sendto=' + userEmail + 
                                    '&name=' + company + 
                                    '&date=' + new Date().toISOString().substring(0,10) +
                                    '&bookingref=' + bookingref +
                                    '&cargoquantity=' + cargoquantity +
                                    '&starting_location=' + starting_location +
                                    '&destination=' + destination +
                                    '&start_date=' + start_date +
                                    '&due_date=' + due_date +
                                    '&total_loads=' + total_loads +
                                    '&vehicle_type_required=' + vehicle_type_required +
                                    '&asking_rate=' + asking_rate
                                )
                                xhr.send()
                                setTimeout(() => {
                                    navigate('/bidding')
                                }, 3000); 
                            });

                            });
                             
                            // console.log("Final pick details", pickUpDetails);
                            // console.log("Final drop details", dropDetails);
                            // console.log("Final prerequisite", prerequisites);
                            // console.log("Final start date", startDateString);
                            // console.log("Final end", endDateString);
                            // console.log("Final operation days", operationDays);
                            // console.log("Final include holidays", includeHolidays);
                            // console.log("Final rateIndication", rateIndication);

                            setPrerequisitesArray({prerequisites:prerequisites[0].prerequisites})
                            
                    }}>Book Now <i className="fa-solid fa-chevron-right"></i></button>
                </span>
            </div>
        </div>
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
                    <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Requet Successfully made</h1>
                </div>
            </Alert>
        }
    </div>
  )
}

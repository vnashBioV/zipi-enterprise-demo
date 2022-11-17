import React, {useState, useEffect, useRef} from 'react'
import EnterpriseNav from '../components/EnterpriseNav'
import LocationTitle from '../components/LocationTitle'
import Search from '../components/Search'
import searchIcon from '../icons/search-icon.png';
import ellipse from '../icons/user-avatar.png';
import '../css/enterprise.css'
import ContactsDetails from '../components/ContactsDetails';
import Default from '../components/Default';
import AddContacts from '../components/Foms/AddContacts'
import AddLocationOneContact from '../components/Foms/AddLocationOneContact';
import AddLocationTwoContact from '../components/Foms/AddLocationTwoContact';
import NextButtonComp from '../components/NextButtonComp';
import AddCargo from '../components/Foms/AddCargo'
import firebase from '../firebase-config';
import Spinner from '../components/Spinner';
import bikeIcon from "../icons/sg-bike.png"
import carIcon from "../icons/sg-car.png"
import panelIcon from "../icons/sg-panel-van.png"
import smallBakkieIcon from "../icons/sg-bakkie.png"
import truckIcon from   "../icons/sg-truck.png"
import carCarrier from "../icons/car-carier.png"
import container from "../icons/container.png"
import tanker from "../icons/tanker.png"
import tautliner from "../icons/tautliner.png"
import refrigerated from "../icons/refrigerated.png"
import abnormal from "../icons/abnormal.png"
import Alert from '../components/Alerts/Alert';
import Prerequisites from '../components/Prerequisites' 
import PrerequisitesTwo from '../components/PrerequisitesTwo'
import emptyIcon from '../icons/box.png'
import PrerequisitesThreee from '../components/PrerequisitesThreee'
import PrerequisitesFour from '../components/PrerequisitesFour'
import PrerequisitesFive from '../components/PrerequisitesFive'
import PrerequisitesSix from '../components/PrerequisitesSix'
import { Link, useNavigate  } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import EnterpriseLoader from '../components/LoaderEnterprise'
import { motion } from 'framer-motion';

export default function Enterprise() {
    const [locationOneSearch, setLocationOneSearch] = useState(false);
    const [locationTwoSearch, setLocationTwoSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [queryTwo, setQueryTwo] = useState("");
    const [queryThree, setQueryThree] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [pickDefault, setPickDefault] = useState(true);
    const [pickDefaultTwo, setPickDefaultTwo] = useState(true);
    const [trackLocation, setTrackLocation] = useState(false);
    const [trackLocationTwo, setTrackLocationTwo] = useState(false);
    const [reasonLocation, setReasonLocation] = useState(false);
    const [pickHomeIcon, setPickHomeIcon] = useState(false);
    const [addLocationOne, setAddLocationOne] = useState(false);
    const [addLocationTwo, setAddLocationTwo] = useState(false);
    const [nextBtn, setNextBtn] = useState(true);
    const [nextBtnTwo, setNextBtnTwo] = useState(true);
    const [businessType, setBusinessType] = useState(false);
    const [businessTypeTwo, setBusinessTypeTwo] = useState(false);
    const [residenceType, setResidenceType] = useState(false);
    const [residenceTypeTwo, setResidenceTypeTwo] = useState(false);
    const [contactDate, setContactDate] = useState(true);
    const [contactDateTwo, setContactDateTwo] = useState(true);
    const [pickSelected, setPickSelected] = useState([])
    const [dropSelected, setDropSelected] = useState([])
    const [locationtitle, setLocationtitle] = useState(true);
    const [locationtitleTwo, setLocationtitleTwo] = useState(true)
    const [locationtitleThree, setLocationtitleThree] = useState(true)
    const [searchLocationOne, setSearchLocationOne] = useState(true)
    const [searchLocationTwo, setSearchLocationTwo] = useState(true)
    const [searchLocationThree, setSearchLocationThree] = useState(true)
    const [contactBackground, setContactBackground] = useState(true)
    const [contactBackgroundTwo, setContactBackgroundTwo] = useState(true)
    const [locationOneWrapper, setLocationOneWrapper] = useState(true)
    const [locationTwoWrapper, setLocationTwoWrapper] = useState(false)
    const [changeContact, setChangeContact] = useState(true)
    const [changeContactTwo, setChangeContactTwo] = useState(true)
    const [openCargoModal, setOpenCargoModal] = useState(false);
    const [userEmail,setUserEmail] = useState("")
    const [company, setCompany] = useState("")
    const [typeOfVehicle, setTypeOfVehicle] = useState("")
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openAlert, setAlert] = useState(false)
    const [openSpinnerTwo, setOpenSpinnerTwo] = useState(false);
    const [openAlertTwo, setAlertTwo] = useState(false)
    const [openPre, setOpenPre] = useState(false)
    const [openPreTwo, setOpenPreTwo] = useState(false)
    const [openPreThree, setOpenPreThree] = useState(false)
    const [openPreFour, setOpenPreFour] = useState(false)
    const [openPreFive, setOpenPreFive] = useState(false)
    const [openPreSix, setOpenPreSix] = useState(false)
    const [prerequisites, setPrerequites] = useState([])
    const [vehicleType, setVehicleType] = useState([]);
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [pickHomeIconTwo,setPickHomeIconTwo] = useState(false)
    const keys = ["Name", "CompanyName","Surname"];
    const keysTwo = ["Name", "CompanyName","Surname"];
    const keysThree = ["productName", "productCode"];
    const [suggestionBlok, setSuggestionBlok] = useState(true)
    const [userUid, setUserUid] = useState("");
    const [pickUserUid, setPickUserUid] = useState("");
    const navigate = useNavigate();
    const [locationTwo, setlocationTwo] = useState(false);
    const [cargoShow, setCargoShow] = useState(false);
    const [vehicleShow, setVehicleShow] = useState(false);
    const [isLoading , setIsLoading] = useState(true);
    const [whatUser, setWhatUser] = useState("");
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [isLoadingTwo , setIsLoadingTwo] = useState(false);
    const [isCargoDisabled,setIsCargoDisabled] = useState(false);

    //=======ARRAY STATES==========================================================================
    const [address, setAddress] = useState("");
    const [bookingArray, setBookingArray] = useState([]);
    const [bookingArrayTwo, setBookingArrayTwo] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsTwo, setSuggestionsTwo] = useState([])
    const [suggestionsThree, setSuggestionsThree] = useState([])
    const [puDetails, setPuDetails] = useState([]);
    const [doDetails, setDoDetails] = useState([]);
    const [cargoDetails, setCargoDetails] = useState([])
    const [cargoDetailsArray, setCargoDetailsArray] = useState([])
    const [fileUrl, setFileUrl] = useState(null)
    const [selectedbookingThree, setSelectedBookingThree] = useState([])
    const [bookingArrayThree, setBookingArrayThree] = useState([])
    const [pickLocal, setPickLocal] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [defaultPick, setDefaultPick] = useState([])
    const [defaultDrop, setDefaultDrop] = useState([])
    const [allPuDetails,setAllPuDetails] = useState([]);
    const [allDoDetails,setAllDuDetails] = useState([]);
    const [defaultCargo,setDefaultCargo] = useState([]);


    //=======END ARRAY STATES======================================================================

    //==========USE REF============================================================================
    const contactOneClick = useRef();
    const hOne = useRef(null);
    // let enterprise = useRef(null);
    // let blocks = useRef(null);
    //==========END REF============================================================================
    
    //========FUNCTIONS============================================================================
    
    const pickUpContainer = useRef()
    const dropOffContainer = useRef()

    const onSearchChange = (query) =>{
        let matches = []
        if (query.length>0){
            matches = allPuDetails.filter(booking =>{
                const regex = new RegExp(`${query}`, "gi");
                return booking.details.Name.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQuery(query)
    }

    const onSearchChangeTwo = (queryTwo) =>{
        let matches = []
        if (queryTwo.length>0){
            matches = allDoDetails.filter(booking =>{
                const regex = new RegExp(`${queryTwo}`, "i");
                return booking.details.Name.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestionsTwo(matches)
        setQueryTwo(queryTwo)
    }

    const onSearchChangeThree = (queryThree) =>{
        let matches = []
        if (queryThree.length>0){
            matches = bookingArrayThree.filter(booking =>{
                const regex = new RegExp(`${queryThree}`, "i");
                return booking.details.productName.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestionsThree(matches)
        setQueryThree(queryThree)
    }

    const onSuggestHandler = (query) =>{
        setQuery(query)
        setSuggestions([])
    }

    const onSuggestHandlerTwo = (queryTwo) =>{
        setQueryTwo(queryTwo)
        setSuggestionsTwo([])
    }

    const onSuggestHandlerThree = (queryThree) =>{
        setQueryTwo(queryThree)
        setSuggestionsTwo([])
    }

   const handleBusiness = (e)=>{
        if(residenceType === false){
            setBusinessType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }else if(residenceType === true){
            setResidenceType(false)
            setBusinessType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }
   }

   const handleBusinessTwo = (e)=>{
    if(residenceTypeTwo === false){
        setBusinessTypeTwo(true)
        const value = e.target.textContent
        setBookingArrayTwo((prevState) => ({
            ...prevState,
            doDetails:{
                ...prevState.doDetails,
                doBusinessType:value
            } 
        }))
    }else if(residenceTypeTwo === true){
        setResidenceTypeTwo(false)
        setBusinessTypeTwo(true)
        const value = e.target.textContent
        setBookingArray((prevState) => ({
            ...prevState,
            doDetails:{
                ...prevState.doDetails,
                doBusinessType:value
            } 
        }))
    }
}

   const handleResidence = (e)=>{
        if(businessType === false){
            setResidenceType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }else if(businessType === true){
            setBusinessType(false)
            setResidenceType(true)
            const value = e.target.textContent
            setBookingArray((prevState) => ({
                ...prevState,
                puDetails:{
                    ...prevState.puDetails,
                    puBusinessType:value
                } 
            }))
        }
    } 

    const handleResidenceTwo = (e)=>{
        if(businessTypeTwo === false){
            setResidenceTypeTwo(true)
            const value = e.target.textContent
            setBookingArrayTwo((prevState) => ({
                ...prevState,
                doDetails:{
                    ...prevState.doDetails,
                    doBusinessType:value
                } 
            }))
        }else if(businessTypeTwo === true){
            setBusinessTypeTwo(false)
            setResidenceTypeTwo(true)
            const value = e.target.textContent
            setBookingArrayTwo((prevState) => ({
                ...prevState,
                doDetails:{
                    ...prevState.doDetails,
                    doBusinessType:value
                } 
            }))
        }
    } 

    const openPreModal = () =>{
        setOpenPre(prev => !prev)
    }

    const openPreModalTwo = () =>{
        setOpenPreTwo(prev => !prev)
    }

    const openPreModalThree = () =>{
        setOpenPreThree(prev => !prev)
    }

    const openPreModalFour = () =>{
        setOpenPreFour(prev => !prev)
    }

    const openPreModalFive = () =>{
        setOpenPreFive(prev => !prev)
    }

    const openPreModalSix = () =>{
        setOpenPreSix(prev => !prev)
    }

    const closeLocationModal = ()=>{
        setAddLocationOne(false)
    }  
    const closeLocationModalTwo = ()=>{
        setAddLocationTwo(false)
    } 

    const handleContactClick = (event, booking) =>{
        setPickHomeIcon(true)
        setPickDefault(false)
        setPickSelected([booking])
        const selected = ([booking])
        pickUpContainer.current.classList.add("contacts-unselect")
        setPuDetails(selected)
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
    }
    const handleContactClickTwo = (event, booking) =>{
        setPickHomeIconTwo(true)
        setPickDefaultTwo(false)
        setDropSelected([booking])
        const selected = ([booking])
        dropOffContainer.current.classList.add("contacts-unselect")
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
        localStorage.setItem("dropSelectd", JSON.stringify(selected));
    }

    var VarBookingArrayThree = bookingArrayThree;
    //========END FUNCTIONS===============================================================================

    //=========USE EFFECTS================================================================================
    useEffect(() => {
        document.body.style.cssText="margin-top:117px !important";
        return () => {
            document.body.style.marginTop= "0px";
        };
    }, []);

    // useEffect(() => {
    //     if(puDetails){
    //         setDoDetails([puDetails[0]])
    //     }
    // }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid);
              var uid = user.uid;
              localStorage.setItem("userUid", JSON.stringify(uid));
              firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                    const userInfo = snapshot.val();
                    const company = snapshot.val().companyName
                    localStorage.setItem("userInformation", JSON.stringify(userInfo));
                    setCompany(company)
                });
                // firebase.database().ref('contacts/').child(uid).on('value', (snapshot) => {
                //     setPuDetails(Object?.values(snapshot.val()).filter((b) =>  b?.pick_up_details));
                //     // console.log("testing this fucker", Object.values(snapshot.val()).filter((b) =>  b.pick_up_details))
                // });


                // firebase.database().ref('contacts/').child(uid).on('value', (snapshot) => {
                //     setAllDuDetails(Object?.values(snapshot.val()).filter((b) =>  b?.drop_of_details));
                // });

                firebase.database().ref('/booking_party/' + uid).child("contacts").on('value', (snapshot) => {
                    if(snapshot.exists()){
                        setAllPuDetails(Object?.values(snapshot.val()));
                        setAllDuDetails(Object?.values(snapshot.val()));
                    }
                    // console.log("this is the pick up", snapshot.val())
                });
                // firebase.database().ref('contacts/').child(uid).on('value', (snapshot) => {
                //     setDoDetails(Object?.values(snapshot.val()).filter((b) =>  b?.drop_of_details));
                // });
                firebase.database().ref('/booking_party/' + uid).child("cargo_details").on('value', (snapshot) => {
                    // if(snapshot.exists()){
                        setBookingArrayThree(Object?.values(snapshot.val()));
                    //     console.log("booking cargo", Object?.values(snapshot.val()))
                    // }
                    console.log("this is the cargo", Object?.values(snapshot.val()));
                });
              // ...
            } else {
                navigate('/login');
            }
        });
    }, [])

    useEffect(() => {
        setTimeout(() =>{
            setIsPageLoaded(true);
            window.scrollTo(0, 0)
        }, 700)
    }, [])

    useEffect(() => {
        if(puDetails){
            setIsLoading(true);
            setIsLoadingTwo(true);
            setTimeout(() =>{
                setIsLoading(false);
                setIsLoadingTwo(false);
            }, 2000)
        }
    },[])
    //===========END USE EFFECFS==========================================================================

    //===========CONSOLE LOGS=============================================================================
    // console.log(bookingArray);
    // console.log("after contact has been selected", pickSelected)
    // console.log("cargo details", bookingArrayThree)
    // console.log("company", company)
    // console.log("cargo details array", cargoDetailsArray)
    // console.log("contact pick up details added to state", puDetails)
    // console.log("contact drop off details added to state", doDetails)
    // //Selected Information 
    // console.log("selected pick up", pickSelected)
    // console.log("selected drop off", dropSelected)
    // console.log("selected cargo", selectedbookingThree)
    // console.log("location one search", allPuDetails)
    // console.log("location two search", suggestionsTwo)
    //============END CONSOLE LOGS========================================================================

  return (
    <div>
        <EnterpriseNav name={company}/>
        <div className='enterprise-booking-page duration-500 ease-in-out'>
{/*==================================LOCATION ONE================================================================================================= */}
            <div className={`location-style duration-500 ease-in-out ${isPageLoaded ? 'scale-1' : 'scale-0'} ${locationTwo && "pick-padding"}`} ref={pickUpContainer}>
                <h1 className='transform transition-all duration-1000 ease-out' ref={hOne}>Location 1</h1>
                {locationtitle ? 
                    <LocationTitle>
                        <p>Choose first location contact from the list below. This is a contact that you've previously 
                            registered in your entry. Alternatively, you can opt to add a new contact by clicking 
                            the "New contact" button.
                        </p>
                        {/* <p>Create your route by nominating addresses in the expected supply chain order.</p> */}
                    </LocationTitle>
                    : <></>
                }

                {searchLocationOne ?
                    <Search>
                        <div className={!locationOneSearch ? "search-container" : "not-search-container"} >
                            <span className='search-wrapper'>
                                <input type="text" placeholder='Search' className='pick-search' onChange={e => onSearchChange(e.target.value)} value={query}  />
                                {query.length>0 ? 
                                    <div className='search-results'>
                                        {suggestions?.length > 0 ? suggestions?.filter((booking) =>
                                            keys?.some((key) => booking?.details[key].includes(query))
                                        ).map((booking) => (
                                            <div
                                                onClick={() => {
                                                    const selected = ([booking])
                                                    setDefaultPick(selected)
                                                    setPickHomeIcon(true)
                                                    setPickDefault(false)
                                                    setPickSelected([booking])
                                                    // setPuDetails(selected)
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
                                                    // console.log("Block clicked");
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
                                            // <div>hey</div>
                                        )): <></>}
                                    </div>
                                    : <></>
                                }
                                
                            </span> 
                            <button className='duration-500 ease-in-out'
                                onClick={() => {
                                    setAddLocationOne(true)
                                }}
                            ><img className='duration-500 ease-in-out' style={{width:"18px",height:"18px"}} src={ellipse} alt=""/>
                            </button>
                        </div>
                    </Search>
                    : <></>
                }
               
                <div className='pu-containing'>
                    {defaultPick?.length > 0 ? defaultPick?.filter((booking) =>
                        keys?.some((key) => booking?.details[key].includes(query))
                    ).map((booking) =>(
                        <ContactsDetails setContactDate={setContactDate} key={booking.date} >
                            <div
                                onClick={(event) => handleContactClick(event, booking)}
                                className={contactBackground ? "" : "contact-no-background"}
                            >
                                <div>
                                    <i className={!pickHomeIcon ? "fa-solid fa-house-chimney" : "fa-solid fa-house-chimney pick-house"}></i>
                                    <div> 
                                        <p>{booking.details.Name}</p>
                                        <p>{booking.details.CompanyName}</p>
                                        <p>{booking.details.Email}</p>
                                    </div>
                                </div>
                                
                                <div className='delete-contact'>
                                    {/* <p 
                                        className={!trackLocation ? "hide-location-icon" : "location-icon"} 
                                        style={{fontSize:"12px", fontWeight:"normal"}} 
                                        onClick={() => {
                                            // setReasonLocation(true)
                                            // console.log("The reason for the address",reasonLocation)
                                        }}
                                    >
                                        <i class="fa-solid fa-location-dot location-icon"></i>
                                    </p> */}
                                    
                                    {/* <Default>
                                        <span className={pickDefault ? "not-active-class" : "set-default"}>Set as default</span>
                                    </Default> */}
                                    <p className={contactDate ? "" : "hide-date"}>{booking.date}</p>
                                </div>
                            </div>
                            <p className={!changeContact ? "change-contact" : "no-change-contact"} onClick={() => {
                                // firebase.database().ref('contacts/').child(userUid).on('value', (snapshot) => {
                                //     setPuDetails(Object.values(snapshot.val()).filter((b) =>  b.pick_up_details));
                                // });
                                // setPickHomeIcon(false);
                                // setTrackLocation(false)
                                // setContactDate(true)
                                // setLocationtitle(true)
                                // setSearchLocationOne(true)
                                // setContactBackground(true)
                                // setLocationOneWrapper(false)
                                // setChangeContact(true)
                                // setNextBtn(true)
                                // pickUpContainer.current.classList.remove("contacts-unselect")
                                // setChangeContact(false)
                                setAddLocationOne(true)
                            }}><i class="fa-solid fa-pen"></i> Change</p>
                        </ContactsDetails>
                        ))
                        
                        : <div style={{height:"10px"}}></div>
                    } 
{/* 
                    {isLoading  &&
                        <EnterpriseLoader/>
                    }  */}
                     
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
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact Selected, please add second location</h1>
                            
                        </div>
                    </Alert>
                }  

                {/* ======================================Modal Popup============================================================== */}
                {
                    addLocationOne ?
                        <AddLocationOneContact
                            setBookingArray={setBookingArray}
                            businessType={businessType}
                            handleBusiness={handleBusiness}
                            residenceType={residenceType}
                            handleResidence={handleResidence}
                            closeLocationModal={closeLocationModal}
                            bookingArray={bookingArray}
                            puDetails={puDetails}
                            setPuDetails={setPuDetails}
                            setDefaultPick={setDefaultPick}
                            setPickHomeIcon={setPickHomeIcon}
                            setPickDefault={setPickDefault}
                            setPickSelected={setPickSelected}
                            // setPuDetails(selected)
                            setTrackLocation={setTrackLocation}
                            setContactDate={setContactDate}
                            setLocationtitle={setLocationtitle}
                            setSearchLocationOne={setSearchLocationOne}
                            setContactBackground={setContactBackground}
                            setLocationOneWrapper={setLocationOneWrapper}
                            setChangeContact={setChangeContact}
                            setNextBtn={setNextBtn}
                            setlocationTwo={setlocationTwo}
                            // address={address}
                            // setAddress={setAddress}
                            setAllPuDetails={setAllPuDetails}
                            allPuDetails={allPuDetails}
                        />
                    : <></>
                }
                {/* ====================================================End Modal==================================================== */}           
                {isLoading  &&
                    <EnterpriseLoader/>
                } 
            </div>
{/*==============================================END LOCATION ONE================================================================================ */}

{/*==============================LOCATION TWO==================================================================================================== */}
            {/* {locationTwo ?  */}
                <div className={`location-two duration-500 ease-in-out ${isPageLoaded ? 'scale-1' : 'scale-0'}  ${locationTwo && "pick-padding"}`}>
                    <h1 className='duration-500 ease-in-out'>Location 2</h1>
                    {locationtitleTwo ? 
                        <LocationTitle>
                            <p className='duration-500 ease-in-out'>Choose second location contact from the list below. This is a contact that you've previously 
                                registered in your entry. Alternatively, you can opt to add a new contact by clicking 
                                the "New contact" button.
                            </p>
                            {/* <p>Create your route by nominating addresses in the expected supply chain order.</p> */}
                        </LocationTitle>
                        : <></>
                    }

                    {searchLocationTwo ?
                        <Search>
                            <div className={`${!locationTwoSearch ? "search-container" : "not-search-container"} duration-500 ease-in-out`} >
                                <span className='search-wrapper duration-500 ease-in-out'>
                                    <input type="text" placeholder='Search' className='pick-search duration-500 ease-in-out' onChange={e => onSearchChangeTwo(e.target.value)} value={queryTwo}  />
                                    {queryTwo.length>0 ? 
                                    <div className='search-results'>
                                        {suggestionsTwo?.length > 0 ? suggestionsTwo?.filter((booking) =>
                                            keysTwo?.some((key) => booking?.details[key].includes(queryTwo))
                                        ).map((booking) => (
                                            <div
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
                                                    setIsLoadingTwo(true)
                                                    setTimeout(() =>{
                                                        setIsLoadingTwo(false);
                                                        closeLocationModalTwo()
                                                    }, 1000)
                                                }}
                                            >
                                                <p style={{marginTop:"5px", fontWeight:"bold", fontSize:"11.5px"}}>{booking.details.Name}</p>
                                                <p style={{marginBottom:"5px", fontSize:"10px"}}>{booking.details.CompanyName}</p>
                                                <hr />
                                            </div>
                                            // <div>hey</div>
                                        )): <></>}
                                    </div>
                                    : <></>
                                }
                                </span> 
                                <button className='duration-500 ease-in-out' onClick={() => setAddLocationTwo(true)}><img className='duration-500 ease-in-out' style={{width:"18px",height:"18px"}}  src={ellipse} alt=""/></button>
                            </div>
                        </Search>
                        : <></>
                    }
                    <div className='do-containing duration-500 ease-in-out' ref={dropOffContainer}>
                        {defaultDrop?.length > 0 ? defaultDrop?.filter((booking) =>
                            keysTwo.some((key) => booking.details[key].includes(queryTwo))
                        ).map((booking) =>(
                            <ContactsDetails setContactDate={setContactDate} key={booking.date}>
                                <div
                                    onClick={(event) => handleContactClickTwo(event, booking)}
                                    className={contactBackgroundTwo ? "" : "contact-no-background"}
                                >
                                    <div>
                                        <i className={!pickHomeIconTwo ? "fa-solid fa-house-chimney" : "fa-solid fa-house-chimney pick-house"}></i>
                                        <div> 
                                            <p>{booking.details.Name}</p>
                                            <p>{booking.details.CompanyName}</p>
                                            <p>{booking.details.Email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='delete-contact'>
                                        <p 
                                            className={!trackLocationTwo ? "hide-location-icon" : "location-icon"} 
                                            style={{fontSize:"12px", fontWeight:"normal"}} 
                                            onClick={() => {

                                            }}
                                        >
                                            {/* <i class="fa-solid fa-location-dot location-icon"></i> */}
                                        </p>
                                        
                                        <p className={contactDateTwo ? "" : "hide-date"}>{booking.date}</p>
                                    </div>
                                </div>
                                <p className={!changeContactTwo ? "change-contact" : "no-change-contact"}onClick={() => {
                                    // firebase.database().ref('contacts/').child(userUid).on('value', (snapshot) => {
                                    //     setDoDetails(Object.values(snapshot.val()).filter((b) =>  b.drop_of_details));
                                    // });
                                    // setPickHomeIconTwo(false)
                                    // setTrackLocationTwo(false)
                                    // setContactDateTwo(true)
                                    // setLocationtitleTwo(true)
                                    // setSearchLocationTwo(true)
                                    // setContactBackgroundTwo(true)
                                    // setLocationTwoWrapper(false)
                                    // setChangeContactTwo(true)
                                    // setNextBtnTwo(true)
                                    // setChangeContact()
                                    // dropOffContainer.current.classList.remove("contacts-unselect")
                                    setAddLocationTwo(true)
                                }}><i class="fa-solid fa-pen"></i> Change</p>
                            </ContactsDetails>
                            ))
                            
                            : <div style={{height:"10px"}}></div>
                        }
                         {/* {isLoading  &&
                            <EnterpriseLoader/>
                        }  */}
                    </div>

                    {openSpinnerTwo && <Spinner/>}
                    {openAlertTwo && 
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
                                onClick={() => setAlertTwo(false)}
                                >X</p>
                                <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Contact selected, please add Cargo</h1>
                            </div>
                        </Alert>
                    }

                    {/* ======================================Modal Popup============================================================== */}
                    {
                        addLocationTwo ?
                            <AddLocationTwoContact
                                setBookingArrayTwo={setBookingArrayTwo}
                                businessTypeTwo={businessTypeTwo}
                                handleBusinessTwo={handleBusinessTwo}
                                residenceTypeTwo={residenceTypeTwo}
                                handleResidenceTwo={handleResidenceTwo}
                                closeLocationModalTwo={closeLocationModalTwo}
                                bookingArrayTwo={bookingArrayTwo}
                                doDetails={doDetails}
                                setDoDetails={setDoDetails}
                                setDefaultDrop={setDefaultDrop}
                                defaultDrop={defaultDrop}
                                setPickHomeIconTwo={setPickHomeIconTwo}
                                setPickDefaultTwo={setPickDefaultTwo}
                                setTrackLocationTwo={setTrackLocationTwo}
                                setContactDateTwo={setContactDateTwo}
                                setLocationtitleTwo={setLocationtitleTwo}
                                setSearchLocationTwo={setSearchLocationTwo}
                                setContactBackgroundTwo={setContactBackgroundTwo}
                                setLocationTwoWrapper={setLocationTwoWrapper}
                                setChangeContactTwo={setChangeContactTwo}
                                setNextBtnTwo={setNextBtnTwo}
                                setCargoShow={setCargoShow}
                                setAllDuDetails={setAllDuDetails}
                                allDoDetails={allDoDetails}

                            />
                        : <></>
                    }
                    {/* ====================================================End Modal==================================================== */}
                    {isLoadingTwo  &&
                        <EnterpriseLoader/>
                    }
                </div>
                {/* : <></>
            } */}
{/*===========================================END LOCATION TWO========================================================================================== */}
            
{/*===============================================CARGO========================================================================================== */}
            {/* {cargoShow ? */}
                <div className={`cargo duration-500 ease-in-out ${isPageLoaded ? 'scale-1' : 'scale-0'}`}>
                    <h1>Cargo</h1>
                    
                    {locationtitleThree &&
                        <p>Choose the cargo you would like to transport below.</p>
                    } 
                    {searchLocationThree ?
                        <Search>
                            <div className={!locationTwoSearch ? "search-container" : "not-search-container"} >
                                <span className='search-wrapper'>
                                    <input type="text" placeholder='Search' className='pick-search' onChange={e => onSearchChangeThree(e.target.value)} value={queryThree}  />
                                    {/* <img src={searchIcon} alt="" /> */}
                                </span> 
                                <button className='duration-500 ease-in-out' onClick={() => setOpenCargoModal(true)}><i class="fa-sharp fa-solid fa-square-plus"></i></button>
                            </div>
                        </Search>
                        : <></>
                    }
                    
                    <div className='cargo-container'>
                    {locationtitleThree &&
                        <p style={{fontSize:"12px", marginBottom:"14px", marginTop:"10px"}}>Please select products that are suitable to be in the same vehicle together.</p>
                    } 
                    </div> 
                    <div className='cargo-next'>
                    </div>
                    <div className='cargo-wrapper'>
                        {defaultCargo?.length > 0 ? defaultCargo?.filter((cargo) =>
                            keysThree.some((key) => cargo.details[key].includes(queryThree))
                        ).map((cargo, i) =>{
                            const weightTon = parseFloat(cargo.details.weight)/1000
                            return(
                            <React.Fragment key={i}>
                                    <div className='pill-container duration-500 ease-in-out'>
                                        <div className='box-icon'>
                                            <span><i class="fa-solid fa-cube"></i></span>
                                        </div>
                                        <div className='cargo-for'>
                                            <h1>{cargo.details.productName}</h1>
                                            <p>USK: {cargo.details.productCode}</p>
                                            <p>Package: {cargo.details.packageType}</p>
                                            <p>Dimensions: {weightTon.toFixed(3)}t - {((cargo.details.lengthValue *
                                                cargo.details.breadth *
                                                cargo.details.height)/1000000).toFixed(5)

                                            }&#x33a5;</p>
                                            {/* <p onClick={openModalFour}>Read more</p> */}
                                        </div>
                                        <div>
                                            <h1>QTY :</h1>
                                            <input type="text" className='cargo-quantity' onChange={(e) => {
                                                const selectedCargoDetails = JSON.parse(localStorage.getItem("cargoSelectd"))
                                                console.log("quantity array", selectedCargoDetails)
                                                selectedCargoDetails.details.quantity = e.target.value
                                                console.log("edited quantity", selectedCargoDetails);
                                                localStorage.setItem("cargoSelectd", JSON.stringify(selectedCargoDetails));
                                            }}/>
                                        </div>
                                    </div>
                            </React.Fragment>
                            )})
                            : <div style={{height:"10px"}}></div>

                        }
                         {isLoading  &&
                            <EnterpriseLoader/>
                        } 
                        {/* {!searchLocationThree &&
                            <p className={!changeContactTwo ? "change-contact" : "no-change-contact"}onClick={() => {
                                firebase.database().ref('cargo_details/').child(userUid).on('value', (snapshot) => {
                                    setBookingArrayThree(Object.values(snapshot.val()).filter((b) =>  b.drop_of_details));
                                });
                                setSearchLocationThree(true)
                                setLocationtitleThree(true)
                            }}><i class="fa-solid fa-pen"></i> Change</p>
                        } */}
                    </div>

                    {openCargoModal?
                        <AddCargo
                            setOpenCargoModal={setOpenCargoModal}
                            cargoDetails={cargoDetails}
                            setCargoDetails={setCargoDetails}
                            setFileUrl={setFileUrl}
                            fileUrl={fileUrl}
                            bookingArrayThree={bookingArrayThree}
                            setBookingArrayThree={setBookingArrayThree}
                            defaultCargo={defaultCargo}
                            setDefaultCargo={setDefaultCargo}
                            setSearchLocationThree={setSearchLocationThree}
                            setLocationtitleThree={setLocationtitleThree}
                            setSelectedBookingThree={setSelectedBookingThree}
                        />
                        : <></>
                    }
                </div>
                {/* : <></>
            } */}
{/*================================================END CARGO============================================================================================== */}
        
{/* ===================================================VEHICLE================================================================================================== */}
            {/* {vehicleShow ? */}
                <div style={{marginBottom:"25px"}} className={`duration-500 ease-in-out ${isPageLoaded ? 'scale-1' : 'scale-0'}`}>
                    <h2>Vehicle</h2>
                    <p>Choose a vehicle to transport your goods</p>
                    <p>Distribution (0 - 3.5 Tons)</p>
    {/* ============================================================================================================================================== */}
                    
                    <p style={{marginTop:"10px"}}>Long Haul  (34 Tons)</p>

                    <div className='distribution-vehicle'>
                        <div>
                            <div onClick={openPreModal}>
                                <img src={carCarrier} alt="" />
                            </div>
                            <div>
                                <h2>Car Carrier</h2>
                                <p style={{
                                        fontSize: "10px",
                                        fontStyle: "italic",
                                        color: "grey"
                                    }}>Recommended</p>
                            </div>
                        </div>

                        <div>
                            <div onClick={openPreModalTwo}>
                                <img src={container} alt="" />
                            </div>
                            <div>
                                <h2>Container</h2>
                            </div>
                        </div>

                        <div>
                            <div onClick={openPreModalThree}>
                                <img src={refrigerated} alt="" />
                            </div>
                            <div>
                                <h2>Refrigerated</h2>
                            </div>
                        </div>

                        <div>
                            <div onClick={openPreModalFour}>
                                <img src={tanker} alt="" />
                            </div>
                            <div>
                                <h2>Tanker</h2>
                            </div>
                        </div>

                        <div>
                            <div onClick={openPreModalFive}>
                                <img src={tautliner} alt="" />
                            </div>
                            <div>
                                <h2>Tautliner</h2>
                            </div>
                        </div>
                    </div>

                    <p style={{marginTop:"10px"}}>Abnormal (34+ Tons)</p>

                    <div className='distribution-vehicle'>
                        <div>
                            <div onClick={openPreModalSix}>
                                <img src={abnormal} alt="" />
                            </div>
                            <div>
                                <h2>Abnormal</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {/* : <></>
            } */}
{/* =======================================================END VEHICLE================================================================================================ */}

        </div>

        {/* Vehicle modals */}
        <Prerequisites openPre={openPre} setOpenPre={setOpenPre} addLocationOne={addLocationOne}/>
        {openPreTwo &&
            <PrerequisitesTwo openPre={openPreTwo} setOpenPreTwo={setOpenPreTwo}/>
        }

         {openPreThree &&
            <PrerequisitesThreee openPreThree={openPreThree} setOpenPreThree={setOpenPreThree}/>
        }

        {openPreFour &&
            <PrerequisitesFour openPreFour={openPreFour} setOpenPreFour={setOpenPreFour} />
        }
        {openPreFive &&
            <PrerequisitesFive openPreFive={openPreFive} setOpenPreFive={setOpenPreFive} />
        }
        {openPreSix &&
            <PrerequisitesSix openPreSix={openPreSix} setOpenPreSix={setOpenPreSix} />
        }
        
    </div>
  )
}

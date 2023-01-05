import React, { useState, useEffect, useRef } from 'react'
import '../../css/addContacts.css'
import {Avatar} from '@mui/material';
import '../../css/cargo.css';
import firebase from '../../firebase-config'
import Spinner from '../Spinner';
import Alert from '../Alerts/Alert';
import LoginAlert from '../Alerts/LoginAlert';
import Loader from '../../components/loader/Loader'

export default function Cargo({
        setOpenCargoModal,
        cargoDetails,
        setCargoDetails,
        fileUrl,
        setFileUrl,
        bookingArrayThree,
        setBookingArrayThree,
        defaultCargo,
        setDefaultCargo,
        setSearchLocationThree,
        setLocationtitleThree,
        setSelectedBookingThree,
        alertQuantity, 
        setAlertQuantity
    }) {

    const iconName = ("Jane").substring(0,2);
    const [fileUpload, setFileUpload] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [openAlert, setAlert] = useState(false)
    const [openAlertTwo, setAlertTwo] = useState(false)
    const [userUid, setUserUid] = useState("");
    const [isCargo, setIsCargo] = useState(false);
    const [openAlertFinal, setOpenAlertFinal] = useState(false);
    const [openSdsAlert, setOpenSdsAlert] = useState(false);
    const [checked, setChecked] = useState(false); 
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const [lengthTrue, setLengthTrue] = useState(false);
    const [breadthTrue, setBreadthTrue] = useState(false);
    const [weightTrue, setWeightTrue] = useState(false);
    const [heightTrue, setHeightTrue] = useState(false);
    const [selectHazardous, setselectHazardous] = useState(false);
    const [queryThree, setQueryThree] = useState("");
    const keysThree = ["productName", "productCode"];
    const [suggestionsThree, setSuggestionsThree] = useState([])
    const [isLoading , setIsLoading] = useState(false);
    const lengthRef = useRef();
    const volumeRef = useRef();
    const heightRef = useRef();
    const breadthRef = useRef();

    //=========STATES ARRAY=========================================================================
    //=========END STATE ARRAY======================================================================

    //========CONSOLE LOGS==========================================================================
        console.log("file upload", fileUpload);
        console.log("file url", fileUrl);
        console.log("cargoDetails", cargoDetails)
        console.log("book array three", bookingArrayThree)

    //========END CONSOLE LOGS======================================================================
    
    //==========FUNCTIONS===========================================================================
        const setLengthTrueFnc = (event)=>{
            setLengthTrue(true);
            setCargoDetails((prevState) => ({
                ...prevState,
                cargoDetails:{
                    ...prevState.cargoDetails,
                    lengthValue:event.target.value
                } 
            }))
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

        const setBreadthTrueFnc = (event)=>{
            setBreadthTrue(true);
            setCargoDetails((prevState) => ({
                ...prevState,
                cargoDetails:{
                    ...prevState.cargoDetails,
                    breadth:event.target.value
                } 
                }))
        }

        const setWeightTrueFnc = (event)=>{
            setWeightTrue(true);
            setCargoDetails((prevState) => ({
                ...prevState,
                cargoDetails:{
                    ...prevState.cargoDetails,
                    weight:event.target.value
                } 
            }))
        }

        const setHeightTrueFnc = (event)=>{
            setHeightTrue(true);
            setCargoDetails((prevState) => ({
                ...prevState,
                cargoDetails:{
                    ...prevState.cargoDetails,
                    height:event.target.value
                } 
            }))
        }

       const handleUpload = (e) => {
            e.preventDefault()
            const storage = firebase.storage()
            if(fileUpload === null) return
            const fileRef = storage.ref(`sds-file/${fileUpload.name}`)
            fileRef.put(fileUpload).then((snapshot) => {
                const fileUrl = fileRef.getDownloadURL()
                .then((url) => {                
                    setFileUrl(url)
                })
                  .catch((error) => {
                    // Handle any errors
                  });
              });
            setOpenSdsAlert(true) 
            setTimeout(() =>{
                setOpenSdsAlert(false)  
            }, 2000);
        }

        const handleChangeFragile = () => { 
            setChecked(!checked);
            console.log(checked);
            if(checked){
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        fragile:"false"
                    } 
                }));
                console.log('false me');
            }else{
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        fragile:"true"
                    } 
                }));
                console.log('true me');
            }
        };

        const handleChangeHazard = () => { 
            setCheckedThree(!checkedThree);
            console.log(checkedThree);
            if(checkedThree){
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        hazard:{
                            ...prevState.cargoDetails.hazard, 
                            hazard_rating:"none"
                        }
                    } 
                }));
                console.log('true me');
                setselectHazardous(true);
            }else{
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        hazard:{
                            ...prevState.cargoDetails?.hazard, 
                            hazard_rating:"Hazardous"
                        }
                    } 
                }));
                setselectHazardous(false);
                // console.log("false me");
            }
        };

        const handleChangeTemparature = () => { 
            setCheckedTwo(!checkedTwo);
            // console.log(checkedTwo);
            if(checkedTwo){
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        temperature_controlled:"false"
                    } 
                }));
            }else{
                setCargoDetails((prevState) => ({
                    ...prevState,
                    cargoDetails:{
                        ...prevState.cargoDetails,
                        // cargoCondition:e.target.value
                        temperature_controlled:"true"
                    } 
                }));
            }
        };

        const saveCargoContactFnc = async ()=>{
            return  await firebase.database().ref().push()
        }

        const HandleSaveCargo = () =>{
            var contact_Uid
            if(cargoDetails.cargoDetails.lengthValue &&
                cargoDetails.cargoDetails.breadth &&
                cargoDetails.cargoDetails.weight &&
                cargoDetails.cargoDetails.height !== undefined){
                // console.log("the file url",fileUrl)
                const cargo_details = cargoDetails.cargoDetails
                saveCargoContactFnc().then((data ) => {
                    contact_Uid = data.key
                    firebase.database().ref('/booking_party/' + userUid).child("cargo_details").push({
                        details: cargo_details,
                        date: new Date().toISOString().substring(0,10),
                        sds_url: fileUrl
                    });
                    console.log("cargo_details", cargoDetails);
                    console.log("contact_Uid", contact_Uid);
                });
                // setOpenCargoModal(false)
            }else{
                setOpenAlertFinal(true);
            }
        }
        
        
    //==========END FUNCTIONS=======================================================================


    //=========USE EFFECTS==========================================================================
        // useEffect(() => {
        //     setCargoDetails((prevState) => ({
        //         ...prevState,
        //         cargoDetails:{
        //             ...prevState.cargoDetails,
        //             sdsFileUrl:fileUrl
        //         } 
        //     }))
        // }, [])
        
        
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
                setIsCargo(true);
            }, 300)
        }, [])

        // useEffect(() => {
        //     if(lengthTrue === true){
        //         volumeRef.current.disabled = false;
        //     }   
        // }, [])
        
        
    //===========END USE EFFECFS====================================================================

  return (
    <div className={`modal-container duration-500 ease-in-out ${isCargo ? 'opacity-1' : 'opacity-0'}`}>
        <div className={`modal duration-500 ease-in-out cargo-modal-wrap ${isCargo ? 'animate-addcontact-one' : 'modal'}`} style={{ margin:"9rem 0"}}>
            <div className='cargo-modal'>
                <h1>New Product</h1>  
                <p>Add a new package by adding its information</p>
                <div>
                    <input 
                        type="text" 
                        placeholder='Product Name' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                productName:e.target.value
                            } 
                            }))
                        }
                    />
                    <input 
                        type="text" 
                        placeholder='Product Number' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                productCode:e.target.value
                            } 
                            }))
                        }
                    />
                </div>
                <select name="" id=""
                     onChange={e =>setCargoDetails((prevState) => ({
                        ...prevState,
                        cargoDetails:{
                            ...prevState.cargoDetails,
                            category:e.target.value
                        } 
                        }))
                    }
                >
                    <option value="">Category</option>
                    <option value="Sand">Sand</option>
                    <option value="Bricks">Bricks</option>
                    <option value="paper">Paper</option>
                </select>
                <div className='horizontal-line'>
                    <hr />
                </div>
                <p style={{marginTop:'10px'}}>Packaging</p>
                <div>
                    <select name="" id=""
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                packageType:e.target.value
                            } 
                            }))
                        }
                    >
                        <option value="">Package type</option>
                        <option value="pallet">Pallet</option>
                        <option value="box">Box</option>
                        <option value="crate">Crate</option>
                        <option value="carton">Carton</option>
                        <option value="case">Case</option>
                        <option value="drum">Drum</option>
                        <option value="bucket">Bucket</option>
                        <option value="bag">Bag</option>
                        <option value="shrinkwrap">Shrinkwrap</option>
                    </select>
                    <input 
                        ref={lengthRef}
                        type="text" 
                        placeholder='Length (cm)' 
                        onChange={(e) =>{setLengthTrueFnc(e)}}
                        value={cargoDetails?.lengthValue}
                    />
                </div>

                <div>
                    <input 
                        ref={volumeRef}
                        type="text"     
                        placeholder='Volume (m)'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                volume:e.target.value
                            } 
                            }))
                        }
                        // disabled = {lengthTrue || breadthTrue || weightTrue || heightTrue ? "disabled" : ""}
                    />
                    <input 
                        ref={breadthRef}
                        type="text" 
                        placeholder='Breadth (cm)' 
                        onChange={(e) => {setBreadthTrueFnc(e)}}
                    />
                </div>

                <div style={{marginBottom:"10px"}}>
                    <input 
                        type="text" 
                        placeholder='Weight'
                        onChange={(e) =>{setWeightTrueFnc(e)}}
                    />
                    <input 
                        ref={heightRef}
                        type="text" 
                        placeholder='Height (cm)' 
                        onChange={(e) =>{setHeightTrueFnc(e)}}
                    />
                </div>
                <div className='horizontal-line'>
                    <hr />
                </div>
                <p>Additional Information</p>
                <div>
                    <input type="text" placeholder='Job Type' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                job_type:e.target.value
                            } 
                            }))
                        }
                    />
                      <input type="text" placeholder='HS Code' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                hs_code:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <div>
                    <input type="text" placeholder='Crane Truck' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                crane_truck:e.target.value
                            } 
                            }))
                        }
                    />
                      <input type="text" placeholder='Container Loading' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                container_loading:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <div>
                    <input type="text" placeholder='Load time' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                load_time:e.target.value
                            } 
                            }))
                        }
                    />
                      <input type="text" placeholder='Offload time' 
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                off_load_time:e.target.value
                            } 
                            }))
                        }
                    />
                </div>

                <p style={{marginTop:"15px"}}>Verified Gross Mass</p>
                <div style={{display:"flex", justifyContent:"start", fontSize:"12px", marginBottom:"10px"}}>
                    <label htmlFor="">
                        <input type="radio"  name='grossMass'
                            onClick={e =>setCargoDetails((prevState) => ({
                                    ...prevState,
                                    cargoDetails:{
                                        ...prevState.cargoDetails,
                                        verified_gross_mass: e.target.value
                                    } 
                                }))
                            }
                        value="True"
                        />
                        True
                    </label>
                    <label htmlFor="">
                        <input type="radio" name='grossMass'
                            onClick={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    verified_gross_mass: e.target.value
                                } 
                            }))
                        }
                        value="False"
                        />
                        False
                    </label>
                </div>
           
                <label htmlFor="">
                    <input type="checkbox" 
                        value="Fragile"
                        onChange={handleChangeFragile}
                        checked={checked}
                    />
                    Fragile
                </label>
                <label htmlFor="">
                    <input type="checkbox" 
                       onChange={handleChangeTemparature}
                        value="Temperature controlled"
                    />
                    Temperature Controlled (C)
                </label>
                <div className='max-min'>
                    <input 
                        type="text" 
                        placeholder='Min'
                        disabled = {!checkedTwo ? "disabled" : ""}
                        className={`${!checkedTwo && "disabled:opacity-25"}`}
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                // cargoCondition:e.target.value
                                hazard:{
                                    ...prevState.cargoDetails.hazard, 
                                    min_temp:e.target.value
                                }
                            } 
                        }))
                    }
                    />
                    <input 
                        type="text" 
                        placeholder='Max'
                        disabled = {!checkedTwo ? "disabled" : ""}
                        className={`${!checkedTwo && "disabled:opacity-25"}`}
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    // cargoCondition:e.target.value
                                    hazard:{
                                        ...prevState.cargoDetails.hazard, 
                                        max_temp:e.target.value
                                    }
                                } 
                            }))
                        }
                    />
                </div>
                <label htmlFor="">
                    <input 
                        type="checkbox" 
                        onChange={handleChangeHazard}
                    />
                    Hazardous
                </label>
                <input type="text" placeholder='IMDG Number' 
                    disabled = {!checkedThree ? "disabled" : ""}
                    className={`${!checkedThree && "disabled:opacity-25"}`}
                    onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                // cargoCondition:e.target.value
                                hazard:{
                                    ...prevState.cargoDetails.hazard, 
                                    IMDG_number:e.target.value
                                }
                            }
                        }))
                    }
                />
                <div className='un-number'>
                    <input 
                        disabled = {!checkedThree ? "disabled" : ""}
                        className={`${!checkedThree && "disabled:opacity-25"}`}
                        type="text" 
                        placeholder='IMO Class'
                        onChange={e =>setCargoDetails((prevState) => ({
                                ...prevState,
                                cargoDetails:{
                                    ...prevState.cargoDetails,
                                    imoClass:e.target.value
                                } 
                            }))
                        }
                    />
                    <input 
                        disabled = {!checkedThree ? "disabled" : ""}
                        className={`${!checkedThree && "disabled:opacity-25"}`}
                        type="text" 
                        placeholder='UN Number'
                        onChange={e =>setCargoDetails((prevState) => ({
                            ...prevState,
                            cargoDetails:{
                                ...prevState.cargoDetails,
                                unNumber:e.target.value
                            } 
                        }))
                    }
                    />
                    <label htmlFor="file" className={`upload-file-label ${!checkedThree && "opacity-upload"}`}
                        disabled = {selectHazardous ? "disabled" : ""}
                    >
                        <input type="file" id='file' accept='image/*' 
                            disabled = {!checkedThree ? "disabled" : ""}
                            className={`${!checkedThree && "disabled:opacity-25"}`}
                            onChange={(e) => {setFileUpload(e.target.files[0])}}
                            // onClick={handleUpload}
                        />
                        <i className={`fa-solid fa-upload ${!checkedThree && "disabled:opacity-25"}`}></i>
                        upload SDS
                        <button style={{
                            border:"none",
                            background:"yellow",
                            borderRadius:"100%",
                            marginLeft:"10px",
                            cursor:"pointer",
                            height:"20px",
                            width:"20px"
                        }}
                        onClick={handleUpload}
                        disabled = {checkedThree ? "disabled" : ""}
                        className={`${checkedThree && "disabled:opacity-25"}`}
                        >+</button>
                    </label>
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
                                <h1 style={{fontSize:"14px", fontWeight:"normal"}}>File upload complete</h1>
                            </div>
                        </Alert> 
                    }
                    {/* {
                        !fileUpload &&
                        <div className='outerbar'>
                        <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                        </div>
                    } */}
                </div>
                <div className='cancel-add-btn' style={{width:"100%", margin:"unset",dispplay:"flex", justifyContent:"end"}}>
                    {/* <button onClick={() => setOpenCargoModal(false)}>Cancel</button> */}
                    <button onClick={HandleSaveCargo} style={{background:"#f9dd07", boxShadow:"none"}}>Add cargo</button>
                </div>
            </div> 
            <div className="left-cargo-secti">
                <h2 style={{marginBottom:"17px"}}>Cargos</h2>
                {bookingArrayThree?.length > 0 ? bookingArrayThree?.filter((booking) =>
                            keysThree?.some((key) => booking?.details[key].includes(queryThree))
                        ).map((cargo) =>(
                    <React.Fragment key={cargo.date}>
                        <div className='contact-wrapper'
                            onClick={() => {
                                const cargselected = ([cargo])
                                setSearchLocationThree(false)
                                setLocationtitleThree(false)
                                setBookingArrayThree(cargselected)
                                setSelectedBookingThree(cargselected)
                                setDefaultCargo(cargselected)
                                setIsLoading(true)

                                setTimeout(() =>{
                                    setIsLoading(false);
                                    setOpenCargoModal(false)
                                }, 1000)

                                localStorage.setItem("cargoSelectd", JSON.stringify(cargo));

                                if(localStorage.getItem("cargoSelectd")){
                                    const selectedCargoDetails = JSON.parse(localStorage.getItem("cargoSelectd"))
                                    if(!selectedCargoDetails.details.quantity){
                                        setAlertQuantity(true);
                                    }
                                }

                            }}
                        >
                            <div className='box-icon'>
                                <span><i class="fa-solid fa-cube"></i></span>
                            </div>                        
                            <div className='cargo-right-font'>
                                <p>{cargo.details.productName}</p>
                                <p>USK: {cargo.details.productCode}</p>
                                <p>Package: {cargo.details.packageType}</p>
                                <p>Dimensions: {(parseFloat(cargo.details.weight)/1000).toFixed(3)}t - {((cargo.details.lengthValue *
                                    cargo.details.breadth *
                                    cargo.details.height)/1000000).toFixed(5)
                                }&#x33a5;</p>
                            </div>
                        </div>
                    </React.Fragment>
                ))
                
                : <div className='no-contacts'>
                    <p>
                        You currently don't have any cargo. Fill in the cargo details here.
                    </p>
                    <div>
                        <i class="fa-solid fa-arrow-trend-down"></i>
                    </div>
                </div>
                }
                <div className='cancel-add-btn' style={{width:"100%", margin:"unset", position:"absolute",bottom:0}}>
                    <button onClick={() => setOpenCargoModal(false)}>Cancel</button>
                    <button onClick={() => setOpenCargoModal(false)}>Save</button>
                </div>   
                 
            </div>
           
        </div>
       
        {openSpinner && <Spinner/>}
            {openSdsAlert &&
                <div className='login-alert cargo-alertt'>
                    <p>SDS uploaded sucessfully.</p>
                </div>
            }
            {openAlertFinal &&
                <div className='login-alert cargo-alertt'>
                    <p>It is important that you provide the dimentions of the cargo &#40;height, weight, breadth, length&#41;</p>
                    <button className='alert-btnn' onClick={() => {setOpenAlertFinal(false)} }>Ok</button>
                </div>
            }
            {isLoading  &&
                <Loader/>
            }
    </div>

    
  )
}

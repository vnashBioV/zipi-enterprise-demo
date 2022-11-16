import React, {useState, useEffect} from 'react'
import EnterpriseNav from './EnterpriseNav'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import Alert from '../components/Alerts/Alert';

export default function Summary({
    // vehicleType,
    openPreTwo, 
    setOpenPreTwo
}) {
    const [vehicleEquipment, setVehicleEquipment] = useState([]);
    const [adHocServices, setAdHocServices] = useState([]);
    const [documentation, setDocumentation] = useState([]);
    const [personalProtective, setPersonalProtective] = useState([]);
    const [goodsInTransit, setGoodsInTransit] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [openSpinner, setOpenSpinner] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [close, setclose] =useState(false);
    const [vehicleType, setVehicleType] = useState(["Container"])
    const navigate = useNavigate();


    console.log(vehicleEquipment);
    console.log(adHocServices);
    console.log(documentation);
    console.log(personalProtective);
    console.log(goodsInTransit);
    console.log(prerequisites);

    const handleContinue = () =>{
        setPrerequisites({
            vehicleEquipment:vehicleEquipment,
            adHocServices:adHocServices,
            documentation:documentation,
            personalProtective:personalProtective,
            goodsInTransit:goodsInTransit,
            prerequisites:prerequisites,
            vehicle_type:vehicleType
        })

        const selectPrerequis = [{prerequisites:{
                    vehicle_equipment:vehicleEquipment,
                    ad_hoc_services:adHocServices,
                    documentation:documentation,
                    personal_protective:personalProtective,
                    goods_in_transit:goodsInTransit,
                    vehicle_type:vehicleType
                },
                date:new Date()
        }]

        localStorage.setItem("Prerequisites", JSON.stringify(selectPrerequis));
        setOpenSpinner(true)
        setTimeout(() => {
            setOpenSpinner(false)
        },1000)
        navigate('/schedule')
    }

    // const closeModal = () => {
    //     setOpenPreTwo(prev => !prev)
    // }

    useEffect(() => {
        localStorage.setItem("vehicleType", JSON.stringify(vehicleType));
}, [])

  return (
    <div className='summary'>
      <div className='modal-summary'>
        <h3 className='container-prerequiz'>Container Prerequisites</h3>
        <div className="summary-wrapper">
            <div>
                <div>
                    <p className='summary-title'>Ad-hoc Services Required</p>
                </div>
                <div>
                    <p className='summary-title'>Documentation</p>
                </div>
                <div>
                    <p className='summary-title'>Personal Protective Equipment</p>
                </div>
                <div>
                    <p className='summary-title'>Vehicle Equipment</p>
                </div>
                <div>
                    <p className='summary-title'>Insurance (Goods in Transit)</p>
                </div>
            </div>
            <div>
                <div style={{height:"70px"}}>
                    <div>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }} >Solas / Verified Gross Mass</p>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Storage</p>
                        <p onClick={(e) => {
                           setAdHocServices([...adHocServices, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Crane truck (Load/Offload Container)</p>
                    </div>
                    <div>
                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} value="Rear Mount Container" onChange={(e) => {
                            setAdHocServices([...adHocServices, e.target.value])
                                e.target.style.background="#ffe201"
                            }}/>
                            Rear Mount Container
                        </label>
                    </div>
                </div>

                <div>
                    <div>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>ID/Passport</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Driver's License</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Public Driving Permit</p>
                        <p onClick={(e) => {
                           setDocumentation([...documentation, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Medical Certificate</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Safety Hat</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Safety Goggles</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Reflector Jacket</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Full Overall</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Ear Plugs</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Dust Mask</p>
                        <p onClick={(e) => {
                           setPersonalProtective([...personalProtective, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}>Genset</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p onClick={(e) => {
                           setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                                e.target.style.background="#ffe201"
                            }}                        
                        >2 Stop Blocks</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Reverse Hooter</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>9kg Fire Extinguiser</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Beacon Light</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Dunnage</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Straps</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Tarpaulin</p>
                        <p onClick={(e) => {
                            setVehicleEquipment([...vehicleEquipment, e.target.textContent])
                            e.target.style.background="#ffe201"
                        }}>Chains</p>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} name="goods" value="350000" onChange={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                            R350 000
                        </label>

                        <label htmlFor="Rear Mount Container" className='summary-label'>
                            <input type="radio" style={{marginRight:"10px"}} name="goods" value="500000" onChange={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                            R500 000
                        </label>
                        <input type="text" placeholder='Other' className='other' onChange={(e) => {
                            setGoodsInTransit(parseInt(e.target.value))
                            e.target.style.background="#ffe201"
                        }}/>
                    </div>
                </div>
                    {/* {openSpinner && <Alert >
                        <div style={{width:"256px"}}>
                            <p style={{
                                position:"absolute",
                                right:"0px",
                                top:"0px",
                                padding:"7px",
                                cursor:"pointer",
                                fontWeight:"bold"
                            }}
                            onClick={() => setOpenAlert(false)}
                            >X</p>
                            <h1 style={{fontSize:"14px", fontWeight:"normal"}}>Prerequisites successfully added</h1>
                            
                        </div>
                    </Alert>} */}
            </div>
        </div>
        <div className='continue-btn-container' style={{width:"100%"}}>
        <button style={{marginRight:"10px", padding:"3px 19px", borderRadius:"10px", boxShadow:"0px 0px 2px 0px", fontSize:"13.5px"}} onClick={() => setOpenPreTwo(false)}>Cancel</button>
            <button 
                className='summary-one-close' 
                onClick={handleContinue}
            >
                Continue &nbsp; <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div> 
      </div> 
    </div>
  )
}

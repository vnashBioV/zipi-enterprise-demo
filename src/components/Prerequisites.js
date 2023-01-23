import React, {useState, useEffect} from 'react'
import EnterpriseNav from './EnterpriseNav'
import { useParams, Link, useNavigate  } from 'react-router-dom'
import '../css/prerequisites.css'
import { useStateContext } from '../context/DashboardStateContext'

export default function Summary({
    // vehicleType,
    openPre, 
    setOpenPre,
    alertQuantity,
    setAlertQuantity,
}) {
    const {id} = useParams();
    const [vehicleEquipmentArray, setVehicleEquipment] = useState([])
    const [adHocServices, setAdHocServices] = useState([]);
    const [documentation, setDocumentation] = useState([]);
    const [personalProtective, setPersonalProtective] = useState([]);
    const [goodsInTransit, setGoodsInTransit] = useState();
    const [prerequisites, setPrerequisites] = useState([]);
    const [vehicleType, setVehicleType] = useState(["Car Carrier"])
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadedPage, setIsLoadedPage] = useState(false);
    const navigate = useNavigate();
    const { 
        isEnterprise,
        setIsEnterprise,
        isTracking,
        setIsTracking,
        isShowSchedule,
        setIsShowSchedule,
        setIsShowRequest,
        isShowRequest,
        setCargoLink,
        cargoLink
      } = useStateContext();

    const vehicleEquipment = (e) => {
        setVehicleEquipment([...vehicleEquipmentArray, e.target.textContent])
        e.target.style.background="#ffe201"
    }
    const goodsInTransitFnc =(e)=>{
        setGoodsInTransit(parseFloat(e.target.value))
    }
    console.log("vehicleEquipmentArray", vehicleEquipmentArray);
    console.log("goods In Transit", goodsInTransit);

    const handleContinue = ()=>{
        if(localStorage.getItem("cargoSelectd")){
            const selectedCargoDetails = JSON.parse(localStorage.getItem("cargoSelectd"))
            if(!selectedCargoDetails.details.quantity){
                setAlertQuantity(true);
                setOpenPre(false);
            }else{
                setPrerequisites({
                    prerequisites:{
                        vehicle_equipment:vehicleEquipmentArray,
                        goods_in_transit:goodsInTransit,
                        vehicle_type:vehicleType
                    }
                })
                const selectPrerequis = [{prerequisites:{
                    vehicle_equipment:vehicleEquipmentArray,
                    ad_hoc_services:["Not selected"],
                    documentation:["Not selected"],
                    personal_protective:["Not selected"],
                    goods_in_transit:goodsInTransit,
                    vehicle_type:vehicleType
                },
                date:new Date()
                }]

                setOpenPre(prev => !prev)
                localStorage.setItem("Prerequisites", JSON.stringify(selectPrerequis));
                setIsShowSchedule(true);
                setIsTracking(false);
                setIsEnterprise(false);
                setCargoLink(false);
                setIsShowRequest(false);
            }
        }
    }

    // const handleContinue = () => {
    //     setOpenPre(prev => !prev)
    // }

    console.log("vehicle prerequisites", prerequisites)
    useEffect(() => {
            localStorage.setItem("vehicleType", JSON.stringify(vehicleType));
    }, [])

    useEffect(() => {
        setTimeout(() =>{
            setIsLoadedPage(true);
        }, 600)
        console.log("Prerequisites open", isLoadedPage);
    }, [])
    
    

  return (
    <>{ openPre ? 
            (<div className={`modal-container duration-500 ease-in-out ${setIsLoadedPage ? 'opacity-1' : 'opacity-0'}`}>
                <div className={`duration-500 ease-in-out ${setIsLoadedPage ? 'animate-addcontact-one' : 'modal'}`} style={{width:"34%"}}>
                    <h3 className='container-prerequiz'>Car Carrier Prerequisites</h3>
                    <div className="summary-wrapper">
                        <div>
                            <div>
                                <p className='summary-title'>Vehicle Equipment</p>
                            </div>
                            <div>
                                <p className='summary-title'>Insurance (Goods in Transit)</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <p onClick={vehicleEquipment}>Dunnage</p>
                                    <p onClick={vehicleEquipment}>Straps</p>
                                    <p onClick={vehicleEquipment}>Tarpaulin</p>
                                    <p onClick={vehicleEquipment}>Chains</p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label htmlFor="Rear Mount Container" className='summary-label'>
                                        <input value="350000" name='transit' type="radio" style={{marginRight:"10px"}} onClick={goodsInTransitFnc} />
                                        R350 000
                                    </label>

                                    <label htmlFor="Rear Mount Container" className='summary-label'>
                                        <input value="500000" name='transit' type="radio" style={{marginRight:"10px"}} onClick={goodsInTransitFnc}/>
                                        R500 000
                                    </label>
                                    <input onChange={goodsInTransitFnc}type="text" placeholder='Other' className='other' style={{marginTop:"23px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='continue-btn-container' style={{width:"100%"}}>
                        <button style={{marginRight:"10px", padding:"3px 19px", borderRadius:"10px", boxShadow:"0px 0px 2px 0px", fontSize:"13.5px"}} onClick={() => setOpenPre(false)}>Cancel</button>
                        <button 
                            className='summary-one-close' 
                            onClick={handleContinue}
                        >
                            Continue &nbsp; <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div> 
            </div>)
        : null}
    </>
  )
}

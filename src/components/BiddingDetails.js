import { border } from '@mui/system';
import React, {useState, useEffect} from 'react'
import '../css/biddingDetails.css'

export default function BiddingDetails({
    openDetails, 
    setOpenDetails
}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("selectedItemBidding")){
            const storedList = JSON.parse(localStorage.getItem("selectedItemBidding"))
            setData([storedList]);
        }
      }, []) 

      console.log("This is the data", data)

  return (
    <>{ openDetails ? (
        <div className='modal-container'>
            <div className='modal' style={{width: "702px", maxHeight:"668px", overflow:"scroll"}}>
                <div className='title-summary-head'>
                    <h1>Summary</h1>
                    <p style={{cursor:"pointer", fontWeight:"bold", fontSize:"20px"}} onClick={() => setOpenDetails((prev) => !prev)}>X</p>
                </div>
                <div className='summary-wrap'>
                    <div>
                        <div style={{height:"64px"}}>
                            <p style={{color:"grey"}}>Empty Depot</p>
                        </div>

                        <div style={{height:"64px"}}>
                            <p style={{color:"grey"}}>Load Cargo</p>
                        </div>

                        <div style={{height:"64px"}}>
                            <p style={{color:"grey"}}>Staging Area</p>
                        </div>

                        <div style={{height:"64px"}}>
                            <p style={{color:"grey"}}>Offload Cargo</p>
                        </div>

                        <div style={{height:"332px", marginTop:"24px"}}>
                            <p style={{color:"grey"}}>Cargo</p>
                        </div>

                        <div style={{height:"236px", marginTop:"24px"}}>
                            <p style={{color:"grey"}}>prerequisites</p>
                        </div>

                        <div style={{height:"64px", marginTop:"24px"}}>
                            <p style={{color:"grey"}}>Schedule</p>
                        </div>
                    </div>


                    <div>

                        <div style={{height:"64px"}} className="left-border-sum the-first">
                            <p>Not selected</p>
                        </div>

                        <div style={{height:"64px"}} className="left-border-sum the-second">
                            {data.length > 0 ? data.map((booking) =>(
                                <>
                                    <p>{booking[0].puDetails.puName}</p>
                                    <p>{booking[0].puDetails.puCompanyName}</p>
                                    <p style={{color:"grey"}}>{booking[0].puDetails.puAddress}</p>
                                    <p></p>
                                </>
                            ))
                                : 
                                    <>
                                        <p></p>
                                        <p></p>
                                        <p style={{color:"grey"}}></p>
                                    </>
                            }
                        </div>

                        <div style={{height:"64px"}} className="left-border-sum the-second">
                            <p>Not selected</p>
                        </div>

                        <div style={{height:"64px"}} className="left-border-sum the-second the-last">
                            {data.length > 0 ? data.map((booking) =>(
                                <>
                                    <p>{booking[0].doDetails.doName}</p>
                                    <p>{booking[0].doDetails.doCompanyName}</p>
                                    <p style={{color:"grey"}}>{booking[0].doDetails.doAddress}</p>
                                    <p></p>
                                </>
                            ))
                                : 
                                    <>
                                        <p></p>
                                        <p></p>
                                        <p style={{color:"grey"}}></p>
                                    </>
                            }
                        </div>

                        <div style={{
                                marginTop:"24px",
                                borderLeft:"1px solid grey",
                                padding:"0 10px",
                        }}>
                             {data.length > 0 ? data.map((booking) =>(
                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                }}>
                                    <h1 style={{fontWeight:"normal"}}>{booking[0].cargoInformation.productName}</h1>
                                    <p>SKU: {booking[0].cargoInformation.productCode}</p>
                                </div>
                            ))
                                : 
                                   <div>
                                        <h1></h1>
                                        <p></p>
                                   </div>
                            }

                            {data.length > 0 ? data.map((booking) =>(
                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                        border:"1px solid grey",
                                        padding:"10px",
                                        marginTop:"10px"

                                }}>
                                   <div style={{
                                       width:"31%",
                                       display:"flex",
                                       justifyContent:"space-between",
                                    }}>
                                        <div className='cargo-bid'>
                                            <p>Quantity</p>
                                            <p>Length</p>
                                            <p>Breadth</p>
                                            <p>height</p>
                                        </div>
                                        <div className='cargo-bid'>
                                            <p>: {booking[0].cargoInformation.quantity}</p>
                                            <p>: {booking[0].cargoInformation.lengthValue}cm</p>
                                            <p>: {booking[0].cargoInformation.breadth}cm</p>
                                            <p>: {booking[0].cargoInformation.height}cm</p>
                                        </div>
                                   </div>
                                   <div  style={{
                                       width:"31%",
                                       display:"flex",
                                       justifyContent:"space-between"
                                    }}>


                                        <div className='cargo-bid' style={{textAlign:"end"}}>
                                            <p>{booking[0].cargoInformation.volume}cm&sup3; :</p>
                                            <p>{booking[0].cargoInformation.volume}cm&sup3; :</p>
                                            <p>{booking[0].cargoInformation.weight}kg :</p>
                                            <p>{booking[0].cargoInformation.weight}kg :</p>
                                        </div>
                                        <div className='cargo-bid' style={{textAlign:"end"}}>
                                            <p>Net Volume</p>
                                            <p>Total Volume</p>
                                            <p>Net Weight</p>
                                            <p>Total Weight</p>
                                        </div>
                                   </div>
                                </div>
                            ))
                                : 
                                   <div>
                                        <h1></h1>
                                        <p></p>
                                   </div>
                            }

                            {data.length > 0 ? data.map((booking) =>(
                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                        flexDirection:"column",
                                        border:"1px solid grey",
                                        padding:"10px",
                                        marginTop:"10px"

                                }}>
                                    <div style={{display:"flex", justifyContent:"end"}}>
                                        <p>Hazardous Cargo</p>
                                    </div>
                                    <div style={{
                                            display:"flex",
                                            justifyContent:"space-between",
                                        }}>
                                        <div style={{
                                            width:"31%",
                                            display:"flex",
                                            justifyContent:"space-between",
                                        }}>
                                                <div className='cargo-bid'>
                                                    <p>Package Type</p>
                                                    <p>Fragile Cargo</p>
                                                </div>
                                                <div className='cargo-bid' >
                                                    <p>: {booking[0].cargoInformation.packageType}</p>
                                                    <p>: No</p>
                                                </div>
                                        </div>
                                        <div  style={{
                                            width:"31%",
                                            display:"flex",
                                            justifyContent:"space-between"
                                            }}>


                                                <div className='cargo-bid' style={{textAlign:"end"}}>
                                                    <p>{booking[0].cargoInformation.imoClass} :</p>
                                                    <p>{booking[0].cargoInformation.unNumber} :</p>
                                                </div>
                                                <div className='cargo-bid' style={{textAlign:"end"}}>
                                                    <p>IMO</p>
                                                    <p>UN Number</p>
                                                </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            ))
                                : 
                                   <div>
                                        <h1></h1>
                                        <p></p>
                                   </div>
                            }  

                             {data.length > 0 ? data.map((booking) =>(
                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                        flexDirection:"column",
                                        border:"1px solid grey",
                                        padding:"10px",
                                        marginTop:"10px",
                                        marginBotton:"10px"
                                }}>
                                    <div>
                                        <p>Temperature Controlled Cargo</p>
                                    </div>
                                    <div style={{
                                            display:"flex",
                                            justifyContent:"space-between",
                                        }}>
                                        <div style={{
                                            width:"31%",
                                            display:"flex",
                                            justifyContent:"space-between",
                                        }}>
                                                <div className='cargo-bid'>
                                                    <p>Min</p>
                                                    <p>Max</p>
                                                </div>
                                                <div className='cargo-bid' >
                                                    <p>: {booking[0].cargoInformation.hazard.min_temp}&#8451;</p>
                                                    <p>: {booking[0].cargoInformation.hazard.max_temp}&#8451;</p>
                                                </div>
                                        </div>
                            
                                    </div>
                                   
                                </div>
                            ))
                                : 
                                   <div>
                                        <h1></h1>
                                        <p></p>
                                   </div>
                            } 
                            
                            {data.length > 0 ? data.map((booking) =>(
                                <div style={{marginTop:"15px"}}>
                                    <a href="" className='sds-view-doc'>View SDS <i class="fa-solid fa-eye"></i></a>
                                </div>
                            ))
                                : 
                                <div>
                                    <a href="" className='sds-view-doc'>View SDS <i class="fa-solid fa-eye"></i></a>
                                </div>
                            }
                            
                        </div>
                        <div className='prerequi'>
                            {data.length > 0 ? data.map((booking) =>(
                                    <h1 style={{fontWeight:"normal"}}>{booking[0].cargoInformation.vehicle_type}</h1>
                            ))
                                : 
                                <h1></h1>
                            }
                            <div style={{
                                 display:"flex", 
                                 justifyContent:"space-between",
                                //  padding:"10px",
                                 marginTop:"10px",
                                 marginBotton:"10px"
                            }}>
                                <div style={{
                                    width:"45%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Ad-hoc Services</p>
                                    {data.length > 0 ? data.map((booking) =>(
                                        <p>{booking[0].prerequisites.ad_hoc_services}</p>
                                    ))
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                                <div  style={{
                                    width:"45%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Documentation</p>
                                    {data.length > 0 ? data.map((booking) =>(
                                        <p>{booking[0].prerequisites.documentation}</p>
                                    ))
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                            </div>

                            <div style={{
                                 display:"flex", 
                                 justifyContent:"space-between",
                                //  padding:"10px",
                                 marginTop:"10px",
                                 marginBotton:"10px"
                            }}>
                                <div style={{
                                    width:"45%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Personal Protective Equipment</p>
                                    {data.length > 0 ? data.map((booking) =>(
                                        <p>{booking[0].prerequisites.personal_protective}</p>
                                    ))
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                                <div  style={{
                                    width:"45%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Vehicle Equipment</p>
                                    {data.length > 0 ? data.map((booking) =>{
                                        var array = booking[0].prerequisites.vehicle_equipment.toString()
                                        var qna = array.split('"');
                                        var res = qna.join(" <br> ");
                                        return(
                                        <p>{res} </p>
                                        )
                                    })
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                            </div>

                            <div style={{
                                 display:"flex", 
                                 justifyContent:"space-between",
                                //  padding:"10px",
                                 marginTop:"10px",
                                 marginBotton:"10px"
                            }}>
                               
                                <div  style={{
                                    width:"100%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Insurance (Goods in Transit)</p>
                                    {data.length > 0 ? data.map((booking) =>(
                                        <p>R {booking[0].prerequisites.goods_in_transit}</p>
                                    ))
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='prerequi'>
                            <h1 style={{fontWeight:"normal"}}>Dates</h1>
                            {data.length > 0 ? data.map((booking) =>(
                                <>
                                    <p style={{color:"grey"}}>Start date :{booking[0].dates_time_selection.start_date_string}</p>
                                    <p style={{color:"grey"}}>End date :{booking[0].dates_time_selection.end_date_string}</p>
                                </>
                            ))
                                : 
                                <>
                                    <p>Not selected</p>
                                    <p>Not selected</p>
                                </>
                            }
                            
                        </div>

                    </div>

                    
                </div>
            </div>
        </div>
    )
        : <></>
    }</>
  )
}

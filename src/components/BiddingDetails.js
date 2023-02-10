import { border } from '@mui/system';
import React, {useState, useEffect} from 'react'
import '../css/biddingDetails.css'

export default function BiddingDetails({
    openDetails, 
    setOpenDetails,
    selectedBook, 
    setSelectedBook
}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("selectedItemBidding")){
            const storedList = JSON.parse(localStorage.getItem("selectedItemBidding"))
            setData([storedList]);
        }
    }, []) 

    console.log("The selected booking", selectedBook)

  return (
        <div className='modal-container'>
            <div className='modal' style={{width: "702px", maxHeight:"668px", height:"668px", overflow:"scroll", padding:"20px"}}>
                <div className='title-summary-head'>
                    <h1>Summary</h1>
                    <p style={{cursor:"pointer", fontWeight:"bold", fontSize:"20px"}} onClick={() => setOpenDetails((prev) => !prev)}>X</p>
                </div>
                <div className='summary-wrap'>
                    <div>
                        <div style={{height:"64px"}}>
                            <p style={{color:"grey"}}>Load Cargo</p>
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
                        <div style={{height:"64px"}} className="left-border-sum the-second">
                            <>
                                <p>{selectedBook.puDetails.puName}</p>
                                <p>{selectedBook.puDetails.puCompanyName}</p>
                                <p style={{color:"grey"}}>{selectedBook.puDetails.puAddress}</p>
                                <p></p>
                            </>
                        </div>

                        <div style={{height:"64px"}} className="left-border-sum the-second the-last">
                                <>
                                    <p>{selectedBook.doDetails.doName}</p>
                                    <p>{selectedBook.doDetails.doCompanyName}</p>
                                    <p style={{color:"grey"}}>{selectedBook.doDetails.doAddress}</p>
                                    <p></p>
                                </>
                        </div>

                        <div style={{
                                marginTop:"24px",
                                borderLeft:"1px solid grey",
                                padding:"0 10px",
                        }}>
                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                }}>
                                    <h1 style={{fontWeight:"normal"}}>{selectedBook.cargoInformation.productName}</h1>
                                    <p>SKU: {selectedBook.cargoInformation.productCode}</p>
                                </div>

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
                                            <p>: {selectedBook.cargoInformation.quantity}</p>
                                            <p>: {selectedBook.cargoInformation.lengthValue}cm</p>
                                            <p>: {selectedBook.cargoInformation.breadth}cm</p>
                                            <p>: {selectedBook.cargoInformation.height}cm</p>
                                        </div>
                                   </div>
                                   <div  style={{
                                       width:"31%",
                                       display:"flex",
                                       justifyContent:"space-between"
                                    }}>


                                        <div className='cargo-bid' style={{textAlign:"end"}}>
                                            <p>{selectedBook.cargoInformation.volume}cm&sup3; :</p>
                                            <p>{selectedBook.cargoInformation.volume}cm&sup3; :</p>
                                            <p>{selectedBook.cargoInformation.weight}kg :</p>
                                            <p>{selectedBook.cargoInformation.weight}kg :</p>
                                        </div>
                                        <div className='cargo-bid' style={{textAlign:"end"}}>
                                            <p>Net Volume</p>
                                            <p>Total Volume</p>
                                            <p>Net Weight</p>
                                            <p>Total Weight</p>
                                        </div>
                                   </div>
                                </div>

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
                                                    <p>: {selectedBook.cargoInformation.packageType}</p>
                                                    <p>: No</p>
                                                </div>
                                        </div>
                                        <div  style={{
                                            width:"31%",
                                            display:"flex",
                                            justifyContent:"space-between"
                                            }}>


                                                <div className='cargo-bid' style={{textAlign:"end"}}>
                                                    <p>{selectedBook.cargoInformation.imoClass} :</p>
                                                    <p>{selectedBook.cargoInformation.unNumber} :</p>
                                                </div>
                                                <div className='cargo-bid' style={{textAlign:"end"}}>
                                                    <p>IMO</p>
                                                    <p>UN Number</p>
                                                </div>
                                        </div>
                                    </div>
                                   
                                </div>

                                <div style={{
                                        display:"flex", 
                                        justifyContent:"space-between",
                                        flexDirection:"column",
                                        border:"1px solid grey",
                                        padding:"10px",
                                        marginTop:"10px",
                                        marginBotton:"10px",
                                        marginBottom: "11px"
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
                                                    <p>: {selectedBook.cargoInformation?.hazard?.min_temp}&#8451;</p>
                                                    <p>: {selectedBook.cargoInformation?.hazard?.max_temp}&#8451;</p>
                                                </div>
                                        </div>
                            
                                    </div>
                                   
                                </div>
                            
                                <div style={{marginTop:"15px"}}>
                                    <a href="" className='sds-view-doc'>View SDS <i class="fa-solid fa-eye"></i></a>
                                </div>
                        </div>
                        <div className='prerequi'>
                            <h1 style={{fontWeight:"normal"}}>{selectedBook.cargoInformation.vehicle_type}</h1>
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
                                    <p>{selectedBook.prerequisites.ad_hoc_services}</p>
                                </div>
                                <div  style={{
                                    width:"45%",
                                    border:"1px solid grey",
                                    padding:"10px"
                                }}>
                                    <p>Documentation</p>
                                    {data.length > 0 ? 
                                        <p>{selectedBook.prerequisites.documentation}</p>
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
                                    {selectedBook.length > 0 ? 
                                        <p>{selectedBook.prerequisites.personal_protective}</p>
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
                                    {data.length > 0 ? 
                                        <p>{selectedBook.prerequisites.vehicle_equipment.toString()} </p>
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
                                    {data.length > 0 ?
                                        <p>R {selectedBook.prerequisites.goods_in_transit}</p>
                                        : 
                                        <p>Not selected</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='prerequi'>
                            <h1 style={{fontWeight:"normal"}}>Dates</h1>
                            {data.length > 0 ?
                                <>
                                    <p style={{color:"grey"}}>Start date :{selectedBook.dates_time_selection.start_date_string}</p>
                                    <p style={{color:"grey"}}>End date :{selectedBook.dates_time_selection.end_date_string}</p>
                                </>
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
}

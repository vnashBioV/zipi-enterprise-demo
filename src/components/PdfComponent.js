import React, {useState, useEffect, useRef} from 'react'
import ReactToPdf from 'react-to-pdf';
import firebase from '../firebase-config';
import downIcon from '../icons/download-pdf.png'

export default function ExportPdfComponent({
  singleBook,
  setDocumentComp
}) {
  const ref = React.createRef();
  const [userEmail, setUserEmail] = useState("");
  const [company, setCompany] = useState("")
  const [telephone, setTelephone] = useState("")
  const [userUid, setUserUid] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
            setUser(user)
          var uid = user.uid;
          setUserUid(uid)
          firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
                const company = snapshot.val().companyDetails.registeredCompanyName
                setCompany(company)
                setTelephone(snapshot.val().companyDetails.telephone)
            });
          // ...
        } else {
        }
    });
}, [])

  return (
    <div>
      <div className='pdf-container'>
        <div className='pdf-child'>
          <h1>Tracking Summary</h1>
          <p onClick={()=> setDocumentComp(false)} style={{position: 'absolute', right:'0', top:'0', padding:'10px', cursor:"pointer"}}>X</p>
          <div className='load-shipping'>
            <div>
                <p style={{color:"grey"}}>Booking Party</p>
                <p>{company}</p>
                <p>{telephone}</p>
                <p>{userEmail}</p>
            </div>

            {singleBook.length > 0 ? singleBook.map((single) => (
                <>
                    <div>
                        <p style={{color:"grey"}}>Pick-up</p>
                        <p>{single.puDetails.puCompanyName}</p>
                        <p>{single.puDetails.puAddress}</p>
                        <p>{single.puDetails.puCityName}</p>
                    </div>
                    <div>
                        <p style={{color:"grey"}}>Drop off</p>
                        <p>{single.doDetails.doCompanyName}</p>
                        <p>{single.doDetails.doAddress}</p>
                        <p>{single.doDetails.doCityName}</p>
                    </div>
                </>
            ))
            :<>
                <div>
                    <p style={{color:"grey"}}>Pick-up</p>
                    <p>Company Name</p>
                    <p>Address</p>
                    <p>CityName</p>
                </div>
                <div>
                    <p style={{color:"grey"}}>Drop off</p>
                    <p>Company Name</p>
                    <p>Address</p>
                    <p>CityName</p>
                </div>
            </>
            } 
        </div>

        {singleBook.length > 0 ? singleBook.map((single) => (
          <div className='cargo-cargo'>
              <div>
                  <p style={{color:"grey"}}>Cargo</p>
                  <p>{single.cargoInformation.productName}</p>
                  <p>SKU: {single.cargoInformation.productCode}</p>

                  <p style={{color:"grey", marginTop:"10px"}}>Packaging</p>
                  <div className='package-type-container'>
                      <div>
                          <p>Package Type:</p>
                          <p>Dimensions:</p>
                          <p>Quantity:</p>
                          <p>Total Weight:</p>
                      </div>
                      <div>
                          <p>{single.cargoInformation.productCode}</p>
                          <p>{single.cargoInformation.breadth}cm x {single.cargoInformation.weight}cm x {single.cargoInformation.height}cm</p>
                          <p>{single.cargoInformation.quantity}</p>
                          <p>{single.cargoInformation.weight}t</p>
                      </div>
                  </div>
                  {/* <p style={{marginTop:"10px"}}>
                      This cargo is fragile, must be contained in temperatures between -20°C 
                      and 0°C and is hazardous.
                  </p> */}
              </div>
          </div>
          ))
          :
          <div className='cargo-cargo'>
              <div>
                  <p style={{color:"grey"}}>Cargo</p>
                  <p>Manganese</p>
                  <p>SKU: 001232MANG</p>

                  <p style={{color:"grey", marginTop:"10px"}}>Packaging</p>
                  <div className='package-type-container'>
                      <div>
                          <p>Package Type:</p>
                          <p>Dimensions:</p>
                          <p>Quantity:</p>
                          <p>Total Weight:</p>
                      </div>
                      <div>
                          <p>Box</p>
                          <p>120cm x 120cm x 100cm</p>
                          <p>30</p>
                          <p>32t</p>
                      </div>
                  </div>
                  {/* <p style={{marginTop:"10px"}}>
                      This cargo is fragile, must be contained in temperatures between -20°C 
                      and 0°C and is hazardous.
                  </p> */}
              </div>
          </div>
          } 
        <ReactToPdf targetRef={ref} filename=".pdf" x={18} y={1} >
          {({toPdf}) => (
              // <img onClick={toPdf} style={{cursor:"pointer"}} className="get-pdf-btn" src={downIcon} alt="" />
              // <i class="fa-solid fa-arrow-down-to-line get-pdf-btn"></i>
              <i onClick={toPdf} class="fa-regular fa-arrow-down"></i>
              // <button onClick={toPdf} className="btn-down-pdf">Download Document</button>
          )}
        </ReactToPdf>
        </div>
      </div>
  </div>    
  )
}

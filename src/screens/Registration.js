import React, { useState, useEffect, useRef} from 'react'
import '../css/login.css'
import logo from '../icons/we-tracking-logo.png';
import { Link, useNavigate } from 'react-router-dom'
import firebase from '../firebase-config';
import { useForm } from "react-hook-form";


export default function Register() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const [provices, setProvinces] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [light, setLight] = useState([]);
    const [heavy, setHeavy] = useState([]);
    const [abnormal, setAbnormal] = useState([]);
    const [patner, setPatner] = useState([]);
    const [addPartners, setAddPartners ] = useState([]);

    const companyNameInput = useRef();

    //Form validation
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); // watch input value by passing the name of it


    const addPartner = ()=>{
      setAddPartners([...addPartners, patner.partnerDetails])
    }

    const handleRegister = (e) =>{
      e.preventDefault()
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                var uid = user.uid;
                const email = user.email;
                const companyDetails = dataArray.companyDetails
                const physicalBusinessAddress = dataArray.physicalBusinessAddress
                firebase.database().ref('/booking_party/' + uid).set({
                  companyDetails,
                  physicalBusinessAddress,
                  provices: provices,
                  sectors: sectors,
                  light: light,
                  heavy: heavy,
                  abnormal: abnormal,
                  partner: patner,
                  email: email,
                })
                // alert("Registration successful please go and login!")
                navigate('/enterprise')
              })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ..
            });
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
    }

    useEffect(() => {
      if(companyNameInput.current.value === ""){
        alert("Please enter a company name")
      }
    }, [])
    

    console.log("dataArray", dataArray);
    console.log("provice",provices);
    console.log("sector", sectors);
    console.log("light", light);
    console.log("Heavy", heavy);
    console.log("Abnormal", abnormal);
    console.log("Partner", patner);
    console.log("Partners", addPartners);
    console.log("Email", email)
    // console.log("country", dataArray.physicalBusinessAddress.country)

  return (
    <div className='login' style={{flexDirection:"column"}}>
        <form 
          className='register'
          onSubmit={handleSubmit((data) => {
            console.log("This is the data", data)
          })}
        >
          <div>
            <div>
                  <h3>Company Details</h3>
                  <input 
                    ref={companyNameInput}
                    type="text" 
                    required
                    {...register("companyName")}
                    placeholder='Registered Company Name' 
                    onChange={(e) => {
                      setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          registeredCompanyName:e.target.value
                      } 
                    }))}}
                  />
                  <input 
                    type="text" 
                    required
                    {...register("tradingName")}
                    placeholder='Trading Name (if any)' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          tradingName:e.target.value
                      } 
                    }))}
                  />
                  <input 
                    type="text" 
                    required
                    {...register("registrationNumber")}
                    placeholder='Registration Number (YYYY/NNNNNN/NN)' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          registrationNumber:e.target.value
                      } 
                    }))}
                  />
                  <input 
                    type="text" 
                    required
                    {...register("vatRegistrationNumber")}
                    placeholder='VAT Registration Number' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          vatRegistrationNumber:e.target.value
                      } 
                    }))}
                  />
                  <input 
                    type="number" 
                    required
                    {...register("telephone")}
                    placeholder='Telephone' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          telephone:e.target.value
                      } 
                    }))}
                  />
                  <input 
                    type="email" 
                    required
                    {...register("email")}
                    placeholder='Email' 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input 
                    type="password" 
                    required
                    {...register("password")}
                    placeholder='Password' 
                    onChange={(e) =>setPassword(e.target.value)}
                  />
                  <p>Needs to be at least 8 characters long</p>
                  <p>Needs to contain one lowercase letter</p>
                  <p>Needs to contain one uppercase letter</p>
                  <p>Needs to contain one number</p>
                  <p style={{marginBottom:"11px"}}>Needs to contain one of these special characters: !@#$%^&*()_+</p>
                  <input 
                    type="password"
                    required 
                    {...register("confirmPassword")}
                    placeholder='Confirm Password' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          confirmPassword:e.target.value
                      } 
                    }))}
                  />
                  <h3>B-BBEE Status</h3>
                  <input 
                    type="date" 
                    placeholder='Expiry Date' 
                    {...register("expiryDate")}
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          expiryDate:e.target.value
                      } 
                    }))}
                  />
                  <input 
                    type="level" 
                    placeholder='Level' 
                    {...register("level")}
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      companyDetails:{
                          ...prevState.companyDetails,
                          level:e.target.value
                      } 
                    }))}
                  />
                  <label htmlFor='file' className='upload-files'>
                    <input type="file" id='file' accept='image/*' />
                    Upload Certificate
                  </label> <br /> <br />
                  <label htmlFor="not applicable">
                    <input type="radio" style={{marginRight:"10px"}}/>
                    Not applicable
                  </label>
                  <h3 style={{marginTop:"26px"}}>CIPC/Cipro Certificate</h3>
                  <label htmlFor='file' className='upload-files'>
                    <input type="file" id='file' accept='image/*' />
                    Upload Certificate
                  </label>
            </div>
          
            <div>
                <h3>Physical Business Address</h3>
                <input 
                  type="text" 
                  {...register("complex")}
                  placeholder='Complex/Office Block Number' 
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.cphysicalBusinessAddress,
                        complex:e.target.value
                    } 
                  }))}
                />
                <input 
                  type="text" 
                  {...register("streetNameNumber")}
                  placeholder='Street Name and Number' 
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        streetNameNumber:e.target.value
                    } 
                  }))}
                />
                <input 
                  type="text" 
                  {...register("suburb")}
                  placeholder='Suburb' 
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        suburb:e.target.value
                    } 
                  }))}
                  />
                <input 
                  type="text" 
                  {...register("cityTown")}
                  placeholder='City/Town' 
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        cityTown:e.target.value
                    } 
                  }))}
                />
                <select 
                  {...register("province")}
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        province:e.target.value
                    } 
                  }))}
                >
                    <option value="">Select Province</option>
                    <option value="Mpumalanga">Mpumalanga</option>
                    <option value="Limpopo">Limpopo</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Free State">Free State</option>
                    <option value="Kwazulu Natal">Kwazulu Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="Northern Cape">Northern Cape</option>
                    <option value="North West">North West</option>
                </select>
                <div className='postal-code'>
                  <input 
                    type="text" 
                    {...register("postalCode")}
                    placeholder='Postal Code' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      physicalBusinessAddress:{
                          ...prevState.physicalBusinessAddress,
                          postalCode:e.target.value
                      } 
                    }))}
                  />
                  <select 
                    {...register("country")}
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      physicalBusinessAddress:{
                          ...prevState.physicalBusinessAddress,
                          country:e.target.value
                      } 
                    }))}
                  >
                    <option value="">Select Country</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Botswane">Botswana</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <h3>Postal Address</h3>
                <label htmlFor="not applicable">
                    <input 
                      type="radio" 
                      style={{marginRight:"10px"}}
                    />
                    Tick if same as physical address
                </label>
                <input 
                  type="text" 
                  {...register('poBox')}
                  placeholder='P.O. Box' 
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        poBox:e.target.value
                    } 
                  }))}
                  style={{marginTop:"9px"}}
                />
                <input 
                  type="text" 
                  placeholder='City Town' 
                  {...register("postalCityTown")}
                  onChange={(e) => setDataArray((prevState) => ({
                    ...prevState,
                    physicalBusinessAddress:{
                        ...prevState.physicalBusinessAddress,
                        postalCityTown:e.target.value
                    } 
                  }))}
                />
                <div className='postal-code'>
                  <input 
                    type="text" 
                    {...register("postalCode")}
                    placeholder='Postal Code' 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      physicalBusinessAddress:{
                          ...prevState.physicalBusinessAddress,
                          postalCode:e.target.value
                      } 
                    }))}
                  />
                  <select 
                    onChange={(e) => setDataArray((prevState) => ({
                      ...prevState,
                      physicalBusinessAddress:{
                          ...prevState.physicalBusinessAddress,
                          country:e.target.value
                      } 
                    }))}
                  >
                    <option value="">Select Country</option>
                    <option value="">South Africa</option>
                    <option value="">Botswana</option>
                    <option value="">Zimbabwe</option>
                  </select>
                </div>
            </div>
          </div>

          <div>
              <h3>Partners' Details</h3>
              <div className='partner'>
                <select 
                  onChange={(e) => setPatner((prevState) => ({
                    ...prevState,
                    partnerDetails:{
                        ...prevState.partnerDetails,
                        designation:e.target.value
                    } 
                  }))}
                >
                  <option value="">Designation</option>
                  <option value="director">Director</option>
                  <option value="chief executive officer">Chief Executive Officer</option>
                  <option value="chief financial officer">Chief Financial Officer</option>
                  <option value="chief operations officer">Chief Operational Officer</option>
                  <option value="shareholder">Shareholder</option>
                </select>
                <input 
                  type="text" 
                  placeholder='Full Name' 
                  onChange={(e) => setPatner((prevState) => ({
                    ...prevState,
                    partnerDetails:{
                        ...prevState.partnerDetails,
                        fullName:e.target.value
                    } 
                  }))}
                  />
                <input 
                  type="text" 
                  placeholder='Email' 
                  onChange={(e) => setPatner((prevState) => ({
                    ...prevState,
                    partnerDetails:{
                        ...prevState.partnerDetails,
                        email:e.target.value
                    } 
                  }))}
                />
                <input 
                  type="text" 
                  placeholder='Tel/Mobile (0xxxxxxxxx)' 
                  onChange={(e) => setPatner((prevState) => ({
                    ...prevState,
                    partnerDetails:{
                        ...prevState.partnerDetails,
                        tel:e.target.value
                    } 
                  }))}
                />
                <input 
                  type="text"
                  placeholder='Physical Address' 
                  onChange={(e) => setPatner((prevState) => ({
                    ...prevState,
                    partnerDetails:{
                        ...prevState.partnerDetails,
                        physicalAddress:e.target.value
                    } 
                  }))}
                />
              </div>
              {/* <div>
                  <div></div>
                  <div></div>
              </div> */}
              <div className='add-director'>
                <div>
                  {addPartners ? addPartners.map((part, i)=>
                          <p key={i}>
                            {part.fullName} 
                          </p>
                      )
                      : <></>
                  }
                </div>
                
                <div>
                  <i class="fa-solid fa-plus" onClick={addPartner}></i><p>Add Director</p>
                </div>
              </div>
          </div>
          <div>
            <h3>Operating Areas</h3>
            <div className='sa-province'>
              <div>
                <p>South African Provinces</p>
                <label htmlFor="eastern cape">
                      <input 
                        type="radio" 
                        value="Eastern Cape"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Eastern Cape
                </label>
                <label htmlFor="freestate">
                      <input 
                        type="radio" 
                        value="Freestate"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Freestate
                </label>
                <label htmlFor="gauteng">
                      <input 
                        type="radio" 
                        value="Gauteng"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Gauteng
                </label>
                <label htmlFor="not applicable">
                      <input 
                        type="radio" 
                        value="Kwazulu Natal"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Kwazulu Natal
                </label>
                <label htmlFor="limpopo">
                      <input 
                        type="radio" 
                        value="Limpopo"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Limpopo
                </label>
                <label htmlFor="mpumalanga">
                      <input 
                        type="radio" 
                        value="Mpumalanga"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Mpumalanga
                </label>
                <label htmlFor="northern cape">
                      <input 
                        type="radio" 
                        value="Northern Cape"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Northern Cape
                </label>
                <label htmlFor="north west">
                      <input 
                        type="radio" 
                        value="North west"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      North West
                </label>
                <label htmlFor="western cape">
                      <input 
                        type="radio" 
                        value="Western cape"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setProvinces([...provices, e.target.value])}
                      />
                      Western Cape
                </label>
              </div>
              <div>
                <p>Sectors</p>
                <label htmlFor="Agriculture">
                      <input 
                        type="radio" 
                        value="Agriculture"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Agriculture
                </label>
                <label htmlFor="automotive">
                      <input 
                        type="radio" 
                        value="Automotive"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Automotive
                </label>
                <label htmlFor="commercial">
                      <input 
                        type="radio" 
                        value="Commercial"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Commercial
                </label>
                <label htmlFor="energy">
                      <input 
                        type="radio" 
                        value="Energy"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Energy
                </label>
                <label htmlFor="industrial">
                      <input 
                        type="radio" 
                        value="industrial"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Industrial
                </label>
                <label htmlFor="logistics">
                      <input 
                        type="radio" 
                        value="logistics"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Logistics
                </label>
                <label htmlFor="mining">
                      <input 
                        type="radio" 
                        value="mining"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Mining
                </label>
                <label htmlFor="retail">
                      <input 
                        type="radio" 
                        value="retail"
                        style={{marginRight:"10px"}}
                        onChange={(e) => setSectors([...sectors, e.target.value])}
                      />
                      Retail
                </label>
              </div>
            </div>
              <h3>Fleet</h3>
              <div className='vehicle-type'>

                <div>
                  <p>Light Vehicle</p>
                  <label htmlFor="bike">
                        <input 
                          type="radio" 
                          value="Bike"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        Bike
                  </label>
                  <label htmlFor="car">
                        <input 
                          type="radio" 
                          value="Car"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        Car
                  </label>
                  <label htmlFor="panel van">
                        <input 
                          type="radio" 
                          value="Panel van"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        Panel Van
                  </label>
                  <label htmlFor="bakkie">
                        <input 
                          type="radio" 
                          value="Bakkie"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        Bakkie
                  </label>
                  <label htmlFor="truck">
                        <input 
                          type="radio" 
                          value="1.5t truck"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        1.5t Truck
                  </label>
                  <label htmlFor="truck2">
                        <input 
                          type="radio" 
                          value="3.5t truck"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setLight([...light, e.target.value])}
                        />
                        3.5t Truck
                  </label>
                </div>

                <div>
                  <p>Heavy Vehicle</p>
                  <label htmlFor="car carrier">
                        <input 
                          type="radio" 
                          value="car carrier"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Car Carrier
                  </label>
                  <label htmlFor="flat bed">
                        <input 
                          type="radio" 
                          value="Flat bed"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Flat Bed
                  </label>
                  <label htmlFor="liquid tanker">
                        <input 
                          type="radio" 
                          value="Liquid"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Liquid Tanker
                  </label>
                  <label htmlFor="refrigerated">
                        <input 
                          type="radio" 
                          value="Refrigerated"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Refrigerated
                  </label>
                  <label htmlFor="side tipper">
                        <input 
                          type="radio" 
                          value="Side tipper"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Side Tipper
                  </label>
                  <label htmlFor="tautliner">
                        <input 
                          type="radio" 
                          value="tautliner"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setHeavy([...heavy, e.target.value])}
                        />
                        Tautliner
                  </label>
                </div>

                <div>
                  <p>Abnormal Vehicle</p>
                  <label htmlFor="load bed">
                        <input 
                          type="radio" 
                          value="load bed"
                          style={{marginRight:"10px"}}
                          onChange={(e) => setAbnormal([...abnormal, e.target.value])}
                        />
                        Load Bed
                  </label>
                </div>
              </div>
          </div>
        </form>
        <div className='sign-up-container'>
          <button className="senderer" type="submit" onClick={handleRegister} >Sign up</button>
        </div>
    </div>
  )
}

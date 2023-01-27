import React, { useState, useEffect } from 'react'
import logo from '../icons/we-tracking-logo.png';
import firebase from '../firebase-config';
import { Link, useNavigate  } from 'react-router-dom';
import '../css/login.css'
import ForgotPass from '../components/ForgotPass';
import dark from '../icons/dark.png'
import darkLogo from '../icons/we-tracking-logo.png'
import cargo from '../icons/Cargo.svg';
import Fleet from '../icons/Fleet-Owner.svg';
import Sales from '../icons/Sales-Agent.svg';
import { useForm } from "react-hook-form";
import RegStepTwo from '../components/registrationSteps/RegStepTwo';
import RegStepThree from '../components/registrationSteps/RegStepThree';
// import { Oval } from 'react-loader-spinner'
import Spinner from '../components/Spinner';

export default function Register() {
      const [email, setEmail] = useState("");
      const [loginEmail, setLoginEmail] = useState("")
      const [loginPassword, setLoginPassword] = useState("")
      const [user, setUser] = useState([])
      const navigate = useNavigate();
      const [alert, setAlert] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const [showRegister, setShowRegister] = useState(false);
      const [showLogin, setShowLogin] = useState(false);
      const [onBoarding, setOnBoarding] = useState(false)
      const [onBoardStepOne, setOnBoardStepOne] = useState(true)
      const [onBoardStepTwo, setOnBoardStepTwo] = useState(false)
      const [onBoardStepThree, setOnBoardStepThree] = useState(false)
      const [skipBoarding, setSkipBoarding] = useState(false);
      const [stepOne, setStepOne] = useState(true)
      const [stepTwo, setStepTwo] = useState(false)
      const [stepThree, setStepThree] = useState(false)
      const [stepFour, setStepFour] = useState(false)
      const [registerStepTwo, setRegisterStepTwo] = useState(false)
      const [registerStepThree, setRegisterStepThree] = useState(false)
      const [registerStepFour, setRegisterStepFour] = useState(false)
      const [emailCompany,setEmailCompany] = useState(false)
      const [steps, setSteps] = useState(1)
      const [stepBar, setStepBar] = useState("20%")
      const [isHidden, setIsHidden] = useState(true)
      const [isLoginHidden, setIsLoginHidden] = useState(true)
      const [stepOneData, setStepOneData] = useState([]);
      const [stepTwoData, setStepTwoData] = useState([]);
      const [stepThreeData, setStepThreeData] = useState([]);
      const [entityTypeData, setEntityTypeData] = useState('')
      const [finalData, setFinalData] = useState([]);
      const [password, setPassword] = useState('');
      const { register, handleSubmit, formState: { errors } } = useForm();
      const [companyEmailData, setCompanyEmailData] = useState('')
      const [sameAsAdress,setSameAsAdress] = useState(false)
      const [serviceOptions, setServiceOptions] = useState([])
      const [customer, setCustomer] = useState(false)
      const [fleetOwner, setFleetOwner] = useState(false)
      const [salesAgent, setSalesAgent] = useState(false)
      const [poBox, setPoBox] = useState('')
      const [city, setCity] = useState('')
      const [eyeShown, setEyeShown] = useState(false)
      const [loginEyeShown, setLoginEyeShown] = useState(false)
      const [isSpinner, setIsSpinner] = useState(true)
      const [boardingActiveOne, setBoardingActiveOne] = useState(false)
      const [boardingActiveTwo, setBoardingActiveTwo] = useState(false)
      const [boardingActiveThree, setBoardingActiveThree] = useState(false)
      const [sucess, setSucess] = useState(false)

      const boardingArray = [
        {
          title: 'Customer',
          image: cargo,
          subtitle: 'Have your cargo delivered',
          context:'Use the Zipi platform to move your cargo from point A to B. Start a bid for the best prices from our fleet owners and choose the fleet owner/s you want to book with on your schedule.',
        },
        {
          title: 'Fleet Owner',
          image: Fleet,
          subtitle: 'Move cargo with your own fleet',
          context:'Earn by listing your fleet with Zipi, the users that want to move cargo broardcast their request to have their cargo moved, the deal goes to the best bidder',
        },
        {
          title: 'Sales Agent',
          image: Sales,
          subtitle: 'Sell Zipi to the public',
          context:"Earn by referring businesses and individuals to the platform, the best part, it doesn't what the user does! All they have to do for you to start your earning is to start transacting and you earn per transaction.",
        },
      ]

    const authenticateUser = (e) =>{
      e.preventDefault()
      firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
      .then((userCredential) => {
          var user = userCredential.user;
          var uid = user.uid;
          firebase.database().ref('/booking_party/' + uid).once('value', (snapshot) => {
            if(snapshot.exists()){
              navigate('/dashboard')
            }else{
              setErrorMessage("This is not the right platform for this user type")
              setAlert(true)
            }
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorMessage === "The password is invalid or the user does not have a password." || errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted."){
          setErrorMessage("The email or password you entered is incorrect, Try again or reset your password")
        }else if(email === "" || password === ""){
          setErrorMessage("Please enter your login details")
        }
        setAlert(true)
      });
  }

  const showPassword = (event) => {
    setIsHidden(!isHidden)
    setEyeShown(!eyeShown)
  }
  const showPasswordTwo = (event) => {
    setIsLoginHidden(!isLoginHidden)
    setLoginEyeShown(!loginEyeShown)
  }

  const submitStepOne = (data) => {
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user
        setUser(user)
        var uid = user.uid;
        const email = user.email;
        setEmail(user.email)
        firebase.database().ref('/booking_party/' + uid).set({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          // entityType: entityTypeData,
          // companyEmail:companyEmailData,
          // poBox,
          // city,
          serviceOptions: [`${customer && "customer"}`, `${fleetOwner && "fleet owner"}`, `${salesAgent && "sales agent"}`],
          // user_type: 'booking party'
        })
        // setIsSpinner(true)
        setSucess(true)
        setTimeout(() => {
          setSucess(false)
          setStepOneData(data);
          setStepOne(false);
          setStepTwo(true);
          setStepThree(false);
          setStepFour(false);
          setStepBar("40%")
          setSteps(2)
        }, 2000)
       
      })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // setErrorMessage(errorMessage)
      if (errorMessage === "The email address is already in use by another account."){
        setErrorMessage("This email address is already attached to an existing account, would you like to log in instead?")
        console.log(errorMessage);
      }else{
        setErrorMessage(errorMessage)
      }
      setAlert(true)
      // ..
    });
    console.log("This is the email",data.email)
  }

  const submitStepTwo = () => {
    // console.log(stepTwoData.companyName);
    // console.log("user uid", user.uid);
    firebase.database().ref('/booking_party/' + user.uid).update({
      ...stepTwoData,
      entityTypeData,
      companyEmailData
    }).then(() => {
      // setStepTwoData(data);
      setStepOne(false);
      setStepTwo(false);
      setStepThree(true);
      setStepFour(false);
      setStepBar("70%")
      setSteps(3)
    })
  }
  const submitStepThree = () => {
    // setStepThreeData(data)
    firebase.database().ref('/booking_party/' + user.uid).update({
      ...stepThreeData,
      city
    }).then(() => {
      // setStepTwoData(data);
      setStepOne(false);
      setStepTwo(false);
      setStepThree(false);
      setStepFour(true);
      setStepBar("100%")
      setSteps(4)
    })

    // const passwordReset = (email) => {
    //   return firebase.auth().sendPasswordResetEmail(email)
    // }

    // firebase.auth().createUserWithEmailAndPassword(stepOneData.email, stepOneData.password)
    // .then((userCredential) => {
    //     const user = userCredential.user
    //     setUser(user)
    //     var uid = user.uid;
    //     const email = user.email;
    //     firebase.database().ref('/booking_party/' + uid).set({
    //       ...data,
    //       entityType: entityTypeData,
    //       companyEmail:companyEmailData,
    //       poBox,
    //       city,
    //       serviceOptions: [`${customer && "customer"}`, `${fleetOwner && "fleet owner"}`, `${salesAgent && "sales agent"}`],
    //       user_type: 'booking party'
    //     })
    //     setIsSpinner(true)
    //     setTimeout(() => {
    //       setIsSpinner(false)
    //       setStepOne(false);
    //       setStepTwo(false);
    //       setStepThree(false);
    //       setStepFour(true);
    //       setStepBar("100%")
    //       setSteps(4)
    //     }, 2000)
       
    //   })
    // .catch((error) => {
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // setErrorMessage(errorMessage)
    //   if (errorMessage === "The email address is already in use by another account."){
    //     setErrorMessage("This email address is already attached to an existing account, would you like to log in instead?")
    //     console.log(errorMessage);
    //   }
    //   setAlert(true)
    //   // ..
    // });
    // registerUser();
  }

  console.log("this is the first data email", stepOneData.email);
  console.log("this is the second data", stepTwoData);

  useEffect(() => {
    setShowLogin(true);
    setShowRegister(false);
    setStepFour(false)
  }, [])

  return (
  <div class="theBackground" style={{position:"relative", scrollbarWidth: "none", msOverflowStyle:"none"}}>
      <div className='inner-log-container' style={{display: onBoarding && "none"}}>
      {stepFour &&
        <div className='top-board-child' style={{position:"absolute", top:"0", left:"0"}}>
          <img src={darkLogo} alt="zipi-logo" />
          <p>It's just so nippy!</p>
        </div>
      }
      {!stepFour &&
        <div id="informatics">
            <div class="logoArea">
              <img src={dark} alt="Zipi Logo" id="logo" />
            </div>
            <div class="textArea">
              <h2>It's just so nippy!</h2>
              <p>Where cargo security and user satisfaction meet.</p>
            </div>
      </div>
      }

      <div id="absolutely" style={{display: showLogin ? "flex" : "none", position:"relative"}}>
        {/* 0th step */}
        <div class="form">
          <h1>Login</h1>
          <p>
            Welcome back to the community, sign in to start moving your cargo.
          </p>
          <input 
            type="email" 
            className='loginInput' 
            placeholder="Email" 
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <div 
              className='loginInput' 
              style={{
                display:"flex", 
                alignItems:"center",
                padding:"0", 
              }}>
              <input 
                style={{margin:"0"}}
                type={isLoginHidden ? 'password' : 'text'} 
                className='loginInput' 
                placeholder="Password" 
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {!loginEyeShown &&
                <i class="fa-solid fa-eye"
                style={{color:"#000", cursor: "pointer", marginRight:"10px"}} 
                onClick={showPasswordTwo}
              ></i>
              }
              {loginEyeShown &&
                <i class="fa-solid fa-eye-slash"
                style={{color:"#000", cursor: "pointer", marginRight:"10px"}} 
                onClick={showPasswordTwo}
              ></i>
              }
               
          </div>
          <div class="btnHolder">
            <button class="btnTertiary" onClick={() =>navigate ('/forgotpassword')}>Reset password</button>
            <button 
              class="btnPrimary"
              onClick={(e) => {authenticateUser(e)}}
              >Sign in <i class="fa-solid fa-arrow-right" style={{marginLeft:"5px"}}></i></button>
          </div>
          <div class="signup">
            <p id="floatingP">or</p>
            <button type='button' class="btnTertiary" onClick={() => {
              setOnBoarding(true)
              setStepOne(false);
              setStepTwo(false);
              setStepThree(false);
              setStepFour(false);
              setStepBar("20%")
              setSteps(1)
            }}>Create an account</button>
          </div>
        </div>
        {alert &&
            <div 
              className='error-login-message'
              style={{width: "59%", height: "fit-content"}}
            >
                <p>{errorMessage}</p>
                <button onClick={() => {setAlert(false)} }>Ok</button>
            </div>
        }
      </div>
      <div id="absolutelyReg" style={{display: showRegister && "flex", position:"relative"}}>
        {/*  1st step */}
        <div class="form">
          {!stepFour &&
          <>
            {!stepOne &&
            <button 
              class="skip-button" 
              id="skipBtn" 
              onClick={() => {
                if(stepOne){
                  setStepOne(false)
                  setStepTwo(true);
                  setStepThree(false);
                  setStepFour(false)
                  setStepBar("40%")
                  setSteps(2)
                }
                if(stepTwo){
                  setStepOne(false)
                  setStepTwo(false);
                  setStepThree(true);
                  setStepFour(false)
                  setStepBar("70%")
                  setSteps(3)
                }
                if(stepThree){
                  setStepOne(false);
                  setStepTwo(false);
                  setStepThree(false);
                  setStepFour(true);
                  setStepBar("100%")
                  setSteps(4)
                }
              }}
            >Skip</button>
            }
            <h1 id="heading-title">Sign up</h1>
            <p class="steps" id="userSteps"><b> Step {steps} of 4</b></p>
            <div class="progressBar-container" id="theBar">
              <div id="barology" style={{width: stepBar}}></div>
            </div>
          </>
          }

          {/* {stepOne && */}
            <form class="fill-in-form" style={{display: stepOne ? "block" : "none", position:"relative"}} id="step1" onSubmit={handleSubmit(submitStepOne)}>
              <p>
                Let's get to know you, fill in the below information to continue as a representative for your business.
              </p>
              <input 
                type="text" 
                className='loginInput'  
                placeholder="First Name"
                {...register("firstName", { required: true })} 
              />
              {errors.firstName && <p style={{color:"red", marginTop:"0"}}>Please don't leave the first name blank.</p>}
              <input 
                type="text" 
                className='loginInput' 
                placeholder="Last Name" 
                {...register("lastName", { required: true })} 
              />
              {errors.lastName && <p style={{color:"red", marginTop:"0"}}>Please don't leave the last name blank.</p>}
              <input 
                type="email" 
                className='loginInput' 
                placeholder="Email" 
                {...register("email", { 
                  required: true,  
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
                })}
              />
              {errors.email && <p style={{color:"red", marginTop:"0"}}>Please check Email format.</p>}
              <div 
                className='loginInput' 
                style={{
                  display:"flex", 
                  alignItems:"center",
                  padding:"0", 
                }}>
                <input 
                  style={{margin:"0"}}
                  className='loginInput'
                  type={isHidden ? 'password' : 'text'} 
                  placeholder="Password" 
                  id='pass-input'
                  {...register("password", { 
                    required: true, 
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                  })}
                />
                {!eyeShown &&
                   <i class="fa-solid fa-eye"
                   style={{color:"#000", cursor: "pointer", marginRight:"10px"}} 
                   onClick={showPassword}
                 ></i>
                }
                {eyeShown &&
                  <i class="fa-solid fa-eye-slash"
                  style={{color:"#000", cursor: "pointer", marginRight:"10px"}} 
                  onClick={showPassword}
                ></i>
                }
               
              </div>
              {errors.password && <p style={{color:"red", marginTop:"0"}}>Please create strong password that consists of at least one capital letter, one small letter and one numeric, the length of the password needs to be 8 characters at most.</p>}
              <div class="btnHolder">
                <button class="btnTertiary" onClick={()=> {
                  setShowLogin(true);
                  setShowRegister(false);
                }}><i class="fa-solid fa-arrow-left" style={{marginRight:"5px"}}></i>Back</button>
                <button class="btnPrimary" 
                  type='submit'
                >Next <i class="fa-solid fa-arrow-right" style={{marginLeft:"5px"}}></i></button>
              </div>
              {alert &&
                  <div style={{width:"62%", height:"fit-content"}} className='error-login-message'>
                      <p>{errorMessage}</p>
                      <button onClick={() => {setAlert(false)} }>Ok</button>
                  </div>
              }
              {sucess &&
                 <div style={{width:"62%", height:"fit-content"}} className='error-login-message'>
                    <p>Account created successfully!!</p>
                </div>
              }
            </form>
          {/* } */}
          
          {stepTwo && 
            <RegStepTwo 
              stepTwo={stepTwo} 
              errors={errors} 
              register={register} 
              handleSubmit={handleSubmit} 
              submitStepTwo={submitStepTwo}
              setStepOne={setStepOne}
              setStepTwo={setStepTwo}
              setStepThree={setStepThree}
              setStepFour={setStepFour}
              setStepBar={setStepBar}
              setSteps={setSteps}
              setEmailCompany={setEmailCompany}
              emailCompany={emailCompany}
              entityTypeData={entityTypeData}
              setEntityTypeData={setEntityTypeData}
              companyEmailData={companyEmailData}
              setCompanyEmailData={setCompanyEmailData}
              stepOneData={stepOneData}
              setStepTwoData={setStepTwoData}
            />
          }

            {stepThree && 
              <RegStepThree 
                stepThree={stepThree}
                errors={errors}
                handleSubmit={handleSubmit}
                submitStepThree={submitStepThree}
                setStepOne={setStepOne}
                setStepTwo={setStepTwo}
                setStepThree={setStepThree}
                setStepFour={setStepFour}
                setStepBar={setStepBar}
                setSteps={setSteps}
                register={register}
                setPoBox={setPoBox}
                setCity={setCity}
                sameAsAdress={sameAsAdress}
                setSameAsAdress={setSameAsAdress}
                alert={alert}
                setAlert={setAlert}
                errorMessage={errorMessage}
                // Oval={Oval}
                isSpinner={isSpinner}
                setIsSpinner={setIsSpinner}
                setStepThreeData={setStepThreeData}
              />
            } 
          {/* {stepFour && */}
            <div class="formFinish" id="step4" style={{display: stepFour && "block"}} >
               <h1>Congratulations!</h1>
               <p>
                 Thank you for signing up with us, your account has been created. To
                 enjoy the full experience of the system, you will have to complete
                 your profile. You can do that now or do it later on your profile.
                 <br /><br />
                 We have sent you a verification email, please go to your inbox and
                 verify your account.
               </p>
     
               <div class="checker">
                 <label class="checkContainer">
                   <input 
                      className='loginInput' 
                      type="checkbox" 
                      onClick={() => {
                        firebase.database().ref('/booking_party/' + user.uid).update({
                          termsConditions: "I agree to Zipi's stipulated terms and conditions",
                        })
                      }}
                    />
                   <span class="checkmark"></span>I agree to Zipi's stipulated<a href="#" style={{marginLeft:"10px"}}>terms and conditions</a>.
                 </label>
               </div>
               <div class="checker">
                 <label class="checkContainer">
                   <input 
                    className='loginInput' 
                    type="checkbox" 
                    onClick={() => {
                      firebase.database().ref('/booking_party/' + user.uid).update({
                        receiveNewsletters: true
                      })
                    }}
                  />
                   <span class="checkmark"></span>Receive marketing and newsletter
                   notifications.
                 </label>
               </div>
     
               <div class="btnHolder">
                 <div class="btnTertiary"></div>
     
                 <button 
                    class="btnPrimary"
                    onClick={() => {
                      if(user){
                        navigate('/')
                      }else{
                        navigate('/login')
                      }
                    }}
                  >Continue <i class="fa-solid fa-arrow-right" style={{marginLeft:"5px"}}></i></button>
               </div>
             </div>
          {/* } */}
       
        </div>
      </div>
    </div>
   
    <div className='on-boarding' style={{display: onBoarding && "flex"}}>
        <div className='board-child'>
            <div className='top-board-child'>
                  <Link to='/dashboard'><img src={darkLogo} className="boarding-img" alt="zipi-logo" /></Link>
                <p>It's just so nippy!</p>
            </div>
            <div className='bottom-board-child'>
              <div>
                {!skipBoarding &&
                  <div>
                    <p onClick={() => {
                      setSkipBoarding(true)
                      setOnBoardStepThree(false)
                      setOnBoardStepTwo(false)
                      setOnBoardStepOne(false)
                    }}>Skip</p>
                  </div>
                }
                {!skipBoarding &&
                  <div>
                    <h2>{
                          onBoardStepOne && boardingArray[0].title || 
                          onBoardStepTwo && boardingArray[1].title || 
                          onBoardStepThree && boardingArray[2].title
                        }</h2>
                    <div>
                      <img src={
                        onBoardStepOne && boardingArray[0].image || 
                        onBoardStepTwo && boardingArray[1].image || 
                        onBoardStepThree && boardingArray[2].image
                        } 
                        alt="cargo-picture" 
                        // style={{width: onBoardStepTwo && "91%", height: onBoardStepTwo && "74%"}}
                      />
                    </div>
                  </div>
                }
                {!skipBoarding &&
                  <div>
                      <p>{
                          onBoardStepOne && boardingArray[0].subtitle || 
                          onBoardStepTwo && boardingArray[1].subtitle || 
                          onBoardStepThree && boardingArray[2].subtitle
                        }
                      </p>
                      <p>{
                          onBoardStepOne && boardingArray[0].context || 
                          onBoardStepTwo && boardingArray[1].context || 
                          onBoardStepThree && boardingArray[2].context
                        } 
                      </p>
                  </div>
                }
                  
                {skipBoarding &&
                  <>
                    <div className="last-block">
                      <h2>What would you like to do?</h2>
                      <p>You can choose multiple options if you wish. You will have to complete your profile before you can make transactions after signing up</p>
                    </div>
                    <div className='options-container'>
                        <div 
                          style={{background: boardingActiveOne && "rgb(255, 226, 43)"}} 
                          className='board-options'
                          onClick={(e) => {
                            setCustomer(!customer)
                            setBoardingActiveOne(!boardingActiveOne)
                          }}  
                        >
                            <div>
                              <img src={cargo} alt="" />
                            </div>
                            <p>Customer</p>
                        </div>
                        <div
                          style={{background: boardingActiveTwo && "rgb(255, 226, 43)"}}
                          className='board-options'
                          onClick={(e) => {
                            setFleetOwner(!fleetOwner)
                            setBoardingActiveTwo(!boardingActiveTwo)
                          }}
                        >
                            <div>
                              <img src={Fleet} alt="" />
                            </div>
                            <p>Fleet Owner</p>
                        </div>
                        <div 
                          style={{background: boardingActiveThree && "rgb(255, 226, 43)"}} 
                          className='board-options'
                          values="Sales Agent"
                           onClick={(e) => {
                            setSalesAgent(!salesAgent)
                            setBoardingActiveThree(!boardingActiveThree)
                          }}
                        >
                            <div>
                              <img src={Sales} alt="" />
                            </div>
                            <p>Sales Agent</p>
                        </div>
                    </div>
                  </>
                }
                <div className='indicators'>
                    <div onClick={() => {
                      setOnBoardStepOne(true)
                      setOnBoardStepTwo(false)
                      setOnBoardStepThree(false)
                      setSkipBoarding(false)
                    }} 
                      style={{
                        width: onBoardStepOne && "13px", 
                        height: onBoardStepOne && "13px", 
                        background: onBoardStepOne && "#ffe22b"
                      }}
                    ></div>
                    <div onClick={() => {
                      setOnBoardStepOne(false)
                      setOnBoardStepTwo(true)
                      setOnBoardStepThree(false)
                      setSkipBoarding(false)
                    }}
                    style={{
                        width: onBoardStepTwo && "13px", 
                        height: onBoardStepTwo && "13px", 
                        background: onBoardStepTwo && "#ffe22b"
                    }}
                    ></div>
                    <div onClick={() => {
                      setOnBoardStepOne(false)
                      setOnBoardStepTwo(false)
                      setOnBoardStepThree(true)
                      setSkipBoarding(false)
                    }}
                    style={{
                        width: onBoardStepThree && "13px", 
                        height: onBoardStepThree && "13px", 
                        background: onBoardStepThree && "#ffe22b"
                    }}
                    ></div>
                    <div onClick={() => {
                      if(onBoardStepOne){
                        setOnBoardStepTwo(true)
                        setOnBoardStepOne(false)
                      }else if(onBoardStepTwo){
                        setOnBoardStepThree(true)
                        setOnBoardStepTwo(false)
                      }else if(onBoardStepThree){
                        setSkipBoarding(true)
                        setOnBoardStepThree(false)
                      }else if(skipBoarding){
                        if(customer === true || fleetOwner === true || salesAgent === true){
                          setShowRegister(true)
                          setOnBoarding(false)
                          setShowLogin(false)
                          setStepOne(true)
                        }else{
                          setAlert(true)
                          setErrorMessage("Please select one or more options")
                        }
                      }
                    }}
                    style={{background: skipBoarding && "#ffe22b"}}
                    ><i class="fa-solid fa-chevron-right"></i></div>
                  </div>
              </div>
            </div>
        </div>
        {alert &&
            <div 
              className='error-login-message'
              style={{width: "12%", height: "fit-content", padding:"15px"}}
            >
                <p>{errorMessage}</p>
                <button onClick={() => {setAlert(false)} }>Ok</button>
            </div>
        }
    </div>
  </div>
  )
}

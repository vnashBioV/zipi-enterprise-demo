import React, {useState, useEffect, useRef} from 'react'
export default function RegStepThree({
    stepThree,
    errors, 
    handleSubmit, 
    submitStepThree,
    setStepOne,
    setStepTwo,
    setStepThree,
    setStepFour,
    setStepBar,
    setSteps,
    register,
    setPoBox,
    setCity,
    sameAsAdress,
    setSameAsAdress,
    registerUser,
    alert, 
    setAlert,
    errorMessage,
    Oval,
    isSpinner, 
    setIsSpinner,
    setStepThreeData
}) {


    const handleChange = event => {
        setSameAsAdress(current => !current);
        setPoBox('')
        setCity('')
    };

  return (
    <form class="fill-in-form" id="step3" style={{display: stepThree && "block", position:"relative"}} onSubmit={handleSubmit(submitStepThree)}>
        <p>
            Let's get your company's contact details by filling in the below
            information.
        </p>
        <input 
            className='loginInput' 
            type="text" 
            placeholder="Complex/ Office Number" 
            onChange={(e) => {
                setStepThreeData({
                  officeNumber: e.target.value
                })
            }} 
        />
        <input 
            className='loginInput'  
            type="text" 
            placeholder="Physical Address"
            onChange={(e) => setStepThreeData((prevState) => ({
                ...prevState,
                    physicalAddress:e.target.value
                }))
            }
        />
        <input 
            className='loginInput' 
            type="text" 
            placeholder="Telephone" 
            onChange={(e) => setStepThreeData((prevState) => ({
                ...prevState,
                    Telephone:e.target.value
                }))
            }
        />
        {/* <div class="checker">
            <label class="checkContainer">
                <input type="checkbox" onChange={handleChange} checked={sameAsAdress}/>
                <span class="checkmark"></span>Postal address same as physical
                address
            </label>
        </div> */}
        {/* <input 
            type="text" 
            placeholder="P.O Box" 
            disabled = {sameAsAdress ? "disabled" : ""}
            className={`loginInput ${sameAsAdress && "disabled:opacity-50"}`}
            onChange={(e) => {
                setPoBox(e.target.value)
            }}
        /> */}
        <input 
            type="text" 
            disabled = {sameAsAdress ? "disabled" : ""}
            className={`loginInput ${sameAsAdress && "disabled:opacity-50"}`}
            placeholder="City" 
            onChange={(e) => {
                setCity(e.target.value)
            }}
        />
        <div class="btnHolder">
        <button class="btnTertiary"
            onClick={() => {
            setStepOne(false);
            setStepTwo(true);
            setStepThree(false);
            setStepFour(false);
            setStepBar("40%")
            setSteps(2)
            }}
        ><i class="fa-solid fa-arrow-left" style={{marginRight:"5px"}}></i>Back</button>                
        <button
            type='submit'
            class="btnPrimary">Next <i class="fa-solid fa-arrow-right" style={{marginLeft:"5px"}}></i></button>
        </div>
       
        {/* {isSpinner && 
            <div className='flex flex-col justify-center items-center w-full h-full absolute'>
                <Oval
                height={80}
                width={80}
                color="grey"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffe200"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
            </div>
        } */}
    </form>
  )
}

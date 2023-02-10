import React from 'react'

export default function RegStepTwo({
    stepTwo, 
    errors, 
    handleSubmit, 
    submitStepTwo,
    setStepOne,
    setStepTwo,
    setStepThree,
    setStepFour,
    setStepBar,
    setSteps,
    register,
    emailCompany,
    setEmailCompany,
    entityTypeData,
    setEntityTypeData,
    companyEmailData,
    setCompanyEmailData,
    stepOneData,
    setStepTwoData
}) {

  const handleChange = event => {
    setEmailCompany(current => !current);
    setCompanyEmailData(stepOneData?.email)
  };

  return (
    <form class="fill-in-form" id="step2" style={{display: stepTwo && "block"}}  onSubmit={handleSubmit(submitStepTwo)}>
              <p>
                On to your company details. You're almost there, fill in the below and continue.
              </p>
              <input 
                type="text" 
                className='loginInput' 
                placeholder="Company Name" 
                onChange={(e) => {
                  setStepTwoData({
                    companyName: e.target.value
                  })
                }}  
              />
                {/* <select 
                    className='loginInput'
                    name='entityType'
                    onChange={(e) => setEntityTypeData(e.target.value)}
                >
                  <option value="0">Entity type:</option>
                  <option value="(PTY) Ltd">(PTY) Ltd</option>
                  <option value="BMW">BMW</option>
                </select> */}
              <input 
                type="text" 
                className='loginInput' 
                placeholder="CoReg (Registration number)" 
                onChange={(e) => setStepTwoData((prevState) => ({
                  ...prevState,
                        companyRegistration:e.target.value
                  }))
                }
              />
              <div class="checker">
                <label class="checkContainer">
                  <input type="checkbox" onChange={handleChange} checked={emailCompany}/>
                  <span class="checkmark"></span>Company email same as login
                  address
                </label>
              </div>
              <input 
                type="email" 
                placeholder={emailCompany && `${stepOneData?.email}`}
                disabled = {emailCompany ? "disabled" : ""}
                className={`loginInput ${emailCompany && "disabled:opacity-50"}`}
                onChange={(e) => {
                  setCompanyEmailData(e.target.value)
                }}
              />
              <div class="btnHolder">
                <button class="btnTertiary"
                  onClick={() => {
                    setStepOne(true);
                    setStepTwo(false);
                    setStepThree(false);
                    setStepFour(false);
                    setStepBar("20%")
                    setSteps(1)
                  }}
                ><i class="fa-solid fa-arrow-left" style={{marginRight:"5px"}}></i>Back</button>
                <button class="btnPrimary" 
                    type='submit'
                >Next <i class="fa-solid fa-arrow-right" style={{marginLeft:"5px"}}></i></button>
              </div>
            </form>
  )
}

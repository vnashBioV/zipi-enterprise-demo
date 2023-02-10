import './App.css';
import React, {useState, useEffect,} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Enterprise from './screens/Enterprise';
import Schedule from './screens/Schedule';
import Login from './screens/Login'
import RegistrationTwo from './screens/RegistrationTwo';
import BiddingPageTwo from './screens/BiddingPageTwo';
import TrackingPage from './components/TrackingPage';
import ExportPdfComponent from './components/PdfComponent';
import TestinContext from './screens/TestinContext';
import SelectedBookingContext from './context/SelectedBooking'
import {StateSingleSelected} from './context/SingleSelectedBooking';
import {StateContextAllPrices} from './context/SelectAllPricesContext'
import {SelectedTotal} from './context/SelectedTotal'
import Dashboard from './screens/Dashboard';
import Cargo from './components/Cargo';
import Myfleet from './components/Myfleet';
import Myreferrals from './components/Myreferrals';
import Profile from './components/Profile';
import Analysis from './components/Analysis';
import Wallet from './components/Wallet';
import ContactLink from './components/ContactLink';
import { StateContext } from './context/DashboardStateContext'
import { AddressStateContext } from './context/BookingAddress'
import { AddressStateContextTwo } from './context/BookingAddressTwo'
import { AllBookingsContext } from './context/AllBookingsContext'
import {StateBidding} from './context/BiddingStatesContext'
import GetHelp from './components/GetHelp';
import ForgotPassword from './components/ForgotPassword';


function App() {
  const [selectedValue, setSelectedValue] = useState('hello from context')
  const [allPricesValue, setAllPricesValue] = useState('hello from context')
  const [selectedTotalValue, setSelectedTotalValue] = useState('hello from context')

  return (
    <div className='app'>
        <BrowserRouter>
        <StateBidding>
          <AllBookingsContext>
            <AddressStateContextTwo>
              <AddressStateContext>
                <StateContext>
                  <SelectedTotal.Provider value={{selectedTotalValue, setSelectedTotalValue}}>
                    <StateContextAllPrices>
                      <StateSingleSelected>
                        <Routes>
                          <Route exact path='/enterprise' element={<Enterprise />} />
                          <Route exact path='/schedule' element={<Schedule />} />
                          <Route exact path='/Login' element={<Login />} />
                          <Route exact path='/registration' element={<RegistrationTwo />} />
                          <Route exact path='/bidding' element={<BiddingPageTwo />} />
                          <Route exact path='/tracking' element={<TrackingPage />} />  
                          <Route exact path='/dashboard' element={<Dashboard />} />                        
                          <Route exact path='/pdfexport' element={<ExportPdfComponent />} />
                          <Route exact path='/' element={<Dashboard />} />
                          <Route exact path='/fleet' element={<Myfleet />} />
                          <Route exact path='/referals' element={<Myreferrals />} />
                          <Route exact path='/profile' element={<Profile />} />
                          <Route exact path='/analysis' element={<Analysis />} />
                          <Route exact path='/wallet' element={<Wallet />} />
                          <Route exact path='/cargo' element={<Cargo />} />
                          <Route exact path='/gethelp' element={<GetHelp/>} />
                          <Route exact path='/contactLink' element={<ContactLink />} />
                          <Route exact path='/forgotpassword' element={< ForgotPassword/>} />
                          {/* <Route exact path='/setdata' element={<SetDataToContext />} /> */}
                        </Routes>
                      </StateSingleSelected>
                    </StateContextAllPrices>
                  </SelectedTotal.Provider>
                </StateContext>
              </AddressStateContext>
            </AddressStateContextTwo>
          </AllBookingsContext>
          </StateBidding>
        </BrowserRouter>
    </div>
  );
}

export default App;

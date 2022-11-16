import './App.css';
import React, {useState, useEffect,} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Enterprise from './screens/Enterprise';
import Schedule from './screens/Schedule';
import Login from './screens/Login'
import RegistrationTwo from './screens/RegistrationTwo';
// import BiddingPage from './screens/BiddingPage';
import BiddingPageTwo from './screens/BiddingPageTwo';
// import Spinner from './components/Spinner';
import TrackingPage from './components/TrackingPage';
import ExportPdfComponent from './components/PdfComponent';
// import SetDataToContext from './screens/SetDataToContext'
import TestinContext from './screens/TestinContext';
import SelectedBookingContext from './context/SelectedBooking'
import {UserContext} from './context/NewContext';
import {AllPricesContext} from './context/SelectAllPricesContext'
import {SelectedTotal} from './context/SelectedTotal'
import {AllBookingsContext} from './context/AllBookingsContext'

function App() {
  // const [allbookingsValue, setAllBookingsValue] = useState('hello from context')
  // const {allBookingValue, setAllBookingValue}  = useContext(AllBookingsContext)
  const [selectedValue, setSelectedValue] = useState('hello from context')
  const [allPricesValue, setAllPricesValue] = useState('hello from context')
  const [selectedTotalValue, setSelectedTotalValue] = useState('hello from context')

  return (
    <div className='app'>
        <BrowserRouter>
        {/* <AllBookingsContext.Provider value={{allbookingsValue, setAllBookingsValue}}> */}
        <SelectedTotal.Provider value={{selectedTotalValue, setSelectedTotalValue}}>
        <AllPricesContext.Provider value={{allPricesValue, setAllPricesValue}}>
        <UserContext.Provider value={{selectedValue, setSelectedValue}}>
          <Routes>
            <Route exact path='/' element={<Enterprise />} />
            <Route exact path='/schedule' element={<Schedule />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/registration' element={<RegistrationTwo />} />
            <Route exact path='/bidding' element={<BiddingPageTwo />} />
            <Route exact path='/tracking' element={<TrackingPage />} />
            <Route exact path='/pdfexport' element={<ExportPdfComponent />} />
            {/* <Route exact path='/setdata' element={<SetDataToContext />} /> */}
          </Routes>
        </UserContext.Provider>
        </AllPricesContext.Provider>
        </SelectedTotal.Provider>
        {/* </AllBookingsContext.Provider> */}
        </BrowserRouter>
    </div>
  );
}

export default App;

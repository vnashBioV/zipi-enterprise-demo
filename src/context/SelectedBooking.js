import {createContext} from 'react';

const SelectedBookingContext = createContext({
  selected_booking: new Object(),
  set_selected_booking: new_state => {},
});

export default SelectedBookingContext;
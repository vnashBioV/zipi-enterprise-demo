import {createContext} from 'react';

const TestinContext = createContext({
  testing_context: new Object(),
  set_testing_context: new_state => {},
});

export default TestinContext;

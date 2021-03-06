import React, { createContext, useContext } from 'react';

// import  the reducer from ./reducers.js
import { useUserReducer } from './reducers';

const StoreContext = createContext();

const { Provider } = StoreContext;

export const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useUserReducer({
    routines: [],
    exercises: []
  });

  console.log(state);
  return <Provider value={[state, dispatch]} {...props}></Provider>;
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

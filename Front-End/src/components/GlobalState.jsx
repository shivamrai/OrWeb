import React, { createContext, useReducer } from 'react';
import PreFillReducer from './PreFillReducer.jsx';

const initialState = {
  setupDetails: {
    MinifyEnabled: "",
    OverloadAggressively: "",
    ShrinkResources:"",
    OptimizationGradle:"",
    OptimizationFullModeR8:"",
    GSONKeepRulesEnable: "Yes",
    Attributes:[],
    LibraryChipInput: [],
    DataClassChipInput: [],
    InterfaceChipInput:[],
    WarningChipInput: [],
    PrintseedsStats: "",
    R8OutputCFG: "",
    ShrinkedClassesStats:"",
    WebviewRule:"",
    EnumRule:"",
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalState = ({ children }) => {
  const [state, dispatch] = useReducer(PreFillReducer, initialState);

// Actions
function addsetupDetails(setupDetails) {
  dispatch({
    type: 'ADD_DATA',
    payload: setupDetails
  });
}

  return (
    <GlobalContext.Provider value={[state ,dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
}
export default GlobalState;

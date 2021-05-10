import React, {createContext, useReducer} from 'react';
import PreFillReducer from './PreFillReducer.jsx';

const initialState = {
    setupDetails: {
        MinifyEnabled: "Yes",
        OverloadAggressively: "No",
        ShrinkResources: "No",
        OptimizationGradle: "No",
        OptimizationFullModeR8: "No",
        GSONKeepRulesEnable: "Yes",
        Attributes: [],
        LibraryChipInput: [],
        DataClassChipInput: [],
        InterfaceChipInput: [],
        WarningChipInput: [],
        PrintseedsStats: "No",
        R8OutputCFG: "No",
        ShrinkedClassesStats: "No",
        WebviewRule: "No",
        EnumRule: "No",
    }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalState = ({children}) => {
    const [state, dispatch] = useReducer(PreFillReducer, initialState);

// Actions
    function addsetupDetails(setupDetails) {
        dispatch({
            type: 'ADD_DATA',
            payload: setupDetails
        });
    }

    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
}
export default GlobalState;

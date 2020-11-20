import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Hightlight from './components/highlighttTooltip';
import TextEditor from './components/textEditor';
import Risks from './components/Risks';
import { DevTool } from "little-state-machine-devtools"; //enable for state checking
import {StateMachineProvider,createStore} from "little-state-machine";
import Introduction from './components/Introduction';
import MainAppBar  from './components/MainAppBar';
import BasicSetup from './components/BasicSetup';
import MultiStepForm from './components/MultiStepForm';

createStore({
  setupDetails: {
    MinifyEnabled: "",
    OverloadAggressively: "",
    ShrinkResources:"",
    OptimizationGradle:"",
    OptimizationFullModeR8:"",
    GSONKeepRulesEnable: "",
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
});
function App() {
  return (
    <div className="App">
      <MainAppBar />
      <DevTool />
      <header className="App-header">
        <StateMachineProvider>
          <div className="container">
            <Router>
              <MultiStepForm />
            </Router>
          </div>
        </StateMachineProvider>
      </header>
  </div>
  );
}

export default App;

import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Introduction from "./Introduction";
import BasicSetup from "./BasicSetup";
import ClassAndDataExceptions from "./ClassAndDataExceptions";
import AnnotationsAndPackages from "./AnnotationsAndPackages";
import Diagnostics from "./Diagnostics";
import Result from "./Result";

export const MultiStepForm = () => {
  const location = useLocation();
  return (
    <>
      <nav className="container">
        <ul className="steps">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Introduction</Link>
          </li>
          <li className={location.pathname === "/basicSetup" ? "active" : ""}>
            <Link to="/basicSetup">Basic Setup</Link>
          </li>
          <li className={location.pathname === "/classAndDataExceptions" ? "active" : ""}>
            <Link to="/classAndDataExceptions">Classes Exception</Link>
          </li>
          <li className={location.pathname === "/annotationsAndPackages" ? "active" : ""}>
            <Link to="/basicSetup">Packages Exception</Link>
          </li>
          <li className={location.pathname === "/diagnostics" ? "active" : ""}>
            <Link to="/basicSetup">Print Results</Link>
          </li>
          <li className={location.pathname === "/result" ? "active" : ""}>
            <Link to="/result">Result</Link>
          </li>
        </ul>
      </nav>
      <Route exact path="/" component={Introduction} />
      <Route path="/basicSetup" component={BasicSetup} />
      <Route path="/classAndDataExceptions" component={ClassAndDataExceptions} />
      <Route path="/annotationsAndPackages" component={AnnotationsAndPackages} />
      <Route path="/diagnostics" component={Diagnostics} />
      <Route path="/result" component={Result} />
    </>
  );
};

export default MultiStepForm;

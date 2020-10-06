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

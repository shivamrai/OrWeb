import React from "react";
import {useForm, useStep} from "react-hooks-helper";
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
import FileUpload from "./FileUpload";
import Result from "./Result";
import {ModalRoot, ModalProvider} from 'react-multi-modal';


const MultiStepForm = () => {
    const location = useLocation();
    const [appState, setAppState] = React.useState({
        "Annotation": "Annotation",
        "Attributes": [],
        "DataClassChipInput": [
            "com.example.test4.TestB",
            "com.example.test5.TestB"
        ],
        "Deprecated": "Deprecated",
        "EnclosingMethod": "EnclosingMethod",
        "EnumRule": "Yes",
        "Exceptions": "Exceptions",
        "GSONKeepRulesEnable": "Yes",
        "InnerClasses": "InnerClasses",
        "InterfaceChipInput": [
            "TestCInterface"
        ],
        "LibraryChipInput": [
            "TestBLibrary"
        ],
        "LineNumberTable": "LineNumberTable",
        "MethodParameters": "MethodParameters",
        "MinifyEnabled": "",
        "OptimizationFullModeR8": "",
        "OptimizationGradle": "",
        "OverloadAggressively": "Yes",
        "PrintseedsStats": "Yes",
        "R8OutputCFG": "Yes",
        "ShrinkResources": "",
        "ShrinkedClassesStats": "Yes",
        "Signature": "Signature",
        "SourceFile": "SourceFile",
        "Synthetic": "Synthetic",
        "WarningChipInput": [
            "TestELibrary"
        ],
        "WebviewRule": ""
    });
    return (
        <>
            <Route exact path="/" component={Introduction}/>
            <Route path="/basicSetup" component={BasicSetup}/>
            <Route path="/fileUpload" component={FileUpload}/>
            <Route path="/classAndDataExceptions" component={ClassAndDataExceptions}/>
            <Route path="/annotationsAndPackages" component={AnnotationsAndPackages}/>
            <Route path="/diagnostics" component={Diagnostics}/>
            <Route path="/result" component={Result}/>
        </>
    );
};

export default MultiStepForm;

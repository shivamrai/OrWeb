from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import request

import os
import json
import ast

app = Flask(__name__, instance_relative_config=True)
api = Api(app)
cors = CORS(app, resources={r"/hello": {"origins": "http://localhost:port"}})
test_config = None


app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'application.sqlite'),
)

if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# a simple page that says hello
@app.route('/hello',methods = ['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def hello():
    return 'Hello, World!'

# return app

#formdataload
@app.route('/submit_form', methods=["GET","POST"])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def processObfuscationFlags():
    if request.method == "POST":
        input_json = request.get_json(force=True)
        print(input_json)
        output = {}
        gradleConfig,rulesPro,gradleProperties= "","","android.enableR8 = true \n"
        hints = []
        keepRules = "@Keep\n"
        #Part 1 Gradle Setup
        MinifyEnabled=input_json.get("MinifyEnabled")
        if(MinifyEnabled=='yes'):
            gradleConfig+="minifyEnabled true \n"
            hints.append({})
        if(input_json.get("ShrinkResources")=='yes'):
            gradleConfig+="shrinkResources true \n"
        OptimizationGradle=input_json.get("OptimizationGradle")
        if(OptimizationGradle=='yes'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android-optimize.txt\'),\'proguard-rules.pro\' \n"
        elif(input_json.get("OptimizationGradle")=='no'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android.txt\'),\'proguard-rules.pro\' \n"
        if(input_json.get("optimizationFullModeR8")=='yes' and OptimizationGradle=="yes"):
            gradleProperties+="android.enableR8.fullMode=true\n"
            rulesPro+="-allowaccessmodification\n"
        print(gradleConfig)
        #Part 2 Rule Setup
        #flags
        if(input_json.get("MinifyEnabled")=='no'):
            rulesPro+="-dontobfuscate\n"
            obfuscateDict = {}
            obfuscateDict["key"] = "-donotobfuscate"
            obfuscateDict["label"] = definitions.get("-donotobfuscate")
            hints.append(obfuscateDict)
        if(input_json.get("OverloadAggressively")=='yes' and MinifyEnabled == 'yes'):
            rulesPro+="-overloadaggressively\n"
        if(input_json.get("ShrinkResources")=='no'):
            rulesPro+="-dontshrink\n"
            hintDict = {}
            hintDict["key"] = "-dontshrink	"
            hintDict["label"] = definitions.get("-dontshrink")
            hints.append(hintDict)
        #keepRules
        if(input_json.get("GSONKeepRulesEnable")=='yes'):
            rulesPro+="-keepclassmembers,allowobfuscation class * { \n@com.google.gson.annotations.SerializedName <fields>;\n}\n"
        DataClassChipInput = input_json.get("DataClassChipInput")
        if(DataClassChipInput):
            for className in DataClassChipInput:
                rulesPro+=keepRules(className,"class")
        LibraryChipInput = input_json.get("LibraryChipInput")
        for className in LibraryChipInput:
            rulesPro+="-keepnames class "+(className)
        #suppress warnings for packages/classes/libraries
        PackagesChipInput = input_json.get("PackagesChipInput")
        for className in PackagesChipInput:
            rulesPro+="-donotwarn "+className+".** \n"
        if "keep" in rulesPro:
            keepDict = {}
            keepDict["key"]="-keep"
            keepDict["label"] = definitions.get("-keep")
            hints.append(keepDict)

        print(rulesPro)
        if(input_json.get("WebviewRule")=='yes'):
            rulesPro+="-keepclassmembers class fqcn.of.javascript.interface.for.webview { \npublic *;\n}"
        #-keepattributes
        attributes = ""
        InnerClasses = input_json.get("InnerClasses")
        Signature = input_json.get("Signature")
        Deprecated=input_json.get("Deprecated")
        Annotation=input_json.get("*Annotation*")
        EnclosingMethod=input_json.get("EnclosingMethod")
        Exceptions=input_json.get("Exceptions")
        SourceFile=input_json.get("SourceFile")
        LineNumberTable=input_json.get("LineNumberTable")
        if(InnerClasses):
            attributes+="InnerClasses, "
        if(Signature):
            attributes+="Signature, "
        if(Deprecated):
            attributes+="Deprecated, "
        if(Annotation):
            attributes+="Annotation, "
        if(EnclosingMethod):
            attributes+="EnclosingMethod, "
        if(SourceFile):
            attributes+="SourceFile, "
        if(LineNumberTable):
            attributes+="LineNumberTable, "
        if(Exceptions):
            attributes+="Exceptions, "
        attributes = attributes[:-2]
        if(InnerClasses or Signature or Deprecated or Annotation or EnclosingMethod or SourceFile or LineNumberTable or Exceptions):
            rulesPro+="-keepattributes "+attributes
            attributeDict = {}
            attributeDict["key"] = "-keepattributes"
            attributeDict["label"] = definitions.get("-keepattributes")
            hints.append(attributeDict)
        print(rulesPro)
        #Diagnostics
        if(input_json.get("VerboseStats")=='yes' and "OptimizationGradle"=="No"):
            rulesPro+="-verbose\n"
        if(input_json.get("R8OutputCFG")=='yes'):
            rulesPro+="-printconfiguration \n"
        if(input_json.get("ShrinkedClassesStats")=='yes'):
            rulesPro+="-printusage \n"
        hints.pop(0)
        output["rulesPro"]= rulesPro
        output["gradleConfig"] = gradleConfig
        output["gradleProperties"] = gradleProperties
        output["hints"] = hints
        print(output)
        return output
    return "success"
    def keepRules(className,type):
        return "-keep "+ type + " " +className+".** { *; } \n"

definitions =  {
    "-keep": "Exclude matching classes, and matching members if specified, from shrinking, optimization, and renaming. Shrinking exclusion on the class means that members will not be removed but does not prevent members from being renamed. Specifying members will prevent them from being renamed if present.",
    "-dontobfuscate	": "Do not apply renaming, regardless of other configuration.",
    "-dontoptimize": "Do not optimize the code, regardless of other configuration. This is part of the default configuration.",
    "-dontshrink": "Do not remove any classes, methods, or fields, regardless of other configuration. (ProGuard docs)",
    "-keepattributes": "Allows you to specify supported Java™ attributes for R8 to retain in the code.8 does not respect rules regarding Synthetic, Deprecated, or MethodParameters and will remove these attributes regardless of what is configured in -keepattributes.",
    "-printconfiguration": "Outputs the used configuration rules to the specified file, or to stdout if there is no file specified.",
    "-printusage": "Outputs a list of the classes, methods, and fields which were removed during shrinking to the specified file, or to stdout if there is no file specified.",
    "-includedescriptorclasses": "Prevent specified field types, method return types, and method parameter types from being renamed. This preserves field and method signatures (post type-erasure, e.g. this does not preserve generic types).",
    "-keepclasseswithmembernames": "Prevent matching classes and matching members from being renamed if the corresponding class contains all of the specified members.",
    "-keeppackagenames": "Don’t rename packages which match the filter.",
    "-overloadaggressively": "Use the same name as much as possible, even if it may not be allowed by the source language.",
    "-dontskipnonpubliclibraryclassmembers":" Do not skip on non public library class members",
    "-keepnames":"Specifies classes and class members whose names are to be preserved, if they aren't removed in the shrinking phase."
    }
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")

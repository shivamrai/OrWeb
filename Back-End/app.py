from flask import Flask, flash, request, redirect, url_for
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import request
from werkzeug.utils import secure_filename

UPLOADS = '/uploads'
ALLOWED_EXTENSIONS = {'txt','pro'}



import os
import json
import ast

app = Flask(__name__, instance_relative_config=True)
api = Api(app)
cors = CORS(app, resources={r"/hello": {"origins": "http://localhost:port"}})
test_config = None
app.config['UPLOAD_FOLDER'] = UPLOADS

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

#autofilldata
@app.route('/populate_form', methods=["POST"])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def processPreFilledDataFromPRO():
    if request.method == 'POST':
        # check if the post request has the file part
        print(request.files)
        if 'file' not in request.files:
            flash('No file part')
            return "invalid file/upload"
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return "no file uploaded"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOADS'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return "upload again"

#upload route
@app.route('/upload',methods=["GET","POST"])
def uploadConf():
    if request.method == "POST":
        print("Posted file: {}".format(request.files['file']))
        textFile = request.files["file"]
        print(textFile)

        contents = textFile.read()
        print(contents)
        return "Successful"

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
        if(input_json.get("ShrinkResources")=='yes'):
            gradleConfig+="shrinkResources true \n"

        OptimizationGradle=input_json.get("OptimizationGradle")
        if(OptimizationGradle=='yes'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android-optimize.txt\'),\'proguard-rules.pro\' \n"
        elif(input_json.get("OptimizationGradle")=='no'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android.txt\'),\'proguard-rules.pro\' \n"
        if(input_json.get("OptimizationFullModeR8")=='yes' and OptimizationGradle=="yes"):
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
            aggressiveDict = {}
            aggressiveDict["key"] = "-overloadaggressively"
            aggressiveDict["label"] = definitions.get("-overloadaggressively")
            hints.append(aggressiveDict)
        if(input_json.get("ShrinkResources")=='no' and OptimizationGradle=='yes'):
            rulesPro+="-dontshrink\n"
            hintDict = {}
            hintDict["key"] = "-dontshrink	"
            hintDict["label"] = definitions.get("-dontshrink")
            hints.append(hintDict)
        #keepRules
        if(input_json.get("GSONKeepRulesEnable")=='yes'):
            rulesPro+="-keepclassmembers,allowobfuscation class * { \n@com.google.gson.annotations.SerializedName <fields>;\n}\n"
            gsonDict = {}
            gsonDict["key"] = "-keepclassmembers"
            gsonDict["label"] = definitions.get("-keepclassmembers")
            hints.append(gsonDict)
        DataClassChipInput = input_json.get("DataClassChipInput")
        if(DataClassChipInput):
            for className in DataClassChipInput:
                rulesPro+=keepRulesAdd(className,"class")
        LibraryChipInput = input_json.get("LibraryChipInput")
        for className in LibraryChipInput:
            rulesPro+="-keepnames class "+(className)
        #suppress warnings for packages/classes/libraries
        WarningChipInput = input_json.get("WarningChipInput")
        if(WarningChipInput!=[]):
            for className in WarningChipInput:
                rulesPro+="-donotwarn "+className+".** \n"
                warnDict = {}
                warnDict["key"]="-dontwarn"
                warnDict["label"] = definitions.get("-dontwarn")
                hints.append(warnDict)
        #interface keep rules
        InterfaceChipInput = input_json.get("InterfaceChipInput")
        if(InterfaceChipInput!=[]):
            for className in InterfaceChipInput:
                rulesPro+=keepRulesAdd(className,"interface")

        if "keep" in rulesPro:
            keepDict = {}
            keepDict["key"]="-keep"
            keepDict["label"] = definitions.get("-keep")
            hints.append(keepDict)
        #javascript webview issue rule
        if(input_json.get("WebviewRule")=='yes'):
            rulesPro+="-keepclassmembers class fqcn.of.javascript.interface.for.webview { \npublic *;\n}"
        if "keepclassmembers" in rulesPro:
            keepClassMembersDict = {}
            keepClassMembersDict["key"]="-keepclassmembers"
            keepClassMembersDict["label"]=definitions.get("-keepclassmembers")
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
        Synthetic= input_json.get("Synthetic")
        MethodParameters = input_json.get("MethodParameters")
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
        if(Synthetic):
            attributes+="Synthetic, "
        if(MethodParameters):
            attributes+="MethodParameters, "
        attributes = attributes[:-2]
        if(InnerClasses or Signature or Deprecated or Annotation or EnclosingMethod or SourceFile or LineNumberTable or Exceptions or Synthetic or MethodParameters):
            rulesPro+="-keepattributes "+attributes+"\n"
            attributeDict = {}
            attributeDict["key"] = "-keepattributes"
            attributeDict["label"] = definitions.get("-keepattributes")
            hints.append(attributeDict)
        print(rulesPro)
        #Diagnostics
        diagnosticsDict = {}
        if(input_json.get("PrintseedsStats")=='yes'):
            rulesPro+="-printseeds\n"
            diagnosticsDict["key"] = "-printseeds"
            diagnosticsDict["label"] = definitions.get("-printseeds")
        if(input_json.get("R8OutputCFG")=='yes'):
            rulesPro+="-printconfiguration \n"
            diagnosticsDict["key"] = "-printconfiguration"
            diagnosticsDict["label"] = definitions.get("-printconfiguration")
        if(input_json.get("ShrinkedClassesStats")=='yes'):
            rulesPro+="-printusage \n"
            diagnosticsDict["key"] = "-printusage"
            diagnosticsDict["label"] = definitions.get("-printusage")
        hints.append(diagnosticsDict)
        hints.pop(0)
        output["rulesPro"]= rulesPro
        output["gradleConfig"] = gradleConfig
        output["gradleProperties"] = gradleProperties
        output["hints"] = hints
        print(output)
        return output
    return "success"
def keepRulesAdd(className,type):
    return "-keep "+ type + " " +className+".** { *; } \n"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



definitions =  {
    "-keep": "Exclude matching classes, and matching members if specified, from shrinking, optimization, and renaming. Shrinking exclusion on the class means that members will not be removed but does not prevent members from being renamed. Specifying members will prevent them from being renamed if present.",
    "-dontobfuscate	": "Do not apply renaming, regardless of other configuration.",
    "-dontoptimize": "Do not optimize the code, regardless of other configuration. This is part of the default configuration.",
    "-dontshrink": "Do not remove any classes, methods, or fields, regardless of other configuration. ",
    "-dontwarn": "Specifies not to warn about unresolved references and other important problems at all. The optional filter is a regular expression; ProGuard doesn't print warnings about classes with matching names.",
    "-keepattributes": "Allows you to specify supported Java™ attributes for R8 to retain in the code.8 does not respect rules regarding Synthetic, Deprecated, or MethodParameters and will remove these attributes regardless of what is configured in -keepattributes.",
    "-printconfiguration": "Outputs the used configuration rules to the specified file, or to stdout if there is no file specified.",
    "-printusage": "Outputs a list of the classes, methods, and fields which were removed during shrinking to the specified file, or to stdout if there is no file specified.",
    "-includedescriptorclasses": "Prevent specified field types, method return types, and method parameter types from being renamed. This preserves field and method signatures (post type-erasure, e.g. this does not preserve generic types).",
    "-keepclasseswithmembernames": "Prevent matching classes and matching members from being renamed if the corresponding class contains all of the specified members.",
    "-keeppackagenames": "Don’t rename packages which match the filter.",
    "-overloadaggressively": "Use the same name as much as possible, even if it may not be allowed by the source language.",
    "-dontskipnonpubliclibraryclassmembers":" Do not skip on non public library class members",
    "-keepnames":"Specifies classes and class members whose names are to be preserved, if they aren't removed in the shrinking phase.",
    "-keepclassmembers":"Exclude matching members in matching classes from shrinking, optimization, and renaming.",
    "-printseeds":"Outputs a list of the classes, methods, and fields which match the keep rules to the specified file, or to stdout if there is no file specified. "
    }

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")

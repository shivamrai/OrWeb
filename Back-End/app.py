from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask import request

# from data import cities_count

import os
import json
import ast
# import pandas as pd
# import numpy as np

app = Flask(__name__, instance_relative_config=True)
api = Api(app)
cors = CORS(app, resources={r"/hello": {"origins": "http://localhost:port"}})
test_config = None
# def create_app(test_config=None):
    # create and configure the app

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
        # req = request.form
        # print(req)
        # print(form)
        print(input_json)
        gradleConfig,rulesPro,gradleProperties= "","",""
        keepRules = "@Keep\n"
        #Part 1 Gradle Setup
        if(input_json.get("MinifyEnabled")=='yes'):
            gradleConfig+="minifyEnabled true \n"
        if(input_json.get("ShrinkResources")=='yes'):
            gradleConfig+="shrinkResources true \n"
        if(input_json.get("OptimizationGradle")=='yes'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android-optimize.txt\'),\'proguard-rules.pro\' \n"
        elif(input_json.get("OptimizationGradle")=='no'):
            gradleConfig+="proguardFiles getDefaultProguardFile(\'proguard-android.txt\'),\'proguard-rules.pro\' \n"
        if(input_json.get("optimizationFullModeR8")=='yes'):
            gradleProperties+="android.enableR8.fullMode=true\n"
        print(gradleConfig)
        #Part 2 Rule Setup

        #flags
        if(input_json.get("MinifyEnabled")=='no'):
            rulesPro+="-dontobfuscate\n"
        if(input_json.get("OverloadAggressively")=='yes'):
            rulesPro+="-overloadaggressively\n"
        if(input_json.get("ShrinkResources")=='# NOTE: '):
            rulesPro+="-dontshrink\n"
        #keepRules
        if(input_json.get("GSONKeepRulesEnable")=='yes'):
            rulesPro+="-keepclassmembers,allowobfuscation class * { \n@com.google.gson.annotations.SerializedName <fields>;\n}\n"
        DataClassChipInput = input_json.get("DataClassChipInput")
        if(DataClassChipInput):
            for className in DataClassChipInput:
                rulesPro+="-keep class "+className+".** { *; } \n"
        PackagesChipInput = input_json.get("PackagesChipInput")
        for className in PackagesChipInput:
            rulesPro+="-keep class "+className+".** { *; } \n"
        print(rulesPro)

        #Diagnostics
        if(input_json.get("VerboseStats")=='yes' and "OptimizationGradle"=="No"):
            rulesPro+="-verbose\n"
        if(input_json.get("R8OutputCFG")=='yes'):
            rulesPro+="-printconfiguration \n"
        if(input_json.get("ShrinkedClassesStats")=='yes'):
            rulesPro+="-printusage \n"
        return input_json
    return "success"


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

# app = Flask(__name__)

if __name__ == "__main__":
    app.run("0.0.0.0")
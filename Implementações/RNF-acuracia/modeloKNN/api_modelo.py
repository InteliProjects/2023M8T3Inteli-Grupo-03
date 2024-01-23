from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import functions as modelFunctions
import logging
from logging.config import dictConfig
from dotenv import load_dotenv
import json
from os.path import join, dirname

logging.basicConfig(filename='modelo.log', level=logging.INFO)

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
})

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def hello():
    return "ok"

@app.route("/process", methods=['POST'])
async def processText():
    try:
        print("entrou")
        data = request.get_json()
        NormalizedSupplierName = data["NormalizedSupplierName"]
        Level1 = data["Level1"]
        # Level2 = data["Level2"]
        BusinessUnit = data["BusinessUnit"]
        LegalEntity = data["LegalEntity"]
        InvoiceSource = data["InvoiceSource"]
        Product = data["Product"]
        Project = data["Project"]

        result = modelFunctions.pipelineClassificacao(
            NormalizedSupplierName=NormalizedSupplierName,
            Level1 =Level1,
            # Level2 =Level2,
            BusinessUnit =BusinessUnit,
            LegalEntity = LegalEntity,
            InvoiceSource = InvoiceSource,
            Product =Product,
            Project =Project,
        )

        return result

    except Exception as e:
        return {"erro": str(e)}

if __name__ == '__main__':
    app.run()


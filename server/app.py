import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import io
import torch
from lib.utils import predict_beta
from lib.smplx import get_smplx_mesh

app = Flask(__name__)
CORS(app)

@app.route("/api/convert-measurements", methods=["POST"])
def convert_measurements():
    data = request.json

    # Extract data from the request and create DataFrame
    params = pd.DataFrame({
        "height": [data["height"]],
        "head circumference": [data["headCircumference"]],
        "neck circumference": [data["neckCircumference"]],
        "shoulder to crotch height": [data["shoulderToCrotchHeight"]],
        "chest circumference": [data["chestCircumference"]],
        "waist circumference": [data["waistCircumference"]],
        "hip circumference": [data["hipCircumference"]],
        "wrist right circumference": [data["wristCircumference"]],
        "bicep right circumference": [data["bicepCircumference"]],
        "forearm right circumference": [data["forearmCircumference"]],
        "arm right length": [data["armLength"]],
        "inside leg height": [data["insideLegHeight"]],
        "thigh left circumference": [data["thighCircumference"]],
        "calf left circumference": [data["calfCircumference"]],
        "ankle left circumference": [data["ankleCircumference"]],
        "shoulder breadth": [data["shoulderBreadth"]],
        "weight": [data["weight"]],
        "gender": "male"
    })

    # Predict the betas using the model
    predicted_betas = predict_beta(params)

    # Generate mesh using the predicted betas
    mesh_binary_data = get_smplx_mesh(predicted_betas)

    # Convert mesh binary data to base64
    mesh_base64 = base64.b64encode(mesh_binary_data).decode('utf-8')

    # Return both the predicted betas and the mesh as base64 encoded GLB file
    response = {
        "predicted_betas": predicted_betas.tolist(),  # Convert to JSON-serializable format
        "mesh": mesh_base64  # Encode GLB file as base64 string
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)

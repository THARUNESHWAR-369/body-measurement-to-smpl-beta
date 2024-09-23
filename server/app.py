
from flask import Flask, request, send_file
from flask_cors import CORS

import pandas as pd
import io

import torch
import trimesh

from lib.utils import predict_beta
from lib.smplx import get_smplx_mesh

app = Flask(__name__)
CORS(app)


@app.route("/api/convert-measurements", methods=["POST", "GET"])

def convert_measurements():

    data = request.json
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
        "gender":"male",
    })

    predicted_betas = predict_beta(params)

    return send_file(
        io.BytesIO(get_smplx_mesh(predicted_betas)),
        mimetype="application/octet-stream",
        as_attachment=True,
        download_name="mesh.glb",
    )

    return {}


if __name__ == "__main__":
    app.run(debug=True)
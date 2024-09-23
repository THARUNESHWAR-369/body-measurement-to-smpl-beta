import joblib
from typing import Any, Dict
from model import load_pth_model
import torch
from config.config import PREPROCESSOR_PATH_2
import pandas as pd

def transform_data(parameters : pd.DataFrame) -> torch.Tensor:
    preprocessor = joblib.load(PREPROCESSOR_PATH_2)
    X = preprocessor.transform(parameters)
    return torch.tensor(X, dtype=torch.float32)
   

def predict_beta(parameters : pd.DataFrame) -> torch.Tensor:
    beta_model = load_pth_model()
    data = transform_data(parameters)
    with torch.no_grad():
        predicted_betas = beta_model(data)
    return torch.tensor(predicted_betas.numpy(), dtype=torch.float32)

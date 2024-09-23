import torch
from config.config import *

class BodyMeasurementToBetaConversion(torch.nn.Module):
    def __init__(self, input_dim, output_dim, hidden_layers=64):
        super(BodyMeasurementToBetaConversion, self).__init__()
        self.fc1 = torch.nn.Linear(input_dim, hidden_layers)
        self.fc2 = torch.nn.Linear(hidden_layers, hidden_layers)
        self.fc3 = torch.nn.Linear(hidden_layers, output_dim)
        self.relu = torch.nn.ELU()
        self.dropout = torch.nn.Dropout(0.2)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x
    
class RegressionModel(torch.nn.Module):

    def __init__(self, input_dim, output_dim):
        super(RegressionModel, self).__init__()
        self.fc1 = torch.nn.Linear(input_dim, 64)
        self.fc2 = torch.nn.Linear(64, 128)
        self.fc3 = torch.nn.Linear(128, output_dim)
        self.relu = torch.nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x
    
def load_pth_model() -> RegressionModel:
    model = RegressionModel(INPUT_DIMENSION_2, OUTPUT_DIMENSION_2)
    model.load_state_dict(torch.load(MODEL_PATH_2, weights_only=True))
    model.eval()
    return model
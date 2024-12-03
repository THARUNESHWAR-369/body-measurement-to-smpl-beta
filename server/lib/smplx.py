from smplx import SMPLX
import trimesh.exchange
import trimesh.exchange.gltf
from config.config import SMPLX_MODEL_PATH
import torch
from typing import Any
import trimesh

def load_smplx_model(gender  :str = 'male') -> Any:
    return SMPLX(model_path=SMPLX_MODEL_PATH, gender=gender)

def get_smplx_mesh(betas : torch.Tensor, format :str = 'glb') -> bytes:
    smplx_model = load_smplx_model()
    model = smplx_model(betas=betas)

    vertices = model.vertices.detach().numpy().squeeze()
    
    return trimesh.exchange.gltf.export_glb(
        trimesh.Trimesh(
            vertices=vertices,
            faces=smplx_model.faces, 
            vertex_colors=None,
            process=False
        )
    )


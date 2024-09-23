# 3D Human Body Shape Estimation from Anthropometric Measurements

This project demonstrates 3D human body shape estimation using the SMPLX model and anthropometric measurements. It predicts SMPLX beta parameters from common body measurements, enabling the creation of personalized 3D avatars. 

## Project Overview

This project aims to predict SMPLX beta parameters (which control body shape) from readily obtainable anthropometric measurements.  The goal is to provide a way to generate customized 3D human models for various applications without requiring complex 3D scanning equipment.

**Key Features:**
- **Data Collection:** Combined Spring dataset meshes with custom-scraped data from a body creator software.
- **Feature Extraction:** Utilized Meshcapade and the SMPL-Anthropometry repository to extract 16 relevant body measurements from mesh data. 
- **PyTorch Model:** Trained a PyTorch model to learn the mapping between these measurements and SMPLX beta parameters. 
- **Real-Time Visualization:** Implemented a Flask backend and Three.js for a dynamic and interactive 3D visualization of the estimated human model. 

## Dataset 

The dataset used for this project is a combination of:
- **Springer Dataset:**  [Link to Springer Dataset] 
- **Custom Data:** Anthropometric measurements and corresponding SMPLX beta parameters extracted from approximately 2400 human models created using a body creator software (name of software withheld for privacy).

## Sample Demonstration

https://github.com/user-attachments/assets/27fd420d-8538-440a-8d19-3524e1477205


## Links

> **SMPL-Anthropometry Repository:** https://github.com/DavidBoja/SMPL-Anthropometry

> **SMPL:** https://smpl-x.is.tue.mpg.de/

> **Meshcapade:** https://meshcapade.com/

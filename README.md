# 3D Human Body Shape Estimation from Anthropometric Measurements

This project demonstrates 3D human body shape estimation using the SMPLX model and anthropometric measurements. It predicts SMPLX beta parameters from common body measurements, enabling the creation of personalized 3D avatars. 

## Project Overview

This project aims to predict SMPLX beta parameters (which control body shape) from readily obtainable anthropometric measurements.  The goal is to provide a way to generate customized 3D human models for various applications without requiring complex 3D scanning equipment.

**Key Features:**

- **Data Acquisition:**
  - I began with the Spring dataset of 3000 human meshes. Additionally, I used PyAutoGUI to automate the collection of around 2400 data points from a body creator software (with appropriate permissions, of course!).
- **Feature Extraction:**
  - Leveraging @Meshcapade for mesh processing(Extract Betas from Vertices and Faces from mesh) and the SMPL-Anthropometry repository, I extracted 17 crucial features like chest, waist, hip circumference and etc from the mesh data.

- **Model Development:**
  - Using these features, I trained a PyTorch model to predict SMPLX beta parameters.

- **Real-Time Visualization:**
  - To make it interactive, I developed a Flask backend and used Three.js to create a real-time 3D visualization. The model updates dynamically as input measurements are changed – a really cool visual experience!


<br/>
<br/>

### Through this project, I gained valuable insights into:
**SMPLX:** The structure and capabilities of this impressive 3D body model.

**PyTorch:** Building and training deep learning models.

**Three.js:** The exciting possibilities of 3D rendering and manipulation.


<br/>
<br/>


This journey has sparked my interest in further exploring areas like human pose and shape estimation for applications in virtual try-on, avatar creation, and more.

Important Note: SMPLX and the body creator software I used require licensing for commercial use. Be sure to check the official sources for terms and permissions.



<br/>
<br/>


What advancements in 3D human body modeling are you most excited about?





## Sample Demonstration

https://github.com/user-attachments/assets/27fd420d-8538-440a-8d19-3524e1477205


## Links

> **SMPL-Anthropometry Repository:** https://github.com/DavidBoja/SMPL-Anthropometry

> **SMPL:** https://smpl-x.is.tue.mpg.de/

> **Meshcapade:** https://meshcapade.com/

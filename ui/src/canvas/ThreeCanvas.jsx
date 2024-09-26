import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Import GLTFLoader

const ThreeCanvas = ({ url }) => {
    const canvasContainerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);

    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffff,
        emissive: 0xff89,
    });
    material.reflectivity = 0
    material.transmission = 1.0
    material.roughness = 0.2
    material.metalness = 0
    material.clearcoat = 0.3
    material.clearcoatRoughness = 0.25
    material.color = new THREE.Color(0xffffff)
    material.ior = 1.2
    material.thickness = 10.0

    useEffect(() => {
        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(0xff9);

        cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000); // Adjusted far plane value

        rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current.physicallyCorrectLights = true;
        // rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping; // Use ACES tone mapping for HDR
        rendererRef.current.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current.shadowMap.enabled = true;
        rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;
        rendererRef.current.setPixelRatio(window.devicePixelRatio);

        cameraRef.current.position.z = 3;

        controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        controlsRef.current.rotateSpeed = 1.2;
        controlsRef.current.zoomSpeed = 1.2;
        controlsRef.current.panSpeed = 0.8;
        controlsRef.current.enableDamping = true;

        const updateRendererSize = () => {
            const width = canvasContainerRef.current.clientWidth;
            const height = canvasContainerRef.current.clientHeight;
            rendererRef.current.setSize(width, height);
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
        };

        window.addEventListener('resize', updateRendererSize);

        updateRendererSize();

        const animate = () => {
            requestAnimationFrame(animate);
            controlsRef.current.update();
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        animate();

        // Add lights
        let hemiLight = new THREE.HemisphereLight(0xfff, 0xffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        sceneRef.current.add(hemiLight);

        // Floor
        let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        let floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xeeeeee,
            shininess: 1
        });

        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -1.9;
        sceneRef.current.add(floor);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-1, 12, 8);
        dirLight.castShadow = true;

        sceneRef.current.add(dirLight);

        return () => {
            window.removeEventListener('resize', updateRendererSize);
            rendererRef.current.dispose();
            material.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const updateMesh = (glbBuffer) => {
        sceneRef.current.remove(sceneRef.current.getObjectByName('mesh'));
        console.log(sceneRef.current)
        const loader = new GLTFLoader();
        loader.parse(glbBuffer, '', (loadedGltf) => {
            const mesh = loadedGltf.scene.children[0];
            mesh.traverse(function (child) {
                console.log(child.isMesh)
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            mesh.name = 'mesh';
            sceneRef.current.add(mesh);
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            canvasContainerRef.current.append(rendererRef.current.domElement);
        }, undefined, (error) => {
            console.error(error);
        });
    };

    const getParam = () => {
        const sliders = document.querySelectorAll('.slider');

        let params = {};
        sliders.forEach(slider => {
            params[slider.name] = parseFloat(slider.value);
        });
        return params;
    }


    const updateBodyMesh = () => {
        const params = getParam(); // Get slider parameters
        axios.post('http://127.0.0.1:5000/' + url, params)
            .then(response => {
                console.log(response.data)
                const { predicted_betas, mesh } = response.data;
                console.log('Predicted Betas:', predicted_betas[0]);

                // Decode the base64 mesh data
                const byteCharacters = atob(mesh);  // Decode base64 string to binary string
                const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));  // Convert binary string to byte numbers
                const meshBinaryData = new Uint8Array(byteNumbers);  

                predicted_betas[0].forEach((beta, index) => {
                    const betaField = document.getElementById(`beta-${index + 1}`);
                    if (betaField) {
                        betaField.value = beta;
                    }
                });


                updateMesh(meshBinaryData.buffer);  // Call updateMesh to update the 3D model in the scene
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };


    useEffect(() => {
        document.querySelectorAll('.slider').forEach(slider => {
            slider.addEventListener('change', updateBodyMesh);
        });


        return () => {
            document.querySelectorAll('.slider').forEach(slider => {
                slider.removeEventListener('change', updateBodyMesh);
            });

        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id="canvas-container" ref={canvasContainerRef} style={{ width: '100%', height: '100vh' }} />;
};
ThreeCanvas.propTypes = {
    url: PropTypes.string.isRequired,
};

export default ThreeCanvas;






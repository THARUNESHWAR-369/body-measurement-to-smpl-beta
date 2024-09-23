import { useState } from "react";

const InputGroup = ({ label, name, min, max, step, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="slider"
      />
      <p>{Number(value).toFixed(2)}</p>
    </div>
  );
};

import PropTypes from 'prop-types';
import ThreeCanvas from "./canvas/ThreeCanvas";

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

function App() {
  const [parameters, setParameters] = useState({
    height: 190.83774089813232,
    headCircumference: 58.8997026983123,
    neckCircumference: 52.19524178180258,
    shoulderToCrotchHeight: 71.25990986824036,
    chestCircumference: 125.01895030527818,
    waistCircumference: 118.96886780422702,
    hipCircumference: 104.15215331238524,
    wristCircumference: 20.357353903644672,
    bicepCircumference: 34.20156028774899,
    forearmCircumference: 30.57967720527171,
    armLength: 60.49683094024658,
    insideLegHeight: 8,
    thighCircumference: 49.84063765250733,
    calfCircumference: 37.78331644139548,
    ankleCircumference: 26.8092265916085,
    shoulderBreadth: 39.54549729824066,
    gender: "male",
    weight: 80,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParameters((prevState) => ({
      ...prevState,
      [name]: name === "gender" ? value : parseFloat(value),
    }));
  };

  // Dictionary containing the input configuration
  const inputConfig = [
    { label: "Height", name: "height", min: 0, max: 190, step: 1 },
    { label: "Head Circumference", name: "headCircumference", min: 0, max: 59, step: 1 },
    { label: "Neck Circumference", name: "neckCircumference", min: 0, max: 54, step: 1 },
    { label: "Shoulder to Crotch Height", name: "shoulderToCrotchHeight", min: 0, max: 74, step: 1 },
    { label: "Chest Circumference", name: "chestCircumference", min: 0, max: 130, step: 1 },
    { label: "Waist Circumference", name: "waistCircumference", min: 0, max: 128, step: 1 },
    { label: "Hip Circumference", name: "hipCircumference", min: 0, max: 114, step: 1 },
    { label: "Wrist Circumference", name: "wristCircumference", min: 0, max: 21, step: 1 },
    { label: "Bicep Circumference", name: "bicepCircumference", min: 0, max: 36, step: 1 },
    { label: "Forearm Circumference", name: "forearmCircumference", min: 0, max: 31, step: 1 },
    { label: "Arm Length", name: "armLength", min: 0, max: 60, step: 1 },
    { label: "Inside Leg Height", name: "insideLegHeight", min: 0, max: 86, step: 1 },
    { label: "Thigh Circumference", name: "thighCircumference", min: 0, max: 56, step: 1 },
    { label: "Calf Circumference", name: "calfCircumference", min: 0, max: 39, step: 1 },
    { label: "Ankle Circumference", name: "ankleCircumference", min: 0, max: 27, step: 1 },
    { label: "Shoulder Breadth", name: "shoulderBreadth", min: 0, max: 39, step: 1 },
    {label: "Weight", name: "weight", min: 0, max: 120, step: 1},
  ];

  return (
    <div className="relative">
      <div className="p-5 absolute z-10">
        {inputConfig.map(({ label, name, min, max, step }) => (
          <InputGroup
            key={name}
            label={label}
            name={name}
            min={min}
            max={max}
            step={step}
            value={parameters[name]}
            onChange={handleInputChange}
          />
        ))}

      </div>
      <div className='absolute top-0 w-full h-full'>
        <ThreeCanvas url='api/convert-measurements' />
      </div>
    </div>
  );
}

export default App;


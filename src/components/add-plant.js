import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlant } from "../actions";
import Uploader from "./uploader";

import useStatefulFields from "../hooks/useStatefulFields";

export default function addPlants() {
    const [step, setStep] = useState();
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    return (
        <div>
            <div className="add-plant-container">
                <input
                    className="plant-input"
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <button onClick={setStep(1)}>continue</button>
            </div>
            {step === 1 && (
                <div className="add-plant-container">
                    <input
                        className="plant-input"
                        name="type"
                        placeholder="type"
                        onChange={handleChange}
                    />
                    <button onClick={() => dispatch(addPlant(values))}>
                        continue
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="add-plant-container">
                    {/* Uploader  */}
                    <Uploader />
                </div>
            )}
        </div>
    );
}

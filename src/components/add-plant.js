import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlant } from "../actions";
import Uploader from "./uploader";
import { Link } from "react-router-dom";

import useStatefulFields from "../hooks/useStatefulFields";

export default function addPlants() {
    // const [step, setStep] = useState();
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);

    async function add() {
        await dispatch(addPlant(values));
        await setStep(4);
    }

    return (
        <div>
            {step === 1 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <Link id="add-plant" to="/">
                            <i className="fas fa-chevron-left add-plant-arrow" />
                        </Link>
                        <p className="stepOf"> 1 OUT OF 4</p>
                    </div>
                    <p className="add-plant-header">
                        What is the name of your plant?
                    </p>
                    <input
                        className="plant-input"
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <button
                        className="add-plant-button"
                        onClick={() => setStep(2)}
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left add-plant-arrow"
                            onClick={() => setStep(1)}
                        />
                        <p className="stepOf"> 2 OUT OF 4</p>
                    </div>
                    <p className="add-plant-header">
                        What type of plant is it?
                    </p>
                    <input
                        className="plant-input"
                        name="type"
                        placeholder="type"
                        onChange={handleChange}
                    />
                    <button
                        className="add-plant-button"
                        onClick={() => setStep(3)}
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left add-plant-arrow"
                            onClick={() => setStep(2)}
                        />
                        <p className="stepOf"> 3 OUT OF 4</p>
                    </div>
                    <p className="add-plant-header">
                        Where is your plant located?
                    </p>
                    <input
                        className="plant-input"
                        name="location"
                        placeholder="location"
                        onChange={handleChange}
                    />
                    <button className="add-plant-button" onClick={add}>
                        Next
                    </button>
                </div>
            )}

            {step === 4 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left add-plant-arrow"
                            onClick={() => setStep(2)}
                        />
                        <p className="stepOf"> 4 OUT OF 4</p>
                    </div>
                    <p className="add-plant-header">Add a photo</p>
                    {/* Uploader  */}
                    <Uploader />
                </div>
            )}
        </div>
    );
}

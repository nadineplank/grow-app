import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlant } from "../actions";
import Uploader from "./uploader";
import { Link } from "react-router-dom";

import useStatefulFields from "../hooks/useStatefulFields";

export default function addPlants() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const scene = "add-plant";

    async function add() {
        await dispatch(addPlant(values));
        await setStep(5);
    }

    return (
        <div>
            {step === 1 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <Link id="add-plant" to="/">
                            <i className="fas fa-chevron-left arrow-left" />
                        </Link>
                        <p className="stepOf"> 1 OUT OF 5</p>
                    </div>
                    <p className="add-plant-header">
                        What is the name of your plant?
                    </p>
                    <div className="input-button">
                        <input
                            className="add-plant-input"
                            name="name"
                            placeholder="name"
                            required
                            onChange={handleChange}
                        />
                        <button
                            className="add-plant-button"
                            onClick={() => setStep(2)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left arrow-left"
                            onClick={() => setStep(1)}
                        />
                        <p className="stepOf"> 2 OUT OF 5</p>
                    </div>
                    <p className="add-plant-header">
                        What type of plant is it?
                    </p>
                    <div className="input-button">
                        <input
                            className="add-plant-input"
                            name="type"
                            placeholder="type"
                            required
                            onChange={handleChange}
                        />
                        <button
                            className="add-plant-button"
                            onClick={() => setStep(3)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left arrow-left"
                            onClick={() => setStep(2)}
                        />
                        <p className="stepOf"> 3 OUT OF 5</p>
                    </div>
                    <p className="add-plant-header">
                        Where is your plant located?
                    </p>
                    <div className="input-button">
                        <input
                            className="add-plant-input"
                            name="location"
                            placeholder="location"
                            onChange={handleChange}
                        />
                        <button
                            className="add-plant-button"
                            onClick={() => setStep(4)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left arrow-left"
                            onClick={() => setStep(3)}
                        />
                        <p className="stepOf"> 4 OUT OF 5</p>
                    </div>
                    <p className="add-plant-header">
                        Since when do you have this plant?
                    </p>
                    <div className="input-button">
                        <input
                            className="add-plant-input"
                            name="date"
                            type="date"
                            placeholder="location"
                            onChange={handleChange}
                        />
                        <button className="add-plant-button" onClick={add}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 5 && (
                <div className="add-plant-container">
                    <div className="add-plant-nav">
                        <i
                            className="fas fa-chevron-left arrow-left"
                            onClick={() => setStep(4)}
                        />
                        <p className="stepOf"> 5 OUT OF 5</p>
                    </div>
                    <p className="add-plant-header">Add a photo</p>
                    {/* Uploader  */}
                    <Uploader scene={scene} />
                    <Link to="/">
                        <button className="add-plant-button" id="upload">
                            SKIP
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

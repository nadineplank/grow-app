import React from "react";
import { useDispatch } from "react-redux";
import { addPlant } from "../actions";
import Uploader from "./uploader";

import useStatefulFields from "../hooks/useStatefulFields";

export default function addPlants() {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    return (
        <div>
            <input
                className="plant-input"
                name="name"
                placeholder="name"
                onChange={handleChange}
            />
            <input
                className="plant-input"
                name="type"
                placeholder="type"
                onChange={handleChange}
            />
            <button onClick={() => dispatch(addPlant(values))}>continue</button>

            {/* Uploader  */}
            <Uploader />
        </div>
    );
}

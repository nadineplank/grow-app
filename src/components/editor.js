import React from "react";
import { editPlant } from "../actions";
import useStatefulFields from "../hooks/useStatefulFields";
import { useDispatch } from "react-redux";

export default function Editor({ setEditor, plant }) {
    // const [step, setStep] = useState();
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    async function edit(e) {
        e.preventDefault();
        await dispatch(editPlant(values, plant.id));
        setEditor(false);
    }

    return (
        <div className="editor">
            <div className="editor-header-wrapper">
                <i
                    className="fas fa-chevron-left arrow-left"
                    onClick={() => setEditor(false)}
                />
                <h4 className="editor-header">Plant Details</h4>
            </div>

            <div className="editor-input-container">
                <p>Name</p>
                <input
                    className="editor-input"
                    name="name"
                    defaultValue={plant.name}
                    required
                    onChange={handleChange}
                />
                <p>Type of Plant</p>
                <input
                    className="add-plant-input"
                    name="type"
                    defaultValue={plant.type}
                    required
                    onChange={handleChange}
                />
                <p>Location</p>
                <input
                    className="add-plant-input"
                    name="location"
                    defaultValue={plant.location}
                    required
                    onChange={handleChange}
                />
                <p>Acquisition Date</p>
                <input
                    className="add-plant-input"
                    name="date"
                    defaultValue={plant.added_at}
                    type="date"
                    required
                    onChange={handleChange}
                />
            </div>
            <button className="editor-button" onClick={e => edit(e)}>
                SAVE INFORMATION
            </button>
        </div>
    );
}

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
        await dispatch(editPlant(values, plant));
        setEditor(false);
    }

    return (
        <div className="editor">
            <div className="add-plant-nav">
                <i
                    className="fas fa-chevron-left arrow-left"
                    onClick={() => setEditor(false)}
                />
                <h1 className="editor-header">Plant Details</h1>
            </div>

            <div className="editor-input-container">
                <p className="editor-label">Name</p>
                <input
                    className="editor-input"
                    name="name"
                    defaultValue={plant.name}
                    required
                    onChange={handleChange}
                />
                <p className="editor-label">Type of Plant</p>
                <input
                    className="editor-input"
                    name="type"
                    defaultValue={plant.type}
                    required
                    onChange={handleChange}
                />
                <p className="editor-label">Location</p>
                <input
                    className="editor-input"
                    name="location"
                    defaultValue={plant.location}
                    required
                    onChange={handleChange}
                />
                <p className="editor-label">Acquisition Date</p>
                <input
                    className="editor-input"
                    name="date"
                    defaultValue={plant.added_at}
                    type="date"
                    required
                    onChange={handleChange}
                />
                <button className="editor-button" onClick={e => edit(e)}>
                    SAVE INFORMATION
                </button>
            </div>
        </div>
    );
}

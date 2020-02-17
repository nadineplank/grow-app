import React from "react";
import { useDispatch } from "react-redux";
import { updateImage } from "../actions";
import useStatefulFields from "../hooks/useStatefulFields";

export default function Uploader() {
    const [file, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    const upload = e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", file);
        dispatch(updateImage(formData));
    };

    return (
        <div className="upload">
            <input
                name="file"
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
            <button id="upload" onClick={e => upload(e)}>
                UPLOAD
            </button>
        </div>
    );
}

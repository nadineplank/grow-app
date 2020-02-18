import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImage } from "../actions";
import { Link } from "react-router-dom";

export default function Uploader() {
    const [files, setFiles] = useState({});
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    async function handleChange(e) {
        setFiles(e.target.files[0]);
    }

    async function upload(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", files);
        const data = await dispatch(updateImage(formData));
        if (!data) {
            setError(true);
        } else {
            location.replace("/");
        }
    }

    return (
        <div className="upload-container">
            {error && <p className="error">Ooops, something went wrong!</p>}
            <div className="upload">
                <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={e => handleChange(e)}
                />
            </div>
            <button
                className="add-plant-button"
                id="upload"
                onClick={e => upload(e)}
            >
                UPLOAD
            </button>

            <Link to="/">
                <button className="add-plant-button" id="upload">
                    SKIP
                </button>
            </Link>
        </div>
    );
}

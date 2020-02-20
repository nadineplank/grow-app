import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    updatePlantImage,
    updateProfileImage,
    uploadPlantImage
} from "../actions";

export default function Uploader({ scene, setUploader, id }) {
    const dispatch = useDispatch();
    const [files, setFiles] = useState({});

    // const dispatch = useDispatch();

    async function handleChange(e) {
        setFiles(e.target.files[0]);
    }

    async function upload(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", files);
        if (scene === "plantInfo") {
            await dispatch(updatePlantImage(formData, id));
            setUploader(false);
        } else if (scene === "add-plant") {
            await dispatch(uploadPlantImage(formData));
            location.assign("/");
        } else {
            await dispatch(updateProfileImage(formData));
            setUploader(false);
        }
    }

    return (
        <div className="upload-container">
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
        </div>
    );
}

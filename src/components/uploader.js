import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePlantImage, updateProfileImage } from "../actions";

export default function Uploader({ url, setUploader, scene }) {
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
        if (url === "updatePlantImage") {
            await dispatch(updatePlantImage(formData));
            if (scene === "add-plant") {
                location.assign("/");
            } else if (scene === "plant") {
                setUploader(false);
            }
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

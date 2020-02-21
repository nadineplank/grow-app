import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    updatePlantImage,
    updateProfileImage,
    uploadPlantImage
} from "../actions";
import { Link } from "react-router-dom";

export default function Uploader({ scene, setUploader, id, setStep }) {
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
        <div
            className={
                scene === "add-plant" ? "add-plant-container" : "upload-modal"
            }
        >
            <div className="add-plant-nav">
                <i
                    className="fas fa-chevron-left arrow-left"
                    onClick={
                        scene === "add-plant"
                            ? () => setStep(4)
                            : () => setUploader(false)
                    }
                />

                <p className={scene === "add-plant" ? "stepOf" : "hidden"}>
                    {" "}
                    5 OUT OF 5
                </p>
            </div>
            <p
                className={
                    scene === "add-plant"
                        ? "add-plant-header"
                        : "add-photo-header"
                }
            >
                Add a photo
            </p>
            <div className="upload">
                <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={e => handleChange(e)}
                />
            </div>
            <button
                className="upload-button"
                id="upload"
                onClick={e => upload(e)}
            >
                UPLOAD
            </button>

            <Link
                to="/"
                className={scene === "add-plant" ? "skip-button " : "hidden"}
                id="upload"
            >
                SKIP
            </Link>
        </div>
    );
}

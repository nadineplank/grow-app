import React, { useEffect, useState } from "react";
import WaterSchedule from "./water-schedule";
import Uploader from "./uploader";
import Editor from "./editor";
// import { useSelector } from "react-redux";
// import axios from "../axios";

export default function Plant({ plantInfo, showInfo }) {
    const [schedule, showSchedule] = useState(false);
    const [uploader, setUploader] = useState(false);
    const [editor, setEditor] = useState(false);
    const scene = "plantInfo";

    useEffect(() => {}, [plantInfo]);

    if (!plantInfo) {
        return null;
    }
    return (
        <div className="plant-container">
            <div>
                <div className="add-plant-nav">
                    <i
                        className="fas fa-chevron-left arrow-left"
                        onClick={() => showInfo(false)}
                    />
                </div>
                <div className="plant-header">
                    <div className="name-type">
                        <p className="plant-name">{plantInfo.name}</p>
                        <i
                            className="fas fa-pencil-alt plant-edit-icon"
                            onClick={() => setEditor(plantInfo)}
                        />
                        <p className="plant-type">{plantInfo.type}</p>
                    </div>

                    <img className="plant-image" src={plantInfo.image} />
                    <i
                        className="fas fa-camera"
                        onClick={() => setUploader(true)}
                    />
                </div>
                <div className="plant-information">
                    <div className="info">
                        <p>{plantInfo.location}</p>
                        <p className="information-tag">LOCATION</p>
                    </div>
                    <div className="info">
                        <p>{plantInfo.added_at}</p>
                        <p className="information-tag">YOURS SINCE</p>
                    </div>
                </div>
                <div className="next-watering">
                    <div className="waterInfo">
                        <p>Last time you watered {plantInfo.name} </p>
                        <p className="last-watered">
                            {plantInfo.time_diff} days ago
                        </p>
                    </div>
                    <div className="waterInfo">
                        <p className="water-tag">
                            You set your reminder to remind you every{" "}
                        </p>
                        <p id="day"> {` ${plantInfo.reminder} days`} </p>
                    </div>
                    <button
                        className="change-schedule-button"
                        onClick={() => showSchedule(true)}
                    >
                        CHANGE WATER SCHEDULE
                    </button>
                </div>

                {editor && (
                    <div className="plant-editor">
                        <Editor setEditor={setEditor} plant={editor} />
                    </div>
                )}

                {uploader && (
                    <div className="plant-uploader">
                        <Uploader
                            scene={scene}
                            setUploader={setUploader}
                            id={plantInfo.id}
                        />
                    </div>
                )}
                {schedule && (
                    <div className="plant-schedule">
                        <WaterSchedule
                            id={plantInfo.id}
                            showSchedule={showSchedule}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

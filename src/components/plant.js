import React, { useEffect, useState } from "react";
import WaterSchedule from "./water-schedule";
import Uploader from "./uploader";
import Editor from "./editor";
// import { useSelector } from "react-redux";
// import axios from "../axios";

export default function Plant({ plantInfo, showInfo }) {
    const [schedule, setSchedule] = useState(false);
    const [uploader, setUploader] = useState(false);
    const [editor, setEditor] = useState(false);
    // const id = props.match.params.id;
    const url = "updatePlantImage";
    const scene = "plant";

    useEffect(() => {}, [plantInfo]);

    if (!plantInfo) {
        return null;
    }
    return (
        <div className="plant-container">
            <div>
                <i
                    className="fas fa-chevron-left arrow-left"
                    onClick={() => showInfo(false)}
                />
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
                    <div className="location">
                        <p>{plantInfo.location}</p>
                        <p>LOCATION</p>
                    </div>
                    <div className="date">
                        <p>{plantInfo.added_at}</p>
                        <p>YOURS SINCE</p>
                    </div>

                    <div className="next-watering">
                        <p>Next watering scheduled for</p>
                        <button onClick={() => setSchedule(true)}>
                            CHANGE WATER SCHEDULE
                        </button>
                    </div>
                </div>

                {editor && (
                    <div className="plant-editor">
                        <Editor setEditor={setEditor} plant={editor} />
                    </div>
                )}

                {uploader && (
                    <div className="plant-uploader">
                        <Uploader
                            url={url}
                            setUploader={setUploader}
                            scene={scene}
                        />
                    </div>
                )}
                {schedule && (
                    <div className="plant-schedule">
                        <WaterSchedule id={plantInfo.id} />
                    </div>
                )}
            </div>
        </div>
    );
}

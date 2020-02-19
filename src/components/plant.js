import React, { useEffect, useState } from "react";
import Uploader from "./uploader";
import axios from "../axios";

export default function Plant(props) {
    const [plant, setPlant] = useState();
    const [uploader, setUploader] = useState(false);
    const id = props.match.params.id;
    const url = "updatePlantImage";
    const scene = "plant";

    useEffect(() => {
        (async () => {
            let { data } = await axios.get(`/plant/${id}.json`);
            setPlant(data);
        })();
    }, []);

    if (!plant) {
        return null;
    }
    return (
        <div className="plant-container">
            <div>
                <div className="plant-header">
                    <div className="name-type">
                        <p className="plant-name">{plant.name}</p>
                        <p className="plant-type">{plant.type}</p>
                    </div>

                    <img className="plant-image" src={plant.image} />
                    <i
                        className="fas fa-camera"
                        onClick={() => setUploader(true)}
                    />
                </div>
                <div className="plant-information">
                    <div className="location">
                        <p>{plant.location}</p>
                        <p>LOCATION</p>
                    </div>
                    <div className="date">
                        <p>{plant.added_at}</p>
                        <p>YOURS SINCE</p>
                    </div>
                </div>
            </div>
            {uploader && (
                <div className="plant-uploader">
                    <Uploader
                        url={url}
                        setUploader={setUploader}
                        scene={scene}
                    />
                </div>
            )}
        </div>
    );
}

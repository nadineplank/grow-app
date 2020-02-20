import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlant } from "../actions";
import Plant from "./plant";

export default function AllPlants() {
    const dispatch = useDispatch();
    const plants = useSelector(state => state.plants);
    const [plantPage, setPlantPage] = useState(false);

    useEffect(() => {}, [plants]);

    function showInfo(e) {
        setPlantPage(e);
    }

    function remove(e) {
        dispatch(deletePlant(e));
    }

    if (!plants) {
        return null;
    }
    return (
        <div className="all-plants-container">
            <p className="all-plants-header">All plants </p>
            {plants.map(plant => (
                <div
                    key={plant.id}
                    className="info-wrapper"
                    onClick={() => showInfo(plant)}
                >
                    <img
                        className="all-plants-pic"
                        src={plant.image}
                        key={plant.id}
                    />
                    <p className="overview-name">{plant.name}</p>

                    <i className="fas fa-chevron-right all-plants-arrow-right"></i>
                </div>
            ))}
            {plantPage && (
                <Plant
                    plantInfo={plantPage}
                    showInfo={showInfo}
                    remove={remove}
                />
            )}
        </div>
    );
}

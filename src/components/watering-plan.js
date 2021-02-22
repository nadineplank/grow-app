import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAsWatered } from "../actions";
import useStatefulFields from "../hooks/useStatefulFields";
import Plant from "./plant";

export default function WateringPlan() {
    const dispatch = useDispatch();
    const [values, handleChange] = useStatefulFields();
    const plants = useSelector(
        state =>
            state.plants &&
            state.plants.filter(plant => plant.needs_water === true)
    );
    const [plantPage, setPlantPage] = useState(false);

    useEffect(() => {}, [plants]);

    function showInfo(e) {
        setPlantPage(e);
    }

    async function setWatered() {
        console.log("data from setWatered", values);
        await dispatch(setAsWatered(values));
    }
    if (!plants) {
        return null;
    }
    return (
        <div className="all-plants-container">
            <p className="all-plants-header">Water your plants </p>
            {plants.map(plant => (
                <div key={plant.id} className='water--plan--container'>
                    <input
                        key={plant.id}
                        type="radio"
                        name="id"
                        value={plant.id}
                        onChange={handleChange}
                    />
                    <div className="plant-info-wrapper" style={{width: '70vw'}}>
                        <img className="water-me-pic" src={plant.image} />
                        <p className="all-plants-name">{plant.name}</p>

                        <i
                            className="fas fa-chevron-right all-plants-arrow-right"
                            onClick={() => showInfo(plant)}
                        ></i>
                    </div>
                </div>
            ))}

            <button className="water-button" onClick={setWatered}>
                Mark as watered
            </button>
            {plantPage && <Plant plantInfo={plantPage} showInfo={showInfo} />}
        </div>
    );
}

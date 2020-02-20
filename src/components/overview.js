import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlant } from "../actions";
import { Link } from "react-router-dom";
import Holdable from "./holdable";
import Plant from "./plant";
// import AddPlant from "./add-plant";

export default function Overview() {
    const dispatch = useDispatch();
    const plants = useSelector(state => state.plants);
    const [wobble, setWobble] = useState(false);
    const [plantPage, setPlantPage] = useState(false);

    useEffect(() => {
        if (plantPage) {
            const p = plants.find(plant => plant.id == plantPage.id);
            setPlantPage(p);
        }
    }, [plants]);

    function showInfo(e) {
        setPlantPage(e);
    }

    function onHold() {
        setWobble(wobble => !wobble);
    }

    function remove(e) {
        dispatch(deletePlant(e));
    }

    if (!plants) {
        return null;
    }

    const plant = (
        <div className="plants-container">
            {plants.map(plant => (
                <Holdable
                    onClick={
                        wobble === true
                            ? () => remove(plant.id)
                            : () => showInfo(plant)
                    }
                    onHold={onHold}
                    id={plant.id}
                    key={plant.id}
                    name={plant.name}
                >
                    {wobble === true && (
                        <i
                            className="fas fa-times-circle delete-plant-icon"
                            id={plant.id}
                        />
                    )}
                    <div
                        className={
                            wobble === true ? "plant-box wobble" : "plant-box"
                        }
                        key={plant.id}
                    >
                        <img className="plant-pic" src={plant.image} />

                        <p className="overview-name">{plant.name}</p>
                    </div>
                </Holdable>
            ))}
        </div>
    );

    return (
        <div>
            <h1 className="header">Welcome, Plant Lover</h1>
            <div className="container">
                <div>
                    <div className="box">
                        <Link id="add-box" to="/addPlant">
                            <p id="add">
                                + <br />
                                ADD <br />
                            </p>
                        </Link>
                    </div>
                    {!!plants.length && plant}
                </div>
            </div>
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

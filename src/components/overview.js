import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlant } from "../actions";
import { Link } from "react-router-dom";
import Holdable from "./holdable";

export default function Overview() {
    const dispatch = useDispatch();
    const plants = useSelector(state => state.plants);
    const [wobble, setWobble] = useState("false");

    useEffect(() => {}, [plants]);

    function onClick(e) {
        const id = e.currentTarget.id;
        location.assign(`/plant/${id}`);
    }

    function onHold() {
        setWobble(wobble => !wobble);
    }

    function remove(e) {
        dispatch(deletePlant(e.currentTarget.id));
    }

    if (!plants) {
        return null;
    }

    const plant = (
        <div className="plant-container">
            {plants.map(plant => (
                <Holdable
                    onClick={wobble === true ? remove : onClick}
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
        </div>
    );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlants } from "../actions";
import { Link } from "react-router-dom";

export default function overview() {
    const dispatch = useDispatch();
    const plants = useSelector(state => state.plants);

    useEffect(() => {
        dispatch(getPlants());
    }, []);

    if (!plants) {
        return null;
    }
    console.log(plants);
    const plant = (
        <div className="plant-container">
            {plants.map(plant => (
                <div className="plant" key={plant.id}>
                    <Link to={`/plant/${plant.id}`} key={plant.id}>
                        <img className="plant-pic" src={plant.image} />
                    </Link>
                    <p>{plant.name}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container">
            <div>
                {!plants.length && (
                    <p className="noPlants"> You have no plants yet</p>
                )}
                {!!plants.length && plant}
            </div>
            <div className="box">
                <Link to="/addPlant">
                    <button className="button">+ ADD PLANT </button>
                </Link>
            </div>
        </div>
    );
}

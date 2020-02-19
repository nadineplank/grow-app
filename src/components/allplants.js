import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AllPlants() {
    const plants = useSelector(state => state.plants);
    return (
        <div>
            <p className="all-plants-header">All plants </p>
            {plants.map(plant => (
                <div key={plant.id}>
                    <img
                        className="plant-pic"
                        src={plant.image}
                        key={plant.id}
                    />

                    <p className="overview-name">
                        {plant.name} key={plant.id}
                    </p>
                </div>
            ))}
            Hello
        </div>
    );
}

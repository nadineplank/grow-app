import React from "react";

export default function Plant(props) {
    return (
        <div className="container">
            <p className="plant-name">{props.name}</p>
            <img src={props.image} />
        </div>
    );
}

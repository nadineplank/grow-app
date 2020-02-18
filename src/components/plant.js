import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIndividualPlant } from "../actions";

export default function Plant(props) {
    const dispatch = useDispatch();
    const plant = useSelector(state => state.plant);

    useEffect(() => {
        const id = props.match.params.id;
        dispatch(getIndividualPlant(id));
    }, []);

    return (
        <div className="container">
            <p className="plant-name">Hello</p>
        </div>
    );
}

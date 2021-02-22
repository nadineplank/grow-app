import React, { useEffect } from "react";
import { getPlants, getUser } from "../actions";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

// COMPONENTS

import Navbar from "./navbar";
import Overview from "./overview";
import AddPlant from "./add-plant";
import Plants from "./allplants";
import WateringPlan from "./watering-plan";
import Settings from "./settings";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlants());
        dispatch(getUser());
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Overview} />
            <Route path="/plants" component={Plants} />
            <Route exact path="/addPlant" component={AddPlant} />
            <Route path="/settings" component={Settings} />
            <Route path="/watering" component={WateringPlan} />
        </BrowserRouter>
    );
}

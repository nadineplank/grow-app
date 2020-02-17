import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";

// COMPONENTS

import Navbar from "./navbar";
import Overview from "./overview";
import AddPlant from "./add-plant";
// import Plant from "./plant";
// import Settings from "./settings";
// import Calendar from "./calendar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Overview} />
            <Route exact path="/addPlant" component={AddPlant} />
        </BrowserRouter>
    );
}

// <Route path="/plant/:id" component={Plant} />
// <Route path="/calendar" component={Calendar} />
// <Route path="/settings" component={Settings} />

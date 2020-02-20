import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    // function home() {
    //     location.assign("/");
    // }
    return (
        <div className="nav-bar">
            <Link to="/" className="nav">
                <i className="fas fa-home"></i>
            </Link>

            <Link to="/plants" className="nav">
                <i className="fas fa-seedling"></i>
            </Link>

            <Link to="/watering" className="nav">
                <i className="far fa-calendar-alt"></i>
            </Link>

            <Link to="/settings" className="nav">
                <i className="far fa-user"></i>
            </Link>
        </div>
    );
}

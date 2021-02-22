import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    // function home() {
    //     location.assign("/");
    // }
    return (
        <div className="nav-bar">
            <Link to="/" className="nav">
                <i className="fas fa-home" />
            </Link>

            <Link to="/plants" className="nav">
                <i className="fas fa-seedling" />
            </Link>

            <Link to="/watering" className="nav">
                <i className="fas fa-tint" />
            </Link>

            <Link to="/settings" className="nav">
                <i className="far fa-user" />
            </Link>
        </div>
    );
}

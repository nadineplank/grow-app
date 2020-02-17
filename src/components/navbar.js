import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="nav-bar">
            <Link to="/" className="nav">
                <i className="fas fa-home"></i>
            </Link>

            <Link to="/plant" className="nav">
                <i className="fas fa-seedling"></i>
            </Link>

            <Link to="/calendar" className="nav">
                <i className="far fa-calendar-alt"></i>
            </Link>

            <Link to="/settings" className="nav">
                <i className="far fa-user"></i>
            </Link>
        </div>
    );
}

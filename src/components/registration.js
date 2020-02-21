import React from "react";
import { Link } from "react-router-dom";

import useAuthSubmit from "../hooks/useAuthSubmit";
import useStatefulFields from "../hooks/useStatefulFields";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useAuthSubmit("/register", values);

    return (
        <div>
            {error && <div className="error">Oops! Something went wrong!</div>}
            <div className="auth-input-container">
                <input
                    className="auth-input"
                    name="first"
                    placeholder="first name"
                    onChange={handleChange}
                />
                <input
                    className="auth-input"
                    name="last"
                    placeholder="last name"
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    name="email"
                    placeholder="email address"
                    type="email"
                    onChange={handleChange}
                />
                <input
                    className="auth-input"
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={handleChange}
                />
            </div>

            <div className="btn-container">
                <button className="auth-btn" onClick={handleSubmit}>
                    register
                </button>
            </div>
            <div className="login-btn">
                Already a memeber?
                <Link className="login-link" to="/login">
                    log in
                </Link>
            </div>
        </div>
    );
}

import React from "react";
import { Link } from "react-router-dom";

import useAuthSubmit from "../hooks/useAuthSubmit";
import useStatefulFields from "../hooks/useStatefulFields";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [handleSubmit, error] = useAuthSubmit("/login", values);

    return (
        <div>
            <div className="auth-input-container">
                {error && <div className="error">Email or Password wrong!</div>}
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
                    Log in
                </button>
                <div id="register">
                    <p>No member? </p>
                    <Link className="login-link" to="/">
                        register
                    </Link>
                </div>
                <div id="reset">
                    <p>Forgot your password?</p>
                    <Link className="login-link" to="/resetPassword">
                        reset
                    </Link>
                </div>
            </div>
        </div>
    );
}

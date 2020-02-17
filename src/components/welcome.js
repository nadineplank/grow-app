import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div>
            <div className="background-container"></div>
            <div className="overlay" />
            <div className="auth-container">
                <div className="auth-wrapper">
                    <h1 id="header">Grow</h1>

                    <HashRouter>
                        <Route exact path="/" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route
                            exact
                            path="/resetPassword"
                            component={ResetPassword}
                        />
                    </HashRouter>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

import useStatefulFields from "../hooks/useStatefulFields";
// import useNewPassword from "../hooks/useNewPassword";

export default function ResetPassword() {
    const [values, handleChange] = useStatefulFields();
    const [step, setStep] = useState(1);
    const [state, setState] = useState();
    // const [handleSubmit, error] = useNewPassword("/verify", values);

    async function sendMail() {
        axios
            .post("/reset", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.id) {
                    setStep({
                        step: 2
                    });
                } else {
                    setState({
                        error: true
                    });
                }
            });
    }
    async function newPassword() {
        axios
            .post("/verify", {
                code: this.state.code,
                password: this.state.newPassword,
                email: this.state.email
            })
            .then(({ data }) => {
                if (data) {
                    this.setState({
                        step: 3
                    });
                } else {
                    this.setState({
                        codeWrong: true
                    });
                }
            });
    }

    return (
        <div>
            {state.error && (
                <div className="error">No user with this email address!</div>
            )}
            {/* Step 1 */}
            {step === 1 && (
                <div>
                    <input
                        name="email"
                        placeholder="email address"
                        type="email"
                        onChange={handleChange}
                    />
                    <button onClick={() => sendMail()}>Submit</button>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div>
                    {this.state.codeWrong && (
                        <div className="error">invalid code</div>
                    )}
                    <p>Please enter the code you received</p>
                    <input
                        name="code"
                        placeholder="code"
                        onChange={handleChange}
                    />
                    <p>Please enter a new password</p>
                    <input
                        name="newPassword"
                        placeholder="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <button onClick={() => newPassword()}>Submit</button>
                </div>
            )}
            {/* Step 3 */}
            {step === 3 && (
                <div>
                    <p>Success!</p>
                    <p>You can now</p>
                    <Link to="/login">log in</Link>
                    <p>with your new password</p>
                </div>
            )}
        </div>
    );
}

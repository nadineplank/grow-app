import React from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.step = 1;
    }

    handleChange(e) {
        /// this[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    sendMail() {
        axios
            .post("/reset", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.id) {
                    this.setState({
                        step: 2
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    newPassword() {
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
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        No user with this email address!
                    </div>
                )}
                {/* Step 1 */}
                {this.state.step === 1 && (
                    <div>
                        <input
                            name="email"
                            placeholder="email address"
                            type="email"
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={() => this.sendMail()}>Submit</button>
                    </div>
                )}

                {/* Step 2 */}
                {this.state.step === 2 && (
                    <div>
                        {this.state.codeWrong && (
                            <div className="error">invalid code</div>
                        )}
                        <p>Please enter the code you received</p>
                        <input
                            name="code"
                            placeholder="code"
                            onChange={e => this.handleChange(e)}
                        />
                        <p>Please enter a new password</p>
                        <input
                            name="newPassword"
                            placeholder="password"
                            type="password"
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={() => this.newPassword()}>
                            Submit
                        </button>
                    </div>
                )}
                {/* Step 3 */}
                {this.state.step === 3 && (
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
}

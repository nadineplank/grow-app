import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { getUser } from "../actions";
import Uploader from "./uploader";

export default function Settings() {
    // const dispatch = useDispatch();
    const [uploader, setUploader] = useState(false);
    const user = useSelector(state => state.user);
    const url = "updateProfileImage";

    useEffect(() => {}, [user]);

    if (!user) {
        return null;
    }

    return (
        <div className="settings-container">
            <img
                className="user-image"
                src={user.image}
                onClick={() => setUploader(true)}
            />
            <p className="settings-username">
                {user.first} {user.last}
            </p>
            <p className="settings-email">{user.email}</p>
            <div className="settings-password">
                <p>Change your password</p>

                <input
                    name="currentPassword"
                    placeholder="current password"
                    type="password"
                />

                <input
                    name="newPassword"
                    placeholder="new password"
                    type="password"
                />
            </div>
            {uploader && (
                <div className="settings-uploader">
                    <Uploader url={url} setUploader={setUploader} />
                </div>
            )}
        </div>
    );
}

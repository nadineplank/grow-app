import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setReminder } from "../actions";
import useStatefulFields from "../hooks/useStatefulFields";

export default function WaterSchedule({ id }) {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();
    const [schedule, showSchedule] = useState(false);

    async function setSchedule() {
        await dispatch(setReminder(id, values));
    }

    return (
        <div>
            <div className="water-schedule">
                <h1 className="water-header">Watering Schedule</h1>

                <p>Remind me every:</p>

                <input
                    className="water-input"
                    name="reminder"
                    placeholder="1 Day"
                    required
                    onChange={handleChange}
                />
                <button onClick={setSchedule}>SAVE</button>
            </div>
        </div>
    );
}

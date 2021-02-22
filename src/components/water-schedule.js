import React from "react";
import { useDispatch } from "react-redux";
import { setReminder } from "../actions";
import useStatefulFields from "../hooks/useStatefulFields";

export default function WaterSchedule({ id, showSchedule }) {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    async function setSchedule() {
        await dispatch(setReminder(id, values));
        showSchedule(false);
    }

    return (
        <div>
            <div className="water-schedule">
                <div className="add-plant-nav">
                    <i
                        className="fas fa-chevron-left arrow-left"
                        onClick={() => showSchedule(false)}
                    />
                    <h1 className="water-header">Watering Schedule</h1>
                </div>
                <div className="schedule-container">
                    <p id="reminder">Remind me every:</p>

                    <input
                        className="water-input"
                        name="reminder"
                        placeholder="1 Day"
                        required
                        onChange={handleChange}
                    />
                    <button
                        className="change-schedule-button save"
                        onClick={setSchedule}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}

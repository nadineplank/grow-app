import React, { useState } from "react";

export default function Holdable({ id, onClick, onHold, children, name }) {
    const [timer, setTimer] = useState(null);

    function onPointerDown(e) {
        const event = { ...e }; // convert synthetic event to real object
        const timeoutId = window.setTimeout(timesup.bind(null, event), 500);
        setTimer(timeoutId);
    }

    function onPointerUp(e) {
        if (timer) {
            window.clearTimeout(timer);
            setTimer(null);
            onClick(e);
        }
    }

    function timesup(e) {
        setTimer(null);
        onHold(e);
    }

    return (
        <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            id={id}
            name={name}
        >
            {children}
        </div>
    );
}

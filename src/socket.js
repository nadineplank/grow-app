import * as io from "socket.io-client";
import { chatMessages, chatMessage, setId } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("incoming message", msg => store.dispatch(chatMessage(msg)));

        socket.on("setId", userId => store.dispatch(setId(userId)));
    }
};

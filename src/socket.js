import * as io from "socket.io-client";
import { getPlants } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("plant data", plantData =>
            store.dispatch(getPlants(plantData))
        );
    }
};

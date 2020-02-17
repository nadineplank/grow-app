import axios from "./axios";

export async function getPlants() {
    const { data } = await axios.get("/plants");

    return {
        type: "GET_PLANTS",
        plants: data
    };
}

export async function addPlant(values) {
    console.log("values from addPlant: ", values);
    const { data } = await axios.post("/plants", values);

    return {
        type: "ADD_PLANTS",
        plants: data
    };
}

export async function getUser() {
    const { data } = await axios.get("/getUser");

    return {
        type: "GET_USER",
        user: data
    };
}

export async function updateImage(formData) {
    const { data } = await axios.post("/upload", formData);

    return {
        type: "UPDATE_IMAGE",
        image: data
    };
}

// export async function acceptFriendRequest(id) {
//     await axios.post("/accept-friend-request/" + id);
//     return {
//         type: "ACCEPT_FRIEND_REQ",
//         id
//     };
// }

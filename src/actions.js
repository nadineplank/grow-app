import axios from "./axios";

export async function getPlants() {
    const { data } = await axios.get("/plants");

    return {
        type: "GET_PLANTS",
        plants: data
    };
}

export async function addPlant(values) {
    const { data } = await axios.post("/plants", values);

    return {
        type: "ADD_PLANTS",
        plants: data
    };
}

export async function deletePlant(id) {
    const { data } = await axios.post("/delete-plant", { id: id });

    return {
        type: "DELETE_PLANT",
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

export async function getIndividualPlant(id) {
    const { data } = await axios.get(`/plant/${id}.json`);

    return {
        type: "GET_INDIVIDUAL_PLANT",
        plant: data
    };
}

// export async function acceptFriendRequest(id) {
//     await axios.post("/accept-friend-request/" + id);
//     return {
//         type: "ACCEPT_FRIEND_REQ",
//         id
//     };
// }

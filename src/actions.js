import axios from "./axios";

export async function getPlants() {
    const { data } = await axios.get("/plants.json");

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
    const { data } = await axios.get("/user");

    return {
        type: "GET_USER",
        user: data
    };
}

export async function updatePlantImage(formData) {
    const { data } = await axios.post("/upload-plant-image", formData);

    return {
        type: "UPDATE_PLANT_IMAGE",
        image: data
    };
}

export async function updateProfileImage(formData) {
    const { data } = await axios.post("/upload-profile-image", formData);

    return {
        type: "UPDATE_PROFILE_IMAGE",
        image: data.image,
        success: true
    };
}

export async function getIndividualPlant(id) {
    const { data } = await axios.get(`/plant/${id}.json`);
    console.log("plant data: ", data);
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

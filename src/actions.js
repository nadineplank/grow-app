import axios from "./axios";

export async function getPlants(plantData) {
    // const { data } = await axios.get("/plants.json");

    return {
        type: "GET_PLANTS",
        plants: plantData
    };
}

export async function addPlant(values) {
    const { data } = await axios.post("/add-plant", values);

    return {
        type: "ADD_PLANTS",
        plants: data
    };
}

export async function editPlant(values, id) {
    const { data } = await axios.post(`/edit-plant/${id}`, values);

    return {
        type: "EDIT_PLANT",
        plantInfo: data
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

export async function uploadPlantImage(formData) {
    const { data } = await axios.post("/upload-plant-image/", formData);

    return {
        type: "UPLOAD_PLANT_IMAGE",
        image: data
    };
}

export async function updatePlantImage(formData, id) {
    const { data } = await axios.post(`/update-plant-image/${id}`, formData);
    return {
        type: "UPDATE_PLANT_IMAGE",
        image: data
    };
}

export async function updateProfileImage(formData) {
    const { data } = await axios.post("/upload-profile-image", formData);

    return {
        type: "UPDATE_PROFILE_IMAGE",
        image: data
    };
}

// export async function getIndividualPlant(id) {
//     const { data } = await axios.get(`/plant/${id}.json`);
//
//     return {
//         type: "GET_INDIVIDUAL_PLANT",
//         plant: data
//     };
// }

export async function setReminder(id, values) {
    console.log("values from setReminder: ", values);
    const { data } = await axios.post(`plant/${id}/setReminder`, values);
    return {
        type: "SET_REMINDER",
        reminder: data
    };
}

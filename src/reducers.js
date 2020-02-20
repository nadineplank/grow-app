export default function reducer(state = {}, action) {
    if (action.type === "GET_PLANTS") {
        state = {
            ...state,
            plants: action.plants
        };
    }

    if (action.type === "GET_USER") {
        state = {
            ...state,
            user: action.user
        };
    }
    if (action.type === "ADD_PLANT") {
        state = {
            ...state,
            plant: action.plant
        };
    }
    if (action.type === "EDIT_PLANT") {
        state = {
            ...state,
            plants: state.plants.map(plant => {
                if (plant.id != action.plantInfo.id) {
                    return plant;
                } else {
                    return action.plantInfo;
                }
            })
        };
    }

    if (action.type === "DELETE_PLANT") {
        state = {
            ...state,
            plant: action.plant
        };
    }

    if (action.type == "UPDATE_PLANT_IMAGE") {
        state = {
            ...state,
            plant: {
                ...state.plant,
                image: action.image
            }
        };
    }
    if (action.type == "UPDATE_PROFILE_IMAGE") {
        state = {
            ...state,
            user: {
                ...state.user,
                image: action.image
            }
        };
    }
    if (action.type == "SET_REMINDER") {
        state = {
            ...state,
            reminder: action.reminder
        };
    }

    return state;
}

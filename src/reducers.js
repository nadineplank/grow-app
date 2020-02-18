export default function reducer(state = {}, action) {
    if (action.type === "GET_PLANTS") {
        state = {
            ...state,
            plants: action.plants
        };
    }
    if (action.type === "GET_INDIVIDUAL_PLANT") {
        state = {
            ...state,
            plant: action.plant
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
    if (action.type === "DELETE_PLANT") {
        state = {
            ...state,
            plant: action.plant
        };
    }

    if (action.type === "UPDATE_IMAGE") {
        state = {
            ...state,
            image: action.image
        };
    }

    return state;
}

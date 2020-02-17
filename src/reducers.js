export default function reducer(state = {}, action) {
    if (action.type === "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "ACCEPT_FRIEND_REQ") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: action.type == "ACCEPT_FRIEND_REQ"
                    };
                }
                return friend;
            })
        };
    }
    if (action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            friends: state.friends.filter(friend => friend.id != action.id)
        };
    }

    if (action.type === "GET_MESSAGES") {
        state = {
            chatMessages: action.chatMessages
        };
    }
    if (action.type === "INSERT_MESSAGE") {
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.message)
        };
        console.log("state", state);
    }
    if (action.type === "SET_ID") {
        state = {
            ...state,
            id: action.id
        };
    }

    return state;
}

import axios from "./axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends-wannabe");

    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest(id) {
    await axios.post("/accept-friend-request/" + id);
    return {
        type: "ACCEPT_FRIEND_REQ",
        id
    };
}

export async function endFriendship(id) {
    await axios.post("/end-friendship/" + id);
    return {
        type: "END_FRIENDSHIP",
        id
    };
}

export function chatMessages(msgs) {
    return {
        type: "GET_MESSAGES",
        chatMessages: msgs
    };
}

export function chatMessage(data) {
    return {
        type: "INSERT_MESSAGE",
        message: data
    };
}

export function setId(id) {
    return {
        type: "SET_ID",
        id: id
    };
}

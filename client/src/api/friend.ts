import axios from "axios";



const viewFriends = () => {
    return axios.get('api/v1/users/friends')
}

const addFriend = (friendId : string) => {
    return axios.post(`api/v1/users/add/${friendId}`)
}
const removeFriend = (friendId : string) => {
    return axios.post(`api/v1/users/account/${friendId}`)
}

export {
    viewFriends,
    addFriend,
    removeFriend

}
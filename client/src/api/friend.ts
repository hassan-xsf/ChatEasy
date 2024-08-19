import axios from "axios";



const viewFriends = () => {
    return axios.get('/api/v1/users/friends')
}

const toggleFriend = async(friendId : string) => {
    return await axios.post(`/api/v1/users/friends/toggle/${friendId}`)
}

export {
    viewFriends,
    toggleFriend
}
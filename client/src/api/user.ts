import axios from "axios";

const searchUsers = ({ search }: { search: string | undefined }) => {
    if(!search) return;
    return axios.get(`/api/v1/users/search/${search}`)
}

export {
    searchUsers

}
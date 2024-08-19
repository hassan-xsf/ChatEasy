import axios from "axios";


const createGroup = ({ name, members }: { name: string , members: Array<string> }) => {
    return axios.post("/api/v1/group/create", { name , members }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

const viewGroup = (groupId : string) => {
    return axios.get(`api/v1/group/view/${groupId}`)
}

export {
    createGroup,
    viewGroup

}
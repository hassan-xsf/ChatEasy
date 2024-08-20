import axios from "axios";



const sendMessage = async({ msg, groupId }: { msg: string, groupId: string }) => {
    return await axios.post(`/api/v1/message/send/${msg}/${groupId}`)
}

const viewMessages = (groupId: string) => {
    return axios.get(`/api/v1/message/all/${groupId}`)
}

export {
    sendMessage,
    viewMessages

}
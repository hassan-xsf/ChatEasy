import axios from "axios";



const sendMessage = ({ msg, groupId }: { msg: string, groupId: string }) => {
    return axios.post(`api/v1/message/${msg}/${groupId}`)
}

const viewMessages = () => {
    return axios.get('api/v1/message/all')
}

export {
    sendMessage,
    viewMessages

}
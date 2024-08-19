import axios from "axios";

const registerUser = ({ email, username, password , gender }: { email: string, username: string, password: string , gender: string }) => {
    return axios.post("/api/v1/users/register", { email, username, password , gender }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

const loginUser = ({ email, password }: { email: string, password: string }) => {

    return axios.post("/api/v1/users/login", { email, password }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}

const logoOut = () => {
    return axios.post('/api/v1/users/logout')
}

export interface UserData {
    data: {
        user: {
            id: string;
            username: string;
            email: string;
        }
    }
}

const getUser = (): Promise<UserData> => {
    return axios.get('/api/v1/users/account').then(response => response.data);
};

export {
    registerUser,
    loginUser,
    logoOut,
    getUser

}
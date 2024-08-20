import axios from "axios";

const registerUser = ({ email, username, password , gender , fileURL }: { email: string, username: string, password: string , gender: string , fileURL : string }) => {
    return axios.post("/api/v1/users/register", { email, username, password , gender , fileURL }, {
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



const uploadPfp = async (file : any) => {
    const formData = new FormData();
    formData.append("upload_preset", "chatEasy");
    formData.append("file", file);
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drirwwvdw/image/upload",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

export {
    registerUser,
    loginUser,
    logoOut,
    getUser,
    uploadPfp

}
import type {LoginResponse, loginType, signupType} from "../../types/types.ts";
import axios from "axios";

export const loginUser = async (data: loginType) => {
    try {
        console.log(data.identifier)

        const response = await axios.post<LoginResponse>("http://localhost:3000/api/users/login", data);

        localStorage.setItem("Token", response.data.data.accessToken)
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            const err = e as Error;
            console.log(err.message);
        }
    }
}

export const signupUser = async (data: signupType) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/register", data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data);
        } else {
            const err = e as Error;
            console.log(err.message);
        }
    }
}


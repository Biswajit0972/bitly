import axios from "axios";
import type {shortUrlType} from "../../types/types.ts";
import {ErrorWrapper} from "../../utils/helpers/warrperRouter.ts";

const token = localStorage.getItem("Token");
export const getShortUrl = ErrorWrapper(async (data: shortUrlType) => {
    if (!token) {
        throw "Token not found";
    }
    const response = await axios.post("http://localhost:3000/api/url/short", data, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    });
    return response.data;
})

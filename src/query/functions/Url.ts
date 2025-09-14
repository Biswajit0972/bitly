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

export const getAllShortUrls = ErrorWrapper(async () => {
    if (!token) {
        throw new Error("Token not found");
    }

    const response = await axios.get("http://localhost:3000/api/urls/all", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    });
    console.log(response.data)

    return response.data;
});

export const deleteShortUrl = ErrorWrapper(async (id: string) => {
    if (!token) {
        throw new Error("Token not found");
    }
    const response = await axios.delete(`http://localhost:3000/api/urls/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true,
    });
    return response.data;
});
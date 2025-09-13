import axios from "axios";
import type {shortUrlType} from "../../types/types.ts";
import {ErrorWrapper} from "../../utils/helpers/warrperRouter.ts";


export const getShortUrl = ErrorWrapper(async (data: shortUrlType) => {
    const response = await axios.post("http://localhost:3000/api/users/register", data);
    return response.data;
})

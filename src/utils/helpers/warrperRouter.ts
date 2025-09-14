import axios from "axios";

export const getTokens = (): {isTokenAvailable: boolean,  token:  string} => {
    const token = localStorage.getItem("Token");

    if (!token  || token === "undefined") {
        return {isTokenAvailable: false, token: ""};
    }

    return {
        isTokenAvailable: true,
        token
    }
}

type Fun<T, R> = (data: T) => Promise<R> | R;

export const ErrorWrapper =
    <T, R>(fn: Fun<T, R>) => {
        return async (data: T): Promise<R | never> => {
            try {
                return await fn(data);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                   throw e.response?.data;
                } else {
                    const err = e as Error;
                    throw err.message;
                }
            }
        };
    };
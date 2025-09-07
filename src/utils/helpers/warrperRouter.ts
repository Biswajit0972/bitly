export const getTokens = (): {isTokenAvailable: boolean,  token:  string} => {
    const token = localStorage.getItem("token");
    if (!token  || token === "undefined") {
        return {isTokenAvailable: false, token: ""};
    }
    return {
        isTokenAvailable: true,
        token: JSON.parse(token)
    }
}
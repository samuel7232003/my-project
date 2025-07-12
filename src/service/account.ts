import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const serviceLogin = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password
    });
    return response;
}

export const serviceSignup = async (username: string, password: string, name: string) => {
    const response = await axios.post(`${BASE_URL}/users`, {
        username,
        password,
        name,
        role: "user"
    });
    return response;
}
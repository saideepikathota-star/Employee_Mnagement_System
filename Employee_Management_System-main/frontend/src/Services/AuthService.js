import api from "./api";

export const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
        localStorage.setItem("ems_jwt_token", response.data.token);
        localStorage.setItem("ems_user", JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (username, email, password, role) => {
    const response = await api.post("/auth/register", {
        username,
        email,
        password,
        role,
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("ems_jwt_token");
    localStorage.removeItem("ems_user");
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("ems_user");
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

export const getToken = () => {
    return localStorage.getItem("ems_jwt_token");
};

const AuthService = {
    login,
    register,
    logout,
    getCurrentUser,
    getToken,
};

export default AuthService;

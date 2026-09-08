import { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../Services/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const userData = await AuthService.login(username, password);
        setUser(userData);
        return userData;
    };

    const register = async (username, email, password, role) => {
        return await AuthService.register(username, email, password, role);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "ADMIN";

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated,
                isAdmin,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isRegister) {
                await register(username, email, password, "ROLE_USER");
                setSuccess("Account created successfully! Logging you in...");
                setTimeout(async () => {
                    await login(username, password);
                    navigate("/");
                }, 1000);
            } else {
                await login(username, password);
                navigate("/");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Authentication failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickLogin = async (usr, pwd) => {
        setUsername(usr);
        setPassword(pwd);
        setError("");
        setLoading(true);
        try {
            await login(usr, pwd);
            navigate("/");
        } catch (err) {
            setError("Quick login failed: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">💼</div>
                    <h2>EMS Portal</h2>
                    <p>Employee Management System</p>
                </div>

                <div className="login-tabs">
                    <button
                        className={`login-tab ${!isRegister ? "active" : ""}`}
                        onClick={() => {
                            setIsRegister(false);
                            setError("");
                            setSuccess("");
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`login-tab ${isRegister ? "active" : ""}`}
                        onClick={() => {
                            setIsRegister(true);
                            setError("");
                            setSuccess("");
                        }}
                    >
                        Register
                    </button>
                </div>

                {error && <div className="login-alert error">{error}</div>}
                {success && <div className="login-alert success">{success}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {isRegister && (
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
                    </button>
                </form>

                {!isRegister && (
                    <div className="quick-login">
                        <div className="quick-login-title">Quick Demo Login</div>
                        <div className="quick-login-btns">
                            <button
                                className="btn-quick"
                                onClick={() => handleQuickLogin("admin", "admin123")}
                                type="button"
                            >
                                👑 Admin Access
                            </button>
                            <button
                                className="btn-quick"
                                onClick={() => handleQuickLogin("user", "user123")}
                                type="button"
                            >
                                👤 User Access
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;

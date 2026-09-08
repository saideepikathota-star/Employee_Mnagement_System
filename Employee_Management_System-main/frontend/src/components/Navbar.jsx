import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar({ onMenuToggle }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const PAGE_TITLES = {
        "/":                { title: "Dashboard",           sub: `Welcome back, ${user?.username || 'User'} 👋` },
        "/employees":       { title: "Employee Management", sub: "Manage your team"             },
        "/add-employee":    { title: "Add Employee",        sub: "Create a new employee record"    },
        "/departments":     { title: "Departments",         sub: "Manage your organization units"  },
    };

    let pageInfo = PAGE_TITLES[location.pathname];
    if (!pageInfo && location.pathname.startsWith("/edit-employee")) {
        pageInfo = { title: "Edit Employee", sub: "Update employee details" };
    }
    if (!pageInfo) {
        pageInfo = { title: "EMS Portal", sub: "" };
    }

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

    return (
        <header className="navbar">

            {/* ── Left ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                    className="navbar-hamburger"
                    onClick={onMenuToggle}
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>

                <div className="navbar-left">
                    <h1 className="navbar-title">{pageInfo.title}</h1>
                    {pageInfo.sub && (
                        <span className="navbar-breadcrumb">{pageInfo.sub}</span>
                    )}
                </div>
            </div>

            {/* ── Right ── */}
            <div className="navbar-right">

                {/* Profile Chip with Dropdown */}
                <div className="profile-dropdown-wrapper" ref={dropdownRef}>
                    <div 
                        className="navbar-user" 
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        title="Click to view profile & logout"
                    >
                        <div className="navbar-user-avatar" style={{ background: isAdmin ? '#8b5cf6' : '#3b82f6' }}>
                            {userInitial}
                        </div>
                        <div>
                            <div className="navbar-user-name">{user?.username || "User"}</div>
                            <div className="navbar-user-role" style={{ color: isAdmin ? '#a78bfa' : '#93c5fd' }}>
                                {isAdmin ? "ADMINISTRATOR" : "STANDARD USER"}
                            </div>
                        </div>
                        <span style={{ fontSize: "10px", color: "var(--text-muted)", marginLeft: "2px" }}>
                            {dropdownOpen ? "▲" : "▼"}
                        </span>
                    </div>

                    {/* Popover Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="profile-dropdown-menu">
                            <div className="profile-dropdown-header">
                                <div 
                                    className="profile-dropdown-avatar" 
                                    style={{ background: isAdmin ? '#8b5cf6' : '#3b82f6' }}
                                >
                                    {userInitial}
                                </div>
                                <div>
                                    <div className="profile-dropdown-name">{user?.username}</div>
                                    <div className="profile-dropdown-email">{user?.email || `${user?.username}@ems.com`}</div>
                                    <span 
                                        className="profile-dropdown-badge"
                                        style={{ 
                                            background: isAdmin ? 'rgba(139, 92, 246, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                            color: isAdmin ? '#c084fc' : '#93c5fd'
                                        }}
                                    >
                                        {isAdmin ? "👑 ADMINISTRATOR" : "👤 STANDARD USER"}
                                    </span>
                                </div>
                            </div>

                            <button className="btn-logout-dropdown" onClick={handleLogout}>
                                Logout 🚪
                            </button>
                        </div>
                    )}
                </div>

            </div>

        </header>
    );
}

export default Navbar;
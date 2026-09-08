import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar({ mobileOpen, onClose }) {
    const navItems = [
        {
            section: "Main",
            links: [
                { to: "/",            icon: "🏠", label: "Dashboard"  },
            ]
        },
        {
            section: "Management",
            links: [
                { to: "/employees",   icon: "👥", label: "Employees"   },
                { to: "/departments", icon: "🏢", label: "Departments" },
            ]
        }
    ];

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <div className={`sidebar${mobileOpen ? " mobile-open" : ""}`}>

                {/* ── Brand ── */}
                <div className="sidebar-brand">
                    <div className="sidebar-brand-logo">
                        <div className="sidebar-logo-icon">💼</div>
                        <div className="sidebar-brand-text">
                            <span className="sidebar-brand-name">EMS Portal</span>
                            <span className="sidebar-brand-tagline">Employee System</span>
                        </div>
                    </div>
                </div>

                {/* ── Navigation ── */}
                <nav className="sidebar-nav">
                    {navItems.map((section) => (
                        <div key={section.section} className="sidebar-nav-section">
                            <span className="sidebar-nav-label">{section.section}</span>
                            <ul>
                                {section.links.map((item) => (
                                    <li key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            end={item.to === "/"}
                                            className={({ isActive }) =>
                                                `sidebar-link${isActive ? " active" : ""}`
                                            }
                                            onClick={() => onClose && onClose()}
                                        >
                                            <span className="sidebar-icon">{item.icon}</span>
                                            <span className="sidebar-link-text">{item.label}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

            </div>
        </>
    );
}

export default Sidebar;
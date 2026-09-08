import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, getEmployeeStats } from "../Services/EmployeeService";
import { getDepartmentCount } from "../Services/DepartmentService";
import "../styles/dashboard.css";


function Dashboard() {

    const [stats, setStats] = useState({
        totalEmployees:  null,
        totalDepts:      null,
        totalSalary:     null,
    });
    const [recentEmployees, setRecentEmployees] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadDashboard();
    }, []);


    async function loadDashboard() {
        try {
            const [statsRes, deptCountRes, empRes] = await Promise.all([
                getEmployeeStats(),
                getDepartmentCount(),
                getEmployees(),
            ]);

            setStats({
                totalEmployees: statsRes.data.totalEmployees,
                totalDepts:     deptCountRes.data,
                totalSalary:    statsRes.data.totalSalaryBudget,
            });

            // Show most recent 5 employees
            const sorted = [...empRes.data].reverse().slice(0, 5);
            setRecentEmployees(sorted);

        } catch (err) {
            console.error("Dashboard load error:", err);
        } finally {
            setLoading(false);
        }
    }


    // Format currency
    function formatCurrency(value) {
        if (value == null) return "—";
        return new Intl.NumberFormat("en-IN", {
            style:    "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(value);
    }


    // Get initials from name
    function getInitials(name = "") {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    }


    const statCards = [
        {
            key:   "totalEmployees",
            label: "Total Employees",
            icon:  "👥",
            color: "blue",
            value: loading ? null : stats.totalEmployees,
            trend: "Active workforce",
        },
        {
            key:   "totalDepts",
            label: "Departments",
            icon:  "🏢",
            color: "purple",
            value: loading ? null : stats.totalDepts,
            trend: "Organization units",
        },
        {
            key:   "totalSalary",
            label: "Salary Budget",
            icon:  "💰",
            color: "green",
            value: loading ? null : formatCurrency(stats.totalSalary),
            trend: "Monthly total",
        },
        {
            key:   "avgSalary",
            label: "Average Salary",
            icon:  "📈",
            color: "amber",
            value: loading ? null
                : stats.totalEmployees > 0
                    ? formatCurrency(stats.totalSalary / stats.totalEmployees)
                    : "—",
            trend: "Per employee",
        },
    ];


    return (
        <div className="dashboard">

            {/* ── Page Header ── */}
            <div className="dashboard-header">
                <h1 className="dashboard-greeting">Welcome back, Admin 👋</h1>
                <p className="dashboard-subtitle">
                    Here's what's happening with your workforce today.
                </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="stat-cards">
                {statCards.map((card) => (
                    <div key={card.key} className={`stat-card ${card.color}`}>
                        <div className="stat-card-icon">{card.icon}</div>
                        <div className="stat-card-body">
                            <div className="stat-card-label">{card.label}</div>
                            <div className={`stat-card-value${card.value == null ? " loading" : ""}`}>
                                {card.value != null ? card.value : ""}
                            </div>
                            <div className="stat-card-trend">↑ {card.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Recent Employees ── */}
            <div className="dashboard-section">

                <div className="dashboard-section-header">
                    <h2 className="dashboard-section-title">Recent Employees</h2>
                    <Link to="/employees" className="view-all-link">
                        View all →
                    </Link>
                </div>

                {loading ? (
                    <div className="dashboard-empty">
                        <p>Loading employees…</p>
                    </div>
                ) : recentEmployees.length === 0 ? (
                    <div className="dashboard-empty">
                        <div className="dashboard-empty-icon">👥</div>
                        <p>No employees added yet.</p>
                    </div>
                ) : (
                    <table className="recent-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentEmployees.map((emp) => (
                                <tr key={emp.employeeId}>
                                    <td>
                                        <div className="employee-name-cell">
                                            <div className="employee-initials">
                                                {getInitials(emp.employeeName)}
                                            </div>
                                            <div>
                                                <div className="employee-name-text">
                                                    {emp.employeeName}
                                                </div>
                                                <div className="employee-email-text">
                                                    {emp.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="designation-badge">
                                            {emp.designation || "—"}
                                        </span>
                                    </td>
                                    <td>{emp.department || "—"}</td>
                                    <td>
                                        <span className="salary-value">
                                            {formatCurrency(emp.salary)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>

        </div>
    );
}


export default Dashboard;
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar    from "./components/Sidebar";
import Navbar     from "./components/Navbar";

import Dashboard    from "./pages/Dashboard";
import Employees    from "./pages/Employees";
import AddEmployee  from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Departments  from "./pages/Departments";
import Login        from "./pages/Login";

import "./styles/App.css";

function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app">
            <Sidebar
                mobileOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="main">
                <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
                <div className="page-content">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />
                        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
                        <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
                        <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<MainLayout />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
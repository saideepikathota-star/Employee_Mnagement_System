import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../Services/EmployeeService";
import { getDepartments } from "../Services/DepartmentService";
import { useAuth } from "../context/AuthContext";
import useToast from "../components/Toast";
import "../styles/form.css";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast, ToastContainer } = useToast();
    const { isAdmin } = useAuth();

    const [form, setForm]           = useState({
        employeeName: "",
        email:        "",
        designation:  "",
        department:   "",
        salary:       "",
    });
    const [errors, setErrors]       = useState({});
    const [saving, setSaving]       = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        Promise.all([
            getEmployeeById(id),
            getDepartments(),
        ])
            .then(([empRes, deptRes]) => {
                const emp = empRes.data;
                setForm({
                    employeeName: emp.employeeName || "",
                    email:        emp.email        || "",
                    designation:  emp.designation  || "",
                    department:   emp.department   || "",
                    salary:       emp.salary       || "",
                });
                setDepartments(deptRes.data);
            })
            .catch((err) => {
                console.error(err);
                showToast({
                    type:    "error",
                    title:   "Load Failed",
                    message: "Could not load employee data.",
                });
            })
            .finally(() => setLoadingData(false));
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function validate() {
        const e = {};
        if (!form.employeeName.trim())     e.employeeName = "Employee name is required.";
        if (!form.email.trim())            e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email))
                                           e.email = "Enter a valid email address.";
        if (!form.designation.trim())      e.designation = "Designation is required.";
        if (!form.salary)                  e.salary = "Salary is required.";
        else if (Number(form.salary) <= 0) e.salary = "Salary must be greater than zero.";
        return e;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!isAdmin) {
            showToast({
                type: "error",
                title: "Permission Denied",
                message: "Standard users cannot edit employee records. Admin role required.",
            });
            return;
        }

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSaving(true);

        const payload = {
            ...form,
            salary: Number(form.salary),
        };

        updateEmployee(id, payload)
            .then(() => {
                showToast({
                    type:    "success",
                    title:   "Updated!",
                    message: `${form.employeeName} has been updated successfully.`,
                });
                setTimeout(() => navigate("/employees"), 1200);
            })
            .catch((err) => {
                console.error(err);
                const msg = err.response?.data?.message || err.message || "Could not update employee.";
                showToast({
                    type:    "error",
                    title:   "Update Failed",
                    message: msg,
                });
                setSaving(false);
            });
    }

    if (loadingData) {
        return (
            <div className="form-page">
                <div className="form-card" style={{ textAlign: "center", padding: "60px" }}>
                    <p style={{ color: "var(--text-muted)" }}>Loading employee data…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page">

            {!isAdmin && (
                <div style={{
                    padding: '12px 16px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span>⚠️</span>
                    <span><strong>Read-Only Mode:</strong> You are logged in as a Standard User. Only Administrators can update employee records.</span>
                </div>
            )}

            <div className="form-page-header">
                <button className="btn-back" onClick={() => navigate("/employees")}>
                    ←
                </button>
                <div>
                    <h1 className="form-page-title">Edit Employee</h1>
                    <p className="form-page-subtitle">Update the details for {form.employeeName}</p>
                </div>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit} noValidate>

                    <div className="form-grid">

                        <div className="form-group">
                            <label className="form-label" htmlFor="employeeName">
                                Full Name <span className="required">*</span>
                            </label>
                            <input
                                id="employeeName"
                                name="employeeName"
                                type="text"
                                className={`form-input${errors.employeeName ? " error" : ""}`}
                                value={form.employeeName}
                                onChange={handleChange}
                                disabled={!isAdmin}
                            />
                            {errors.employeeName && (
                                <span className="form-error-msg">⚠ {errors.employeeName}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email Address <span className="required">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`form-input${errors.email ? " error" : ""}`}
                                value={form.email}
                                onChange={handleChange}
                                disabled={!isAdmin}
                            />
                            {errors.email && (
                                <span className="form-error-msg">⚠ {errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="designation">
                                Designation <span className="required">*</span>
                            </label>
                            <input
                                id="designation"
                                name="designation"
                                type="text"
                                className={`form-input${errors.designation ? " error" : ""}`}
                                value={form.designation}
                                onChange={handleChange}
                                disabled={!isAdmin}
                            />
                            {errors.designation && (
                                <span className="form-error-msg">⚠ {errors.designation}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="department">
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                className="form-select"
                                value={form.department}
                                onChange={handleChange}
                                disabled={!isAdmin}
                            >
                                <option value="">— Select Department —</option>
                                {departments.map((d) => (
                                    <option key={d.departmentId} value={d.departmentName}>
                                        {d.departmentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label" htmlFor="salary">
                                Monthly Salary (₹) <span className="required">*</span>
                            </label>
                            <input
                                id="salary"
                                name="salary"
                                type="number"
                                min="1"
                                className={`form-input${errors.salary ? " error" : ""}`}
                                value={form.salary}
                                onChange={handleChange}
                                disabled={!isAdmin}
                            />
                            {errors.salary && (
                                <span className="form-error-msg">⚠ {errors.salary}</span>
                            )}
                        </div>

                    </div>

                    <hr className="form-divider" />

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate("/employees")}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-save" 
                            disabled={!isAdmin || saving}
                            style={{ opacity: !isAdmin ? 0.6 : 1 }}
                        >
                            {!isAdmin ? "🔒 Admin Role Required to Save" : saving ? "Updating…" : "✓ Update Employee"}
                        </button>
                    </div>

                </form>
            </div>

            <ToastContainer />
        </div>
    );
}

export default EditEmployee;

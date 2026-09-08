import api from "./api";

const API_URL = "/employees";

// GET all employees
export const getEmployees = () => {
    return api.get(API_URL);
};

// GET employee by ID
export const getEmployeeById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

// POST — add new employee
export const addEmployee = (employee) => {
    return api.post(API_URL, employee);
};

// PUT — update existing employee
export const updateEmployee = (id, employee) => {
    return api.put(`${API_URL}/${id}`, employee);
};

// DELETE — remove employee
export const deleteEmployee = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

// GET stats — for dashboard cards
export const getEmployeeStats = () => {
    return api.get(`${API_URL}/stats`);
};
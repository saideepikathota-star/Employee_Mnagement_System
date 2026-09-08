import api from "./api";

const API_URL = "/departments";

// GET all departments
export const getDepartments = () => {
    return api.get(API_URL);
};

// GET department by ID
export const getDepartmentById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

// POST — add new department
export const addDepartment = (department) => {
    return api.post(API_URL, department);
};

// PUT — update existing department
export const updateDepartment = (id, department) => {
    return api.put(`${API_URL}/${id}`, department);
};

// DELETE — remove department
export const deleteDepartment = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

// GET total department count
export const getDepartmentCount = () => {
    return api.get(`${API_URL}/count`);
};

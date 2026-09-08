package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.entity.Department;
import com.ems.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    // Get all departments
    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    // Save a new department
    public Department saveDepartment(Department department) {
        return repository.save(department);
    }

    // Get department by ID
    public Department getDepartmentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // Update department
    public Department updateDepartment(Integer id, Department department) {

        Department existing = repository.findById(id).orElse(null);

        if (existing != null) {
            existing.setDepartmentName(department.getDepartmentName());
            existing.setDescription(department.getDescription());
            existing.setLocation(department.getLocation());
            return repository.save(existing);
        }

        return null;
    }

    // Delete department
    public void deleteDepartment(Integer id) {
        repository.deleteById(id);
    }

    // Count total departments
    public long countDepartments() {
        return repository.count();
    }
}

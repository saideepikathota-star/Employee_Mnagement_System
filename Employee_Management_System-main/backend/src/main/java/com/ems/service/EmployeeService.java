package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    // Get all employees
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // Save employee
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    // Get employee by ID
    public Employee getEmployeeById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // Update employee
    public Employee updateEmployee(Integer id, Employee employee) {

        Employee existingEmployee = repository.findById(id).orElse(null);

        if (existingEmployee != null) {
            existingEmployee.setEmployeeName(employee.getEmployeeName());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setSalary(employee.getSalary());
            existingEmployee.setDesignation(employee.getDesignation());
            existingEmployee.setDepartment(employee.getDepartment());
            return repository.save(existingEmployee);
        }

        return null;
    }

    // Delete employee
    public void deleteEmployee(Integer id) {
        repository.deleteById(id);
    }

    // Count total employees (for dashboard)
    public long countEmployees() {
        return repository.count();
    }

    // Calculate total salary budget (for dashboard)
    public Double getTotalSalaryBudget() {
        return repository.findAll()
                .stream()
                .mapToDouble(e -> e.getSalary() != null ? e.getSalary() : 0)
                .sum();
    }
}
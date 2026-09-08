package com.ems.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.Employee;
import com.ems.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    // GET /employees
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    // GET /employees/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Employee getEmployeeById(@PathVariable Integer id) {
        return service.getEmployeeById(id);
    }

    // POST /employees
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Employee saveEmployee(@RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }

    // PUT /employees/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Employee updateEmployee(
            @PathVariable Integer id,
            @RequestBody Employee employee) {
        return service.updateEmployee(id, employee);
    }

    // DELETE /employees/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String deleteEmployee(@PathVariable Integer id) {
        service.deleteEmployee(id);
        return "Employee deleted successfully";
    }

    // GET /employees/stats — for Dashboard cards
    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", service.countEmployees());
        stats.put("totalSalaryBudget", service.getTotalSalaryBudget());
        return stats;
    }
}
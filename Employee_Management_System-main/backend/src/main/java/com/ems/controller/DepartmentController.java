package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.Department;
import com.ems.service.DepartmentService;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    @Autowired
    private DepartmentService service;

    // GET /departments
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Department> getAllDepartments() {
        return service.getAllDepartments();
    }

    // GET /departments/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Department getDepartmentById(@PathVariable Integer id) {
        return service.getDepartmentById(id);
    }

    // POST /departments
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Department saveDepartment(@RequestBody Department department) {
        return service.saveDepartment(department);
    }

    // PUT /departments/{id}
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Department updateDepartment(
            @PathVariable Integer id,
            @RequestBody Department department) {
        return service.updateDepartment(id, department);
    }

    // DELETE /departments/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String deleteDepartment(@PathVariable Integer id) {
        service.deleteDepartment(id);
        return "Department deleted successfully";
    }

    // GET /departments/count
    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public long countDepartments() {
        return service.countDepartments();
    }
}

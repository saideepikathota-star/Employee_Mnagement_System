package com.ems.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ems.entity.Employee;
import com.ems.entity.Role;
import com.ems.entity.User;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed initial employees in employee table if not present
        if (!employeeRepository.existsByEmail("admin@ems.com")) {
            Employee adminEmp = new Employee();
            adminEmp.setEmployeeName("Admin User");
            adminEmp.setEmail("admin@ems.com");
            adminEmp.setDesignation("HR Administrator");
            adminEmp.setDepartment("Executive");
            adminEmp.setSalary(120000.0);
            employeeRepository.save(adminEmp);
        }

        if (!employeeRepository.existsByEmail("user@ems.com")) {
            Employee userEmp = new Employee();
            userEmp.setEmployeeName("Standard Employee");
            userEmp.setEmail("user@ems.com");
            userEmp.setDesignation("Software Engineer");
            userEmp.setDepartment("Engineering");
            userEmp.setSalary(75000.0);
            employeeRepository.save(userEmp);
        }

        // Seed default user accounts in users table if not present
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                    "admin",
                    "admin@ems.com",
                    passwordEncoder.encode("admin123"),
                    Role.ROLE_ADMIN
            );
            userRepository.save(admin);
            logger.info("Default admin user created: admin / admin123");
        }

        if (!userRepository.existsByUsername("user")) {
            User user = new User(
                    "user",
                    "user@ems.com",
                    passwordEncoder.encode("user123"),
                    Role.ROLE_USER
            );
            userRepository.save(user);
            logger.info("Default standard user created: user / user123");
        }
    }
}

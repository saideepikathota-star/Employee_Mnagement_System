package com.ems.controller;

import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ems.dto.JwtResponse;
import com.ems.dto.LoginRequest;
import com.ems.dto.RegisterRequest;
import com.ems.entity.Role;
import com.ems.entity.User;
import com.ems.repository.UserRepository;
import com.ems.security.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User dbUser = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(item -> item.getAuthority())
                .orElse(Role.ROLE_USER.name());

        return ResponseEntity.ok(new JwtResponse(jwt,
                                                 dbUser.getId(),
                                                 dbUser.getUsername(),
                                                 dbUser.getEmail(),
                                                 role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Error: Email is already in use!"));
        }

        // Determine user role
        Role userRole = Role.ROLE_USER;
        if (signUpRequest.getRole() != null) {
            String reqRole = signUpRequest.getRole().toUpperCase();
            if (reqRole.equals("ADMIN") || reqRole.equals("ROLE_ADMIN")) {
                userRole = Role.ROLE_ADMIN;
            }
        }

        // Create new user account
        User user = new User(signUpRequest.getUsername(),
                             signUpRequest.getEmail(),
                             encoder.encode(signUpRequest.getPassword()),
                             userRole);

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User dbUser = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(item -> item.getAuthority())
                .orElse(Role.ROLE_USER.name());

        return ResponseEntity.ok(new JwtResponse("",
                                                 dbUser.getId(),
                                                 dbUser.getUsername(),
                                                 dbUser.getEmail(),
                                                 role));
    }
}

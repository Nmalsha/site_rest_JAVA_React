package com.doranco.resto.controller;

import com.doranco.resto.entity.User;
import com.doranco.resto.repository.UserRepository;
import com.doranco.resto.service.UserService;
import com.doranco.resto.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {    

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        List<String> roles = user.getRoles();
        if (roles == null || roles.isEmpty()) {
            
            roles = List.of("ROLE_USER");
            user.setRoles(roles);
        }
        
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

   
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setNickname(userDetails.getNickname());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            User updatedUser = userService.updateUser(existingUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword())
            );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    
       
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginUser.getEmail());
    
     
        String jwt = jwtUtil.generateToken(userDetails);
    
       
        Optional<User> optionalUser = userRepository.findByEmail(loginUser.getEmail());
        
        if (optionalUser.isPresent()) {
            // User existingUser = optionalUser.get();
            // String nickname = existingUser.getNickname();
            // Long id = existingUser.getId();
            // System.out.println("Retrieved nickname: " + nickname);
            // System.out.println("Retrieved connected user Id: " + id);
            // // Return response with JWT and nickname

        

            return ResponseEntity.ok(new JwtResponse(jwt));
        } else {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
    }
    
    
}
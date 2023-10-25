package com.example.AniList.controller;

import ch.qos.logback.core.joran.conditional.ElseAction;
import com.example.AniList.exception.UserBadRequestExceptionHandler;
import com.example.AniList.model.User;
import com.example.AniList.model.UserLoginDTO;
import com.example.AniList.repository.UserRepository;
import com.example.AniList.service.TokenService;
import com.example.AniList.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, UserRepository userRepository, TokenService tokenService, AuthenticationManager authenticationManager)
    {
        this.userService = userService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody @Valid UserLoginDTO userLoginDTO)
    {
        try
        {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password()));
            String token = tokenService.generateToken(authentication);
            Map<String, String> response = new HashMap<>();
            response.put("email", userLoginDTO.email());
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Authentication failed. Invalid email or password."));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user)
    {
        if(userRepository.isEmailTaken(user))
        {
            String errorMessage = "Email is already taken. Please choose a different email.";
            UserBadRequestExceptionHandler errorResponse = new UserBadRequestExceptionHandler(errorMessage);
            return ResponseEntity.badRequest().body(errorResponse);
        }
        else
        {
            Integer userId = userService.registerUser(user);
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            String token = tokenService.generateToken(authentication);
            Map<String, Object> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
    }
}

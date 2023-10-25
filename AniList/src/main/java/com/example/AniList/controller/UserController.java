package com.example.AniList.controller;

import com.example.AniList.exception.UserBadRequestExceptionHandler;
import com.example.AniList.model.User;
import com.example.AniList.model.UserLoginDTO;
import com.example.AniList.repository.UserRepository;
import com.example.AniList.service.TokenService;
import com.example.AniList.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestBody @Valid UserLoginDTO userLoginDTO)
    {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.email(), userLoginDTO.password()));
        return tokenService.generateToken(authentication);
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

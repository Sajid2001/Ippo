package com.example.AniList.service;

import com.example.AniList.model.User;
import com.example.AniList.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public int registerUser(User user)
    {
        String password = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Integer userId = userRepository.saveUser(user);
        user.setPassword(password);
        return userId;
    }
}

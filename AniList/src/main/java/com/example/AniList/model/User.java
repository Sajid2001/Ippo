package com.example.AniList.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

public class User {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Integer userId;
    private @Email @NotBlank(message = "Email cannot be blank") String email;
    private @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters long.") String password;
    //@Pattern(regexp = "^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"

    public User(Integer userId, String email, String password)
    {
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    public User()
    {

    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer user_id) {
        this.userId = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

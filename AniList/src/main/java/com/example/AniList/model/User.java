package com.example.AniList.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    @Email( message = "Must be a valid email address")
    @NotBlank(message = "Email cannot be blank")
    private String email;
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[!.,/]).{8,}$", message = "Must be at least 8 letters long" +
            " and contain an uppercase, lowercase, and special character")
    private String password;


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

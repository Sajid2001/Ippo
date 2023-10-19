package com.example.AniList.model;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

public class User {
    private final @Id @NotBlank String username;

    public User(String username)
    {
        this.username = username;
    }
}

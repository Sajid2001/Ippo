package com.example.AniList.exception;

public class UserBadRequestExceptionHandler {
    private String error;

    public UserBadRequestExceptionHandler(String error)
    {
        this.error = error;
    }

    public String getError()
    {
        return error;
    }

    public void setError(String error)
    {
        this.error = error;
    }
}


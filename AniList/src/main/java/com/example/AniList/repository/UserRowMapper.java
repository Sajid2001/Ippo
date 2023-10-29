package com.example.AniList.repository;

import com.example.AniList.model.User;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int rowNum) throws SQLException
    {
        return new User(
                resultSet.getInt("user_id"),
                resultSet.getString("email"),
                resultSet.getString("password")
        );
    }
}


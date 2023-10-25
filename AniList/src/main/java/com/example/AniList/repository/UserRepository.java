package com.example.AniList.repository;

import com.example.AniList.model.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean isEmailTaken(User user)
    {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, user.getEmail());
        return count > 0;
    }

    public ResponseEntity<User> getUserByEmail(String email) {
        String sql = "SELECT user_id, email, password FROM users WHERE email = ?";
        try
        {
            User user = jdbcTemplate.queryForObject(sql, new Object[]{email}, (rs, rowNum) -> {
                Integer userId = rs.getInt("user_id");
                String password = rs.getString("password");
                User u = new User();
                u.setUserId(userId);
                u.setEmail(email);
                u.setPassword(password);
                return u;
            });
            return ResponseEntity.ok(user);
        }
        catch (EmptyResultDataAccessException e)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Integer> getUserIdByEmail(String email) {
        String sql = "SELECT user_id FROM users WHERE email = ?";
        try
        {
            Integer userId = jdbcTemplate.queryForObject(sql, new Object[]{email}, Integer.class);
            if (userId != null)
            {
                return ResponseEntity.ok(userId);
            }
            else
            {
                return ResponseEntity.notFound().build();
            }
        }
        catch (EmptyResultDataAccessException e)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public int saveUser(User user)
    {
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection ->
        {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"user_id"});
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }
}

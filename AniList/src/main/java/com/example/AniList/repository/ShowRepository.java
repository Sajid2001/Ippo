package com.example.AniList.repository;

import com.example.AniList.model.Show;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.sql.Time;
import java.util.List;

@Repository
public class ShowRepository {
    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;

    public ShowRepository(JdbcTemplate jdbcTemplate, UserRepository userRepository)
    {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
    }

    public List<Show> getAllShows()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer user_id = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String sql = "SELECT * FROM shows WHERE user_id=?";
        return jdbcTemplate.query(sql, new Object[]{user_id}, new ShowRowMapper());
    }

    public ResponseEntity<Show> getShowByShowId(int show_id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer user_id = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String sql = "SELECT * FROM shows WHERE show_id=? AND user_id=?";
        Show show;
        try
        {
            show = jdbcTemplate.queryForObject(sql, new Object[]{show_id, user_id}, new ShowRowMapper());
            return ResponseEntity.ok(show);
        }
        catch (EmptyResultDataAccessException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public int saveShow(Show show)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer user_id = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String sql = "INSERT INTO shows (user_id, name, showType, episodesWatched, lastSeenDescription, imageUrl, customUrl, malUrl, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection ->
        {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"show_id"});
            ps.setInt(1, user_id);
            ps.setString(2, show.getName());
            ps.setString(3, show.getShowType());
            if(show.getEpisodesWatched() !=null)
            {
                ps.setInt(4, show.getEpisodesWatched());
            }
            else
            {
                ps.setInt(4,0);
            }
            ps.setString(5, show.getLastSeenDescription());
            ps.setString(6, show.getImageUrl());
            ps.setString(7, show.getCustomUrl());
            ps.setString(8, show.getMalUrl());
            if(show.getShowType() != null)
            {
                if (show.getShowType().equals("Movie"))
                {
                    ps.setString(9, show.getTimeStamp());
                }
                else
                {
                    String time = "00:00:00";
                    ps.setString(9, time);
                }
            }
            else
            {
                Time time = Time.valueOf("00:00:00");
                ps.setTime(9, time);
            }
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void updateShow(int show_id, Show show)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer user_id = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String sql = "UPDATE shows SET name=?, showType=?, episodesWatched=?, lastSeenDescription=?, imageUrl=?, customUrl=?, malUrl=?, timeStamp=? WHERE user_id=? AND show_id=?";
        jdbcTemplate.update(sql, show.getName(), show.getShowType(), show.getEpisodesWatched(), show.getLastSeenDescription(), show.getImageUrl(), show.getCustomUrl(), show.getMalUrl(), show.getTimeStamp(), user_id, show_id);
    }

    public void deleteShow(int show_id)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer user_id = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String sql = "DELETE FROM shows WHERE user_id=? AND show_id=?";
        jdbcTemplate.update(sql, user_id, show_id);
    }
}


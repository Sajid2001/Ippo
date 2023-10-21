package com.example.AniList.repository;

import com.example.AniList.model.Show;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import java.sql.PreparedStatement;
import java.sql.Time;
import java.util.List;

@Repository
public class ShowRepository {
    private final JdbcTemplate jdbcTemplate;

    public ShowRepository(JdbcTemplate jdbcTemplate)
    {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Show> getAllShows()
    {
        String sql = "SELECT * FROM shows";
        return jdbcTemplate.query(sql, new ShowRowMapper());
    }

    public ResponseEntity<Show> getShowById(int showId) {
        String sql = "SELECT * FROM shows WHERE id=?";
        Show show;
        try
        {
            show = jdbcTemplate.queryForObject(sql, new Object[]{showId}, new ShowRowMapper());
            return ResponseEntity.ok(show);
        }
        catch (EmptyResultDataAccessException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public int saveShow(Show show)
    {
        String sql = "INSERT INTO shows (name, showType, episodesWatched, lastSeenDescription, imageUrl, customUrl, malUrl, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection ->
        {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setString(1, show.getName());
            ps.setString(2, show.getShowType());
            if(show.getEpisodesWatched() !=null)
            {
                ps.setInt(3, show.getEpisodesWatched());
            }
            else
            {
                ps.setInt(3,0);
            }
            ps.setString(4, show.getLastSeenDescription());
            ps.setString(5, show.getImageUrl());
            ps.setString(6, show.getCustomUrl());
            ps.setString(7, show.getMalUrl());
            if(show.getShowType() != null)
            {
                if (show.getShowType().equals("Movie"))
                {
                    ps.setString(8, show.getTimeStamp());
                }
                else
                {
                    String time = "00:00:00";
                    ps.setString(8, time);
                }
            }
            else
            {
                Time time = Time.valueOf("00:00:00");
                ps.setTime(8, time);
            }
            return ps;
        }, keyHolder);
        return keyHolder.getKey().intValue();
    }

    public void updateShow(int showId, Show show)
    {
        String sql = "UPDATE shows SET name=?, showType=?, episodesWatched=?, lastSeenDescription=?, imageUrl=?, customUrl=?, malUrl=?, timeStamp=? WHERE id=?";
        jdbcTemplate.update(sql, show.getName(), show.getShowType(), show.getEpisodesWatched(), show.getLastSeenDescription(), show.getImageUrl(), show.getCustomUrl(), show.getMalUrl(), show.getTimeStamp(), showId);
    }

    public void deleteShow(int showId)
    {
        String sql = "DELETE FROM shows WHERE id=?";
        jdbcTemplate.update(sql, showId);
    }
}


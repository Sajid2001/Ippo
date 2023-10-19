package com.example.AniList.repository;

import com.example.AniList.model.StreamInfo;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StreamInfoRepository {
    private final JdbcTemplate jdbcTemplate;

    public StreamInfoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<StreamInfo> getAllStreamInfo()
    {
        String sql = "SELECT * FROM stream_info";
        return jdbcTemplate.query(sql, new StreamInfoRowMapper());
    }

    public ResponseEntity<StreamInfo> getStreamInfoById(int streamInfoId) {
        String sql = "SELECT * FROM stream_info WHERE id=?";
        StreamInfo streamInfo;
        try
        {
            streamInfo = jdbcTemplate.queryForObject(sql, new Object[]{streamInfoId}, new StreamInfoRowMapper());
            return ResponseEntity.ok(streamInfo);
        }
        catch (EmptyResultDataAccessException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<StreamInfo>> getStreamInfoByShowId(int show_id) {
        String sql = "SELECT * FROM stream_info WHERE show_id=?";
        try
        {
            List<StreamInfo> streamInfoList = jdbcTemplate.query(sql, new Object[]{show_id}, new StreamInfoRowMapper());
            return ResponseEntity.ok(streamInfoList);
        }
        catch (EmptyResultDataAccessException ex)
        {
            return ResponseEntity.notFound().build();
        }
    }

    public void saveStreamInfo(StreamInfo streamInfo)
    {
        String sql = "INSERT INTO stream_info (show_id, stream, url) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, streamInfo.getShowId(), streamInfo.getStream(), streamInfo.getUrl());
    }

    public void updateStreamInfo(int streamInfoId, StreamInfo streamInfo)
    {
        String sql = "UPDATE stream_info SET stream=?, url=?, WHERE id=?";
        jdbcTemplate.update(sql, streamInfo.getStream(), streamInfo.getUrl(), streamInfoId);
    }

    public void deleteStreamInfo(int streamInfoId)
    {
        String sql = "DELETE FROM stream_info WHERE id=?";
        jdbcTemplate.update(sql, streamInfoId);
    }
}

package com.example.AniList.repository;

import com.example.AniList.model.StreamInfo;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class StreamInfoRowMapper implements RowMapper<StreamInfo>
{
    @Override
    public StreamInfo mapRow(ResultSet resultSet, int rowNum) throws SQLException
    {
        StreamInfo streamInfo = new StreamInfo();
        streamInfo.setStreamInfoId(resultSet.getInt("stream_info_id"));
        streamInfo.setShowId(resultSet.getInt("show_id"));
        streamInfo.setStream(resultSet.getString("stream"));
        streamInfo.setUrl(resultSet.getString("url"));
        return streamInfo;
    }
}

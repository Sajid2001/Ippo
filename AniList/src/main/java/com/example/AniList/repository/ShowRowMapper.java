package com.example.AniList.repository;

import com.example.AniList.model.Show;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ShowRowMapper implements RowMapper<Show> {
    @Override
    public Show mapRow(ResultSet resultSet, int rowNum) throws SQLException
    {
        return new Show(
                resultSet.getInt("id"),
                resultSet.getString("name"),
                resultSet.getString("showType"),
                resultSet.getInt("episodesWatched"),
                resultSet.getString("lastSeenDescription"),
                resultSet.getString("imageUrl"),
                resultSet.getString("customUrl"),
                resultSet.getString("malUrl"),
                resultSet.getString("timeStamp")
        );
    }
}


package com.example.AniList.model;

import com.example.AniList.serializer.StreamInfoSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = StreamInfoSerializer.class)
public class StreamInfo {
    private Integer id;
    private Integer showId;
    private String stream;
    private String url;

    public StreamInfo() {
    }

    public StreamInfo(String stream, String url) {
        this.stream = stream;
        this.url = url;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

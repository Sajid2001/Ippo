package com.example.AniList.model;

import com.example.AniList.serializer.StreamInfoSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = StreamInfoSerializer.class)
public class StreamInfo {
    private Integer streamInfoId;
    private Integer showId;
    private String logoUrl;
    private String stream;
    private String caption;
    private String url;

    public StreamInfo() {
    }

    public StreamInfo(String stream, String logoUrl, String caption, String url) {
        this.stream = stream;
        this.logoUrl = logoUrl;
        this.caption = caption;
        this.url = url;
    }

    public Integer getStreamInfoId() {
        return streamInfoId;
    }

    public void setStreamInfoId(Integer stream_info_id) {
        this.streamInfoId = stream_info_id;
    }

    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

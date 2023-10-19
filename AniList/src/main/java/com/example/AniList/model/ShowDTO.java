package com.example.AniList.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowDTO {
    @JsonProperty("title")
    private String name;
    @JsonProperty("type")
    private String showType;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("url")
    private String malUrl;

    public String getName() {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getShowType() {
        return showType;
    }

    public void setShowType(String showType) {
        this.showType = showType;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl)
    {
        this.imageUrl = imageUrl;
    }

    public String getMalUrl() {
        return malUrl;
    }

    public void setMalUrl(String malUrl)
    {
        this.malUrl = malUrl;
    }
}

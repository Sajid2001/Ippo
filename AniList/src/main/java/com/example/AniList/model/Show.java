package com.example.AniList.model;

import jakarta.validation.constraints.*;

public class Show {
    private Integer id;
    @NotBlank(message = "Name cannot be blank")
    private String name;
    private String showType;
    @NotNull(message = "Positive number value is required for episode number")
    @Min(value = 0, message = "Episode number cannot be less than 0")
    private Integer episodesWatched;
    @Size(max = 255, message = "Description cannot be longer than 255 characters")
    private String lastSeenDescription;
    private String imageUrl;
    private String customUrl;
    private String malUrl;
    @Pattern(regexp = "([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]", message = "Incorrect timestamp format. Must be in hh:mm:ss")
    private String timeStamp;

    public Show(Integer id, String name, String showType, Integer episodesWatched, String lastSeenDescription, String imageUrl, String customUrl, String malUrl, String timeStamp)
    {
        this.id = id;
        this.name = name;
        this.showType = showType;
        this.episodesWatched = episodesWatched;
        this.lastSeenDescription = lastSeenDescription;
        this.imageUrl = imageUrl;
        this.customUrl = customUrl;
        this.malUrl = malUrl;
        this.timeStamp = timeStamp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShowType() {
        return showType;
    }

    public void setShowType(String showType) {
        this.showType = showType;
    }

    public Integer getEpisodesWatched() {
        return episodesWatched;
    }

    public void setEpisodesWatched(Integer episodesWatched) {
        this.episodesWatched = episodesWatched;
    }

    public String getLastSeenDescription() {
        return lastSeenDescription;
    }

    public void setLastSeenDescription(String lastSeenDescription) {
        this.lastSeenDescription = lastSeenDescription;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCustomUrl() {
        return customUrl;
    }

    public void setCustomUrl(String customUrl) {
        this.customUrl = customUrl;
    }

    public String getMalUrl() {
        return malUrl;
    }

    public void setMalUrl(String malUrl) {
        this.malUrl = malUrl;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }
}

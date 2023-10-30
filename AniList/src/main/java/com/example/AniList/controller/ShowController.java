package com.example.AniList.controller;

import com.example.AniList.model.Show;
import com.example.AniList.model.ShowDTO;
import com.example.AniList.model.StreamInfo;
import com.example.AniList.repository.ShowRepository;
import com.example.AniList.repository.StreamInfoRepository;
import com.example.AniList.repository.UserRepository;
import com.example.AniList.service.ShowService;
import com.example.AniList.service.StreamInfoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ShowController {
    private final ShowService showService;
    private final StreamInfoService streamInfoService;
    private final ShowRepository showRepository;
    private final StreamInfoRepository streamInfoRepository;
    private final UserRepository userRepository;

    public ShowController(ShowService showService, StreamInfoService streamInfoService, ShowRepository showRepository, StreamInfoRepository streamInfoRepository, UserRepository userRepository)
    {
        this.showService = showService;
        this.streamInfoService = streamInfoService;
        this.showRepository = showRepository;
        this.streamInfoRepository = streamInfoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<?> getShows(@RequestParam(required = false) String query)
    {
        if(query != null)
        {
            List<ShowDTO> searchResults = showService.searchAnime(query);
            return ResponseEntity.ok(searchResults);
        }
        else
        {
            List<Show> allShows = showRepository.getAllShows();
            return ResponseEntity.ok(allShows);
        }
    }

    @GetMapping("/bookmarks/{showId}")
    public ResponseEntity<?> getShowById(@PathVariable Integer showId)
    {
        ResponseEntity<Show> showResponse = showRepository.getShowByShowId(showId);
        if(showResponse.getStatusCode() == HttpStatus.OK)
        {
            Show show = showResponse.getBody();
            return ResponseEntity.ok(show);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/bookmarks")
    public ResponseEntity<Object> addShow(@Valid @RequestBody Show show)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = userRepository.getUserIdByEmail(authentication.getName()).getBody();
        String query = show.getName();
        Integer showId = showRepository.saveShow(show);
        List<StreamInfo> streamingInfo = streamInfoService.scrapeLiveChart(query);
        if (!streamingInfo.isEmpty())
        {
            for (StreamInfo streamInfo : streamingInfo)
            {
                streamInfo.setShowId(showId);
                streamInfoRepository.saveStreamInfo(streamInfo);
            }
            if(show.getTimeStamp() == null)
            {
                show.setTimeStamp("00:00:00");
            }
        }
        show.setShowId(showId);
        show.setUserId(userId);
        return ResponseEntity.ok(show);
    }

    //Look for more efficient way
    @PutMapping("/bookmarks/{showId}")
    public ResponseEntity<Show> updateShow(@PathVariable Integer showId, @Valid @RequestBody Show updatedShow)
    {
        ResponseEntity<Show> showResponse = showRepository.getShowByShowId(showId);
        if(showResponse.getStatusCode() == HttpStatus.OK)
        {
            Show existingShow = showResponse.getBody();
            if(updatedShow.getName() != null)
            {
                existingShow.setName(updatedShow.getName());
            }
            if(updatedShow.getShowType() != null)
            {
                existingShow.setShowType(updatedShow.getShowType());
            }
            if(updatedShow.getEpisodesWatched() != null)
            {
                existingShow.setEpisodesWatched(updatedShow.getEpisodesWatched());
            }
            if(updatedShow.getLastSeenDescription() != null)
            {
                existingShow.setLastSeenDescription(updatedShow.getLastSeenDescription());
            }
            if(updatedShow.getImageUrl() != null)
            {
                existingShow.setImageUrl(updatedShow.getImageUrl());
            }
            if(updatedShow.getCustomUrl() != null)
            {
                existingShow.setCustomUrl(updatedShow.getCustomUrl());
            }
            if(updatedShow.getMalUrl() != null)
            {
                existingShow.setMalUrl(updatedShow.getMalUrl());
            }
            if(updatedShow.getTimeStamp() != null)
            {
                existingShow.setTimeStamp(updatedShow.getTimeStamp());
            }
            showRepository.updateShow(showId, existingShow);
            return ResponseEntity.ok(existingShow);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/bookmarks/{showId}")
    public ResponseEntity<Show> deleteShow(@PathVariable Integer showId)
    {
        ResponseEntity<Show> showResponse = showRepository.getShowByShowId(showId);
        if(showResponse.getStatusCode() == HttpStatus.OK)
        {
            Show deletedShow = showResponse.getBody();
            showRepository.deleteShow(showId);
            return ResponseEntity.ok(deletedShow);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }
}
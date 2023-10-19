package com.example.AniList.controller;

import com.example.AniList.model.Show;
import com.example.AniList.model.ShowDTO;
import com.example.AniList.model.StreamInfo;
import com.example.AniList.repository.ShowRepository;
import com.example.AniList.repository.StreamInfoRepository;
import com.example.AniList.service.ShowService;
import com.example.AniList.service.StreamInfoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.AniList.validator.ShowValidator.isValidTimeStamp;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ShowController {
    private final ShowService showService;
    private final StreamInfoService streamInfoService;
    private final ShowRepository showRepository;
    private final StreamInfoRepository streamInfoRepository;

    public ShowController(ShowService showService, StreamInfoService streamInfoService, ShowRepository showRepository, StreamInfoRepository streamInfoRepository)
    {
        this.showService = showService;
        this.streamInfoService = streamInfoService;
        this.showRepository = showRepository;
        this.streamInfoRepository = streamInfoRepository;
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

    @GetMapping("/bookmarks/{id}")
    public ResponseEntity<?> getShowById(@PathVariable Integer id)
    {
        ResponseEntity<Show> showResponse = showRepository.getShowById(id);
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
            show.setId(showId);
            return ResponseEntity.ok(show);

    }
//    @ResponseStatus(HttpStatus.CREATED)
//    @PostMapping("/bookmarks")
//    public ResponseEntity<Show> addShow(@RequestBody Show show)
//    {
//        String query = show.getName();
//        Integer showId = showRepository.saveShow(show);
//        List<StreamInfo> streamingInfo = streamInfoService.scrapeLiveChart(query);
//        for (StreamInfo streamInfo : streamingInfo)
//        {
//            streamInfo.setShowId(showId);
//            streamInfoRepository.saveStreamInfo(streamInfo);
//        }
//        if(show.getTimeStamp() == null)
//        {
//            show.setTimeStamp(Time.valueOf("00:00:00"));
//        }
//        show.setId(showId);
//        return ResponseEntity.ok(show);
//    }

    //Look for more efficient way
    @PutMapping("/bookmarks/{id}")
    public ResponseEntity<Show> updateShow(@PathVariable Integer id, @Valid @RequestBody Show updatedShow) {
        ResponseEntity<Show> showResponse = showRepository.getShowById(id);
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
            showRepository.updateShow(id, existingShow);
            return ResponseEntity.ok(existingShow);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/bookmarks/{id}")
    public ResponseEntity<Show> deleteShow(@PathVariable Integer id)
    {
        ResponseEntity<Show> showResponse = showRepository.getShowById(id);
        if(showResponse.getStatusCode() == HttpStatus.OK)
        {
            Show deletedShow = showResponse.getBody();
            showRepository.deleteShow(id);
            return ResponseEntity.ok(deletedShow);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//
//        return errors;
//    }
}
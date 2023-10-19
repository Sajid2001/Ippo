package com.example.AniList.controller;

import com.example.AniList.model.StreamInfo;
import com.example.AniList.repository.StreamInfoRepository;
import com.example.AniList.service.StreamInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StreamInfoController {
    private final StreamInfoService streamInfoService;
    private final StreamInfoRepository streamInfoRepository;

    public StreamInfoController(StreamInfoService streamInfoService, StreamInfoRepository streamInfoRepository)
    {
        this.streamInfoService = streamInfoService;
        this.streamInfoRepository = streamInfoRepository;
    }

    @GetMapping("/scrape")
    public ResponseEntity<?> getStreamInfo(@RequestParam(required = false) String query)
    {
        if (query != null)
        {
            List<StreamInfo> searchResults = streamInfoService.scrapeLiveChart(query);
            return ResponseEntity.ok(searchResults);
        }
        else
        {
            List<StreamInfo> allStreamInfo = streamInfoRepository.getAllStreamInfo();
            return ResponseEntity.ok(allStreamInfo);
        }
    }

    @GetMapping("/scrape/{id}")
    public ResponseEntity<?> getStreamInfoById(@PathVariable Integer id)
    {
        ResponseEntity<StreamInfo> streamInfoResponse = streamInfoRepository.getStreamInfoById(id);
        if(streamInfoResponse.getStatusCode() == HttpStatus.OK)
        {
            StreamInfo streamInfo = streamInfoResponse.getBody();
            return ResponseEntity.ok(streamInfo);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    //Uses the showId to return all stream links for a show
    @GetMapping("/scrape/show/{show_id}")
    public ResponseEntity<?> getStreamInfoByShowId(@PathVariable Integer show_id)
    {
        ResponseEntity<List<StreamInfo>> streamInfoResponse = streamInfoRepository.getStreamInfoByShowId(show_id);
        if(streamInfoResponse.getStatusCode() == HttpStatus.OK)
        {
            List<StreamInfo> streamInfo = streamInfoResponse.getBody();
            return ResponseEntity.ok(streamInfo);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/scrape")
    public void addStreamInfo(@RequestBody StreamInfo streamInfo)
    {
        streamInfoRepository.saveStreamInfo(streamInfo);
    }

    @PutMapping("/scrape/{id}")
    public ResponseEntity<StreamInfo> updateStreamInfo(@PathVariable Integer id, @RequestBody StreamInfo updatedStreamInfo)
    {
        ResponseEntity<StreamInfo> streamInfoResponse = streamInfoRepository.getStreamInfoById(id);
        if(streamInfoResponse.getStatusCode() == HttpStatus.OK)
        {
            StreamInfo existingStreamInfo = streamInfoResponse.getBody();
            if (updatedStreamInfo.getStream() != null)
            {
                existingStreamInfo.setStream(updatedStreamInfo.getStream());
            }
            if (updatedStreamInfo.getUrl() != null)
            {
                existingStreamInfo.setUrl(updatedStreamInfo.getStream());
            }
            streamInfoRepository.updateStreamInfo(id,existingStreamInfo);
            return ResponseEntity.ok(existingStreamInfo);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/scrape/{id}")
    public ResponseEntity<StreamInfo> deleteStreamInfo(@PathVariable Integer id)
    {
        ResponseEntity<StreamInfo> streamInfoResponse = streamInfoRepository.getStreamInfoById(id);
        if (streamInfoResponse.getStatusCode() == HttpStatus.OK)
        {
            StreamInfo deletedStreamInfo = streamInfoResponse.getBody();
            streamInfoRepository.deleteStreamInfo(id);
            return ResponseEntity.ok(deletedStreamInfo);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }
}

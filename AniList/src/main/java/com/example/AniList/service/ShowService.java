package com.example.AniList.service;

import com.example.AniList.model.ShowDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ShowService(RestTemplate restTemplate, ObjectMapper objectMapper)
    {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public List<ShowDTO> searchAnime(String query) {
        String apiUrl = "https://api.jikan.moe/v4/anime?limit=3&q=" + query;
        String jsonResponse = restTemplate.getForObject(apiUrl, String.class);
        try
        {
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);
            List<ShowDTO> extractedDataList = new ArrayList<>();
            for (JsonNode itemNode : jsonNode.get("data"))
            {
                ShowDTO showDTO = new ShowDTO();
                showDTO.setName(itemNode.get("title").asText());
                showDTO.setShowType(itemNode.get("type").asText());
                showDTO.setImageUrl(itemNode.get("images").get("jpg").get("large_image_url").asText());
                showDTO.setMalUrl(itemNode.get("url").asText());
                extractedDataList.add(showDTO);
            }
            return extractedDataList;
        }
        catch (IOException e)
        {
            e.printStackTrace();
            return null;
        }
    }
}

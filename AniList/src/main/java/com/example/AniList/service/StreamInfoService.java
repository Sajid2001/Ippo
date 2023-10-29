package com.example.AniList.service;

import com.example.AniList.model.StreamInfo;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class StreamInfoService {
    public List<StreamInfo> scrapeLiveChart(@RequestParam String searchTerm)
    {
        List<StreamInfo> streamInfoList = new ArrayList<>();
        try
        {
            //Step 1: Scrape the search results page
            String searchUrl = "https://www.livechart.me/search?q=" + searchTerm;
            Document searchResults = Jsoup.connect(searchUrl).get();
            //Step 2: Find the top search result URL
            Element topResult = searchResults.select("li.grouped-list-item.anime-item").first();
            if(topResult != null)
            {
                String topResultUrl = "https://www.livechart.me/anime/" + topResult.attr("data-anime-id") + "/streams";
                //Step 3: Scrape the top result "streams" page
                Document streamsPage = Jsoup.connect(topResultUrl).get();
                //Step 4: Look for legal stream links
                Elements streamElements = streamsPage.select(".link.link-hover.font-medium.text-ellipsis");
                if(streamElements.isEmpty())
                {
                    return streamInfoList;
                }
                else
                {
                    for (Element streamElement : streamElements)
                    {
                        String stream = streamElement.text();
                        String url = streamElement.attr("href");
                        streamInfoList.add(new StreamInfo(stream, url));
                    }
                    return streamInfoList;
                }
            }
            else
            {
                return streamInfoList;
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
            return streamInfoList;
        }
    }
}

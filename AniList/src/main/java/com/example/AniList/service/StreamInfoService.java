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
import java.util.Arrays;
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
                Elements streamElements = streamsPage.select("div.flex-1.flex.items-center.gap-4.p-4");
                if(streamElements.isEmpty())
                {
                    return streamInfoList;
                }
                else
                {
                    for(Element streamElement : streamElements)
                    {
                        String stream = streamElement.select("a.link").text();
                        String logoUrl = streamElement.select("img").attr("src");
                        Elements captionElements = streamElement.select(".text-sm");
                        String caption = "";
                        for(Element element : captionElements)
                        {
                            String text = element.text();
                            if(!text.isEmpty())
                            {
                                caption = text;
                                break;
                            }
                        }
                        String url = streamElement.select("a.link").attr("href");
                        streamInfoList.add(new StreamInfo(stream, logoUrl, caption, url));
                    }
                    return streamInfoList;
                }
            }
            else
            {
                return streamInfoList;
            }
        }
        catch(IOException e)
        {
            e.printStackTrace();
            return streamInfoList;
        }
    }
}

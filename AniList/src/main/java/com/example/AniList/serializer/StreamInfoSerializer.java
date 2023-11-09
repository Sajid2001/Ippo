package com.example.AniList.serializer;

import com.example.AniList.model.StreamInfo;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class StreamInfoSerializer extends JsonSerializer<StreamInfo>
{
    @Override
    public void serialize(StreamInfo streamInfo, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException
    {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("stream", streamInfo.getStream());
        jsonGenerator.writeStringField("logoUrl", streamInfo.getLogoUrl());
        jsonGenerator.writeStringField("caption", streamInfo.getCaption());
        jsonGenerator.writeStringField("url", streamInfo.getUrl());
        jsonGenerator.writeEndObject();
    }
}


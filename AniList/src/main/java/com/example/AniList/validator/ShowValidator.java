package com.example.AniList.validator;

import java.sql.Time;
import java.util.regex.Pattern;

public class ShowValidator {

    private static final Pattern TIME_PATTERN = Pattern.compile("([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]");

    public static boolean isValidTimeStamp(String timeStamp) {
        System.out.println("Hello");
        System.out.println(timeStamp != null && TIME_PATTERN.matcher(timeStamp.toString()).matches());
        return timeStamp != null && TIME_PATTERN.matcher(timeStamp.toString()).matches();
    }
}
package com.example.AniList.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestControllerAdvice
public class JsonExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }

//    @ExceptionHandler(HttpMessageNotReadableException.class)
//    public ResponseEntity<String> handleInvalidJson(HttpMessageNotReadableException ex) {
//        String errorMessage = ex.getMessage();
//        List<String> invalidFields = parseInvalidFields(errorMessage);
//        String responseMessage = "Invalid JSON.";
//        if (invalidFields.contains("timeStamp")) {
//            responseMessage += " Invalid timeStamp format. Please provide a valid time format (e.g., HH:mm:ss)";
//        }
//
//        return ResponseEntity.badRequest().body(responseMessage);
//    }
//
//    private List<String> parseInvalidFields(String errorMessage) {
//        List<String> invalidFields = new ArrayList<>();
//        if (errorMessage.contains("Cannot construct instance of `java.sql.Time`"))
//        {
//            invalidFields.add("timeStamp");
//        }
//        Pattern pattern = Pattern.compile("Invalid value for field (.*?):");
//        Matcher matcher = pattern.matcher(errorMessage);
//        while (matcher.find())
//        {
//            String invalidField = matcher.group(1);
//            invalidFields.add(invalidField);
//        }
//        return invalidFields;
//    }
}

package com.example.AniList;

import com.example.AniList.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class AniListApplication {

	@RequestMapping("/")
	String home()
	{
		return "Hello!";
	}

	public static void main(String[] args) {
		SpringApplication.run(AniListApplication.class, args);
	}

}

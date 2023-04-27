package com.aws.mcs.springsample;

import com.datastax.oss.driver.api.core.CqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.security.NoSuchAlgorithmException;

@SpringBootApplication
public class KeyspacesSpringApplication {
	public static void main(String[] args) {
		Logger LOGGER = LoggerFactory.getLogger(KeyspacesSpringApplication.class);
		SpringApplication.run(KeyspacesSpringApplication.class, args);
	}

	@Bean
	public CqlSession cqlSession() throws NoSuchAlgorithmException {
		return new AppConfig().session();
	}
}


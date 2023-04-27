package com.aws.cass;

import com.datastax.oss.driver.api.core.CqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.security.NoSuchAlgorithmException;

@SpringBootApplication
public class TFloresKeyspaceApplication {
	public static void main(String[] args) {
		Logger LOGGER = LoggerFactory.getLogger(TFloresKeyspaceApplication.class);
		SpringApplication.run(TFloresKeyspaceApplication.class, args);
	}

	@Bean
	public CqlSession cqlSession() throws NoSuchAlgorithmException {
		return new AppConfig().session();
	}
}
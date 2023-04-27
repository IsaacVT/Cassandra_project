package com.aws.cass;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.config.DriverConfigLoader;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.net.ssl.SSLContext;
import java.io.File;
import java.security.NoSuchAlgorithmException;

@Configuration
public class AppConfig {
    Dotenv dotenv = Dotenv.load();
    private final String username = dotenv.get("AWS_MCS_SPRING_APP_USERNAME");
    private final String password = dotenv.get("AWS_MCS_SPRING_APP_PASSWORD");
    File driverConfig = new File(System.getProperty("user.dir")+"/application.conf");

    @Primary
    public @Bean
    CqlSession session() throws NoSuchAlgorithmException {
        return CqlSession.builder().
                withConfigLoader(DriverConfigLoader.fromFile(driverConfig)).
                withAuthCredentials(username, password).
                withSslContext(SSLContext.getDefault()).
                withKeyspace("tutorialkeyspace").
                build();
    }
}

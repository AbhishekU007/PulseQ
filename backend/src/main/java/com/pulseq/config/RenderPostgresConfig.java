package com.pulseq.config;

import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class RenderPostgresConfig {

    @PostConstruct
    public void fixDatabaseUrl() {

        String url = System.getenv("DATABASE_URL");

        if (url != null && url.startsWith("postgres://")) {
            String jdbcUrl = url.replace("postgres://", "jdbc:postgresql://");
            System.setProperty("spring.datasource.url", jdbcUrl);
        }
    }
}

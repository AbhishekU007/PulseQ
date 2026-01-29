package com.pulseq.debug;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class RedisDebug {

    @Value("${spring.redis.url:NOT_SET}")
    private String redisUrl;

    @PostConstruct
    public void log() {
        System.out.println("🔥 REDIS URL = " + redisUrl);
    }
}
package com.pulseq.queue;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisQueueService {

    public static final String MAIN  = "pulseq:main";
    public static final String RETRY = "pulseq:retry";
    public static final String DEAD  = "pulseq:dead";

    private final RedisTemplate<String, String> redisTemplate;

    public RedisQueueService(
            @Qualifier("stringRedisTemplate")
            RedisTemplate<String, String> redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public void push(String queue, String data) {
        redisTemplate.opsForList().rightPush(queue, data);
    }

    public String pop(String queue) {
        return redisTemplate.opsForList().leftPop(queue);
    }

    public Long size(String queue) {
        return redisTemplate.opsForList().size(queue);
    }
}

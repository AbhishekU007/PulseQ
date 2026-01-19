package com.pulseq.queue;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisQueueService {

    public static final String MAIN_QUEUE = "pulseq:main";

    private final RedisTemplate<String, String> redisTemplate;

    public RedisQueueService(@Qualifier("stringRedisTemplate") RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void push(String data) {
        redisTemplate.opsForList().rightPush(MAIN_QUEUE, data);
    }

    public String pop() {
        return redisTemplate.opsForList().leftPop(MAIN_QUEUE);
    }
}

package com.pulseq.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pulseq.queue.RedisQueueService;

@RestController
@RequestMapping("/queues")
public class QueueController {

    private final RedisQueueService queue;

    public QueueController(RedisQueueService queue) {
        this.queue = queue;
    }

    @GetMapping("/{name}")
    public List<String> peekQueue(
            @PathVariable String name,
            @RequestParam(defaultValue = "10") int limit
    ) {

        String redisQueue;

        switch (name.toLowerCase()) {
            case "main":
                redisQueue = RedisQueueService.MAIN;
                break;

            case "retry":
                redisQueue = RedisQueueService.RETRY;
                break;

            case "dead":
                redisQueue = RedisQueueService.DEAD;
                break;

            default:
                throw new RuntimeException(
                        "Invalid queue name. Use: main | retry | dead"
                );
        }

        return queue.peek(redisQueue, limit);
    }
}

package com.pulseq.controller;

import com.pulseq.queue.RedisQueueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/queues")
@CrossOrigin(origins = "http://localhost:5173")
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

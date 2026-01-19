package com.pulseq.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pulseq.metrics.MetricsService;
import com.pulseq.queue.RedisQueueService;

@RestController
public class MetricsController {

    private final MetricsService metrics;
    private final RedisQueueService queue;

    public MetricsController(
            MetricsService metrics,
            RedisQueueService queue
    ) {
        this.metrics = metrics;
        this.queue = queue;
    }

    @GetMapping("/metrics")
    public Map<String, Object> metrics() {

        Map<String, Object> data = new HashMap<>();

        data.put("received", metrics.received.get());
        data.put("processed", metrics.processed.get());
        data.put("retried", metrics.retried.get());
        data.put("dead", metrics.dead.get());

        data.put("mainQueueSize", queue.size(RedisQueueService.MAIN));
        data.put("retryQueueSize", queue.size(RedisQueueService.RETRY));
        data.put("deadQueueSize", queue.size(RedisQueueService.DEAD));

        return data;
    }
}

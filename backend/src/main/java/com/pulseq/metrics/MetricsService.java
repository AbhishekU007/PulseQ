package com.pulseq.metrics;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.pulseq.queue.RedisQueueService;

@Service
public class MetricsService {

    public AtomicLong received = new AtomicLong();
    public AtomicLong processed = new AtomicLong();
    public AtomicLong retried = new AtomicLong();
    public AtomicLong dead = new AtomicLong();

    private final RedisQueueService queue;

    public MetricsService(RedisQueueService queue) {
        this.queue = queue;
    }

    public Map<String, Object> snapshot() {
        return Map.of(
                "received", received.get(),
                "processed", processed.get(),
                "retried", retried.get(),
                "dead", dead.get(),
                "mainQueueSize", queue.size(RedisQueueService.MAIN),
                "retryQueueSize", queue.size(RedisQueueService.RETRY),
                "deadQueueSize", queue.size(RedisQueueService.DEAD)
        );
    }

}

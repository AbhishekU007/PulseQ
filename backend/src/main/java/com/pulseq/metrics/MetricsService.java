package com.pulseq.metrics;

import java.util.HashMap;
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
    private final LatencyTracker latency;

    public MetricsService(RedisQueueService queue, LatencyTracker latency) {
        this.queue = queue;
        this.latency = latency;
    }

    public Map<String, Object> snapshot() {
        Map<String, Object> map = new HashMap<>();
        
        map.put("received", received.get());
        map.put("processed", processed.get());
        map.put("retried", retried.get());
        map.put("dead", dead.get());
        map.put("mainQueueSize", queue.size(RedisQueueService.MAIN));
        map.put("retryQueueSize", queue.size(RedisQueueService.RETRY));
        map.put("deadQueueSize", queue.size(RedisQueueService.DEAD));
        map.put("latency", latency.snapshot());
        
        return map;
    }
}
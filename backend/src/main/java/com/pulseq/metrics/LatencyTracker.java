package com.pulseq.metrics;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class LatencyTracker {

    private final Map<String, Long> startTimes = new ConcurrentHashMap<>();
    private final Deque<Long> samples = new ArrayDeque<>();
    private static final int MAX_SAMPLES = 1000;

    public void start(String id) {
        if (id == null) return;  // Guard against null IDs
        startTimes.put(id, System.currentTimeMillis());
    }

    public void end(String id) {
        if (id == null) return;  // Guard against null IDs
        
        Long startTime = startTimes.remove(id);
        if (startTime == null) return;

        long latency = System.currentTimeMillis() - startTime;

        synchronized (samples) {
            samples.addLast(latency);
            if (samples.size() > MAX_SAMPLES) {
                samples.removeFirst();
            }
        }
    }

    public Map<String, Long> snapshot() {
        List<Long> sorted;

        synchronized (samples) {
            if (samples.isEmpty()) {
                Map<String, Long> empty = new HashMap<>();
                empty.put("p50", 0L);
                empty.put("p95", 0L);
                empty.put("p99", 0L);
                return empty;
            }
            sorted = new ArrayList<>(samples);
        }

        Collections.sort(sorted);

        Map<String, Long> result = new HashMap<>();
        result.put("p50", percentile(sorted, 50));
        result.put("p95", percentile(sorted, 95));
        result.put("p99", percentile(sorted, 99));

        return result;
    }

    private long percentile(List<Long> sorted, int p) {
        int index = (int) Math.ceil(p / 100.0 * sorted.size()) - 1;
        return sorted.get(Math.max(0, index));
    }
}
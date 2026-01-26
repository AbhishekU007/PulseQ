package com.pulseq.worker;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseq.metrics.LatencyTracker;
import com.pulseq.metrics.MetricsService;
import com.pulseq.model.DeadEvent;
import com.pulseq.model.EventLog;
import com.pulseq.model.EventPayload;
import com.pulseq.queue.RedisQueueService;
import com.pulseq.repository.DeadEventRepository;
import com.pulseq.websocket.MetricsSocket;

@Component
public class EventWorker {

    private final RedisQueueService queue;
    private final MetricsService metrics;
    private final DeadEventRepository repo;
    private final MetricsSocket socket;
    private final LatencyTracker latency;
    private final ObjectMapper mapper = new ObjectMapper();

    public EventWorker(
            RedisQueueService queue,
            MetricsService metrics,
            DeadEventRepository repo,
            MetricsSocket socket,
            LatencyTracker latency
    ) {
        this.queue = queue;
        this.metrics = metrics;
        this.repo = repo;
        this.socket = socket;
        this.latency = latency;
    }

    // ===============================
    // MAIN CONSUMER
    // ===============================
    @Scheduled(fixedDelay = 300)
    public void consume() {

        String json = queue.pop(RedisQueueService.MAIN);
        if (json == null) return;

        metrics.received.incrementAndGet();
        socket.push();

        EventPayload event;

        try {
            event = mapper.readValue(json, EventPayload.class);
        } catch (Exception e) {
            return;
        }

        // Start latency tracking
        latency.start(event.id);

        // EVENT RECEIVED
        socket.pushEvent(
                new EventLog(event.type, "RECEIVED", event.retryCount)
        );

        try {

            socket.pushEvent(
                    new EventLog(event.type, "PROCESSING", event.retryCount)
            );

            double roll = Math.random();

            // simulate failure
            if (roll < 0.2) {
                throw new RuntimeException("Random failure");
            }

            metrics.processed.incrementAndGet();

            // End latency tracking on success
            latency.end(event.id);

            socket.pushEvent(
                    new EventLog(event.type, "SUCCESS", event.retryCount)
            );

            socket.push();

        } catch (Exception ex) {

            event.retryCount++;

            if (event.retryCount <= 3) {

                metrics.retried.incrementAndGet();

                try {
                    queue.push(
                            RedisQueueService.RETRY,
                            mapper.writeValueAsString(event)
                    );
                } catch (Exception ignored) {}

                socket.pushEvent(
                        new EventLog(event.type, "RETRY", event.retryCount)
                );

                socket.push();

            } else {

                metrics.dead.incrementAndGet();

                // End latency tracking on dead
                latency.end(event.id);

                try {
                    queue.push(
                            RedisQueueService.DEAD,
                            mapper.writeValueAsString(event)
                    );

                    repo.save(
                            new DeadEvent(
                                    event.type,
                                    json,
                                    event.retryCount
                            )
                    );

                } catch (Exception ignored) {}

                socket.pushEvent(
                        new EventLog(event.type, "DEAD", event.retryCount)
                );

                socket.push();
            }
        }
    }

    // ===============================
    // RETRY CONSUMER
    // ===============================
    @Scheduled(fixedDelay = 2000)
    public void retry() {

        String retryEvent = queue.pop(RedisQueueService.RETRY);

        if (retryEvent != null) {
            queue.push(RedisQueueService.MAIN, retryEvent);
            socket.push();
        }
    }
}
package com.pulseq.worker;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseq.metrics.MetricsService;
import com.pulseq.model.DeadEvent;
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
    private final ObjectMapper mapper = new ObjectMapper();

    public EventWorker(
            RedisQueueService queue,
            MetricsService metrics,
            DeadEventRepository repo,
            MetricsSocket socket
    ) {
        this.queue = queue;
        this.metrics = metrics;
        this.repo = repo;
        this.socket = socket;
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
            System.out.println("❌ Invalid JSON dropped");
            return;
        }

        try {
            System.out.println("Processing → " + event.type);

            // simulate failure
            if (Math.random() < 0.9) {
                throw new RuntimeException("Random failure");
            }

            metrics.processed.incrementAndGet();
            System.out.println("✅ SUCCESS → " + event.type);
            socket.push();

        } catch (Exception ex) {

            event.retryCount++;

            if (event.retryCount <= 3) {

                metrics.retried.incrementAndGet();

                try {
                    queue.push(RedisQueueService.RETRY,mapper.writeValueAsString(event));
                } catch (Exception ignored) {}

                System.out.println("🔁 RETRY " + event.retryCount + " → " + event.type);
                socket.push();

            } else {
                metrics.dead.incrementAndGet();
                try {
                    queue.push(RedisQueueService.DEAD,mapper.writeValueAsString(event));
                    repo.save(new DeadEvent(event.type,json,event.retryCount));
                } catch (Exception ignored) {}

                System.out.println("💀 DEAD EVENT SAVED → " + event.type);
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

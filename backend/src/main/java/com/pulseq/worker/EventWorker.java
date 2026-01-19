package com.pulseq.worker;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseq.model.EventPayload;
import com.pulseq.queue.RedisQueueService;

@Component
public class EventWorker {

    private final RedisQueueService queue;
    private final ObjectMapper mapper = new ObjectMapper();

    public EventWorker(RedisQueueService queue) {
        this.queue = queue;
    }

    // Consume main queue
    @Scheduled(fixedDelay = 300)
    public void consume() {

        String json = queue.pop(RedisQueueService.MAIN);
        if (json == null) return;

        try {
            EventPayload event = mapper.readValue(json, EventPayload.class);

            System.out.println("Processing → " + event.type);

            // simulate random failure
            if (Math.random() < 0.4) {
                throw new RuntimeException("Simulated failure");
            }

            System.out.println("SUCCESS → " + event.type);

        } catch (Exception e) {

            try {
                EventPayload event = mapper.readValue(json, EventPayload.class);
                event.retryCount++;

                if (event.retryCount <= 3) {
                    System.out.println("RETRY " + event.retryCount + " → " + event.type);
                    queue.push(
                            RedisQueueService.RETRY,
                            mapper.writeValueAsString(event)
                    );
                } else {
                    System.out.println("DEAD → " + event.type);
                    queue.push(
                            RedisQueueService.DEAD,
                            mapper.writeValueAsString(event)
                    );
                }

            } catch (Exception ex) {
                // last-resort safety: never crash worker
                System.out.println("Malformed event dropped");
            }
        }
    }

    // Move retry queue back to main queue
    @Scheduled(fixedDelay = 2000)
    public void retry() {

        String retryEvent = queue.pop(RedisQueueService.RETRY);
        if (retryEvent != null) {
            queue.push(RedisQueueService.MAIN, retryEvent);
        }
    }
}

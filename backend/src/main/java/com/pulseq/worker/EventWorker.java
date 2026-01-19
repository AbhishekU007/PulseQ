package com.pulseq.worker;

import com.pulseq.queue.RedisQueueService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EventWorker {

    private final RedisQueueService queue;

    public EventWorker(RedisQueueService queue) {
        this.queue = queue;
    }

    @Scheduled(fixedDelay = 300)
    public void consume() {

        String event = queue.pop();
        if (event == null) return;

        System.out.println("Processed → " + event);
    }
}

package com.pulseq.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.pulseq.metrics.MetricsService;
import com.pulseq.model.EventLog;

@Component
public class MetricsSocket {

    private final SimpMessagingTemplate template;
    private final MetricsService metrics;

    public MetricsSocket(SimpMessagingTemplate template,MetricsService metrics) {
        this.template = template;
        this.metrics = metrics;
    }

    public void push() {
        template.convertAndSend("/topic/metrics",metrics.snapshot());
    }

    public void pushEvent(EventLog log) {
        template.convertAndSend("/topic/events", log);
    }
}

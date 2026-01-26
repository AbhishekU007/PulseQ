package com.pulseq.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseq.model.EventPayload;
import com.pulseq.queue.RedisQueueService;

@RestController
@RequestMapping("/events")
public class EventController {

    private final RedisQueueService queue;
    private final ObjectMapper mapper = new ObjectMapper();

    public EventController(RedisQueueService queue) {
        this.queue = queue;
    }

    @PostMapping
    public String publish(@RequestBody EventPayload payload) throws Exception {
        payload.id = UUID.randomUUID().toString();
        queue.push(RedisQueueService.MAIN, mapper.writeValueAsString(payload));
        return "QUEUED " + payload.id;
    }
}
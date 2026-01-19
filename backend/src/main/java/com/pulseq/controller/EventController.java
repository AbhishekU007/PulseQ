package com.pulseq.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseq.model.EventPayload;
import com.pulseq.queue.RedisQueueService;
import org.springframework.web.bind.annotation.*;

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
        queue.push(mapper.writeValueAsString(payload));
        return "QUEUED";
    }
}

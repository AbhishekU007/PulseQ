package com.pulseq.controller;

import com.pulseq.model.DeadEvent;
import com.pulseq.repository.DeadEventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dead-events")
@CrossOrigin(origins = "http://localhost:5173")
public class DeadEventController {

    private final DeadEventRepository repo;

    public DeadEventController(DeadEventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<DeadEvent> all() {
        return repo.findAllByOrderByFailedAtDesc();
    }
}

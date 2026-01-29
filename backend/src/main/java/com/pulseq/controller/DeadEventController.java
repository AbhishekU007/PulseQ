package com.pulseq.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pulseq.model.DeadEvent;
import com.pulseq.repository.DeadEventRepository;

@RestController
@RequestMapping("/dead-events")
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

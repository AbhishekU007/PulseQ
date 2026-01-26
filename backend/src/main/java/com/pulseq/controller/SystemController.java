package com.pulseq.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pulseq.system.SystemService;
import com.pulseq.system.SystemSnapshot;

@RestController
@RequestMapping("/system")
@CrossOrigin(origins = "http://localhost:5173")
public class SystemController {

    private final SystemService system;

    public SystemController(SystemService system) {
        this.system = system;
    }

    @GetMapping
    public SystemSnapshot getSystem() {
        return system.snapshot();
    }
}

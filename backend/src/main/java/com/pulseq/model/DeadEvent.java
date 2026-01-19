package com.pulseq.model;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DeadEvent {

    @Id
    private String id = UUID.randomUUID().toString();

    private String type;

    @Column(columnDefinition = "TEXT")
    private String payload;

    private int retryCount;

    private Instant failedAt = Instant.now();

    public DeadEvent() {}

    public DeadEvent(String type, String payload, int retryCount) {
        this.type = type;
        this.payload = payload;
        this.retryCount = retryCount;
    }
}

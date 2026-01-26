package com.pulseq.model;

import java.time.Instant;

public class EventLog {

    public String type;
    public String status;
    public int retry;
    public Instant timestamp;

    public EventLog(String type, String status, int retry) {
        this.type = type;
        this.status = status;
        this.retry = retry;
        this.timestamp = Instant.now();
    }
}

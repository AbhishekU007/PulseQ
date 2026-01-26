package com.pulseq.model;

public class EventPayload {

    public String type;
    public String data;
    public String id;
    public int retryCount = 0;

    public EventPayload() {}

    public EventPayload(String type, String data) {
        this.type = type;
        this.data = data;
        this.retryCount = 0;
        this.id = java.util.UUID.randomUUID().toString();
    }
}

package com.pulseq.model;

public class EventPayload {

    public String type;
    public String data;

    public EventPayload() {}

    public EventPayload(String type, String data) {
        this.type = type;
        this.data = data;
    }
}

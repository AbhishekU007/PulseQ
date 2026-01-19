package com.pulseq.metrics;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service
public class MetricsService {

    public AtomicLong received = new AtomicLong();
    public AtomicLong processed = new AtomicLong();
    public AtomicLong retried = new AtomicLong();
    public AtomicLong dead = new AtomicLong();
}

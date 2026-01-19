package com.pulseq.metrics;

import org.springframework.stereotype.Service;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class MetricsService {

    public AtomicLong received = new AtomicLong();
    public AtomicLong processed = new AtomicLong();
}

package com.pulseq.system;

import java.lang.management.ManagementFactory;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.pulseq.metrics.MetricsService;

@Service
public class SystemService {

    private final StringRedisTemplate redis;
    private final JdbcTemplate jdbc;
    private final MetricsService metrics;

    public SystemService(
            StringRedisTemplate redis,
            JdbcTemplate jdbc,
            MetricsService metrics
    ) {
        this.redis = redis;
        this.jdbc = jdbc;
        this.metrics = metrics;
    }

    public SystemSnapshot snapshot() {

        Runtime rt = Runtime.getRuntime();

        SystemSnapshot s = new SystemSnapshot();

        s.uptimeMs =
                ManagementFactory.getRuntimeMXBean().getUptime();

        s.usedMemoryMb =
                (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024;

        s.maxMemoryMb =
                rt.maxMemory() / 1024 / 1024;

        s.threadCount =
                ManagementFactory.getThreadMXBean().getThreadCount();

        // Redis health
        try {
            redis.opsForValue().get("health");
            s.redisUp = true;
        } catch (Exception e) {
            s.redisUp = false;
        }

        // Postgres health
        try {
            jdbc.queryForObject("SELECT 1", Integer.class);
            s.postgresUp = true;
        } catch (Exception e) {
            s.postgresUp = false;
        }

        s.received = metrics.received.get();
        s.processed = metrics.processed.get();
        s.retried = metrics.retried.get();
        s.dead = metrics.dead.get();

        return s;
    }
}

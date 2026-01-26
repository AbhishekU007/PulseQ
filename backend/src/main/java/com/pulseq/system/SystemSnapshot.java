package com.pulseq.system;

public class SystemSnapshot {

    public long uptimeMs;

    public long usedMemoryMb;
    public long maxMemoryMb;

    public int threadCount;

    public boolean redisUp;
    public boolean postgresUp;

    public long received;
    public long processed;
    public long retried;
    public long dead;
}

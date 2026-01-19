package com.pulseq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PulseQApplication {

    public static void main(String[] args) {
        SpringApplication.run(PulseQApplication.class, args);
    }
}

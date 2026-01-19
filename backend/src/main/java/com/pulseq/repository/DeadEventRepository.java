package com.pulseq.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pulseq.model.DeadEvent;

public interface DeadEventRepository
        extends JpaRepository<DeadEvent, String> {
}

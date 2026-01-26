package com.pulseq.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pulseq.model.DeadEvent;

public interface DeadEventRepository extends JpaRepository<DeadEvent, Long> {
    List<DeadEvent> findAllByOrderByFailedAtDesc();
}
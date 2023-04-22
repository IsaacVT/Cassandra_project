package com.db.cassandra.tflores.test.repository;

import com.db.cassandra.tflores.test.entity.Tutorial;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TutorialRepo extends CrudRepository<Tutorial, UUID> {
}

package com.db.cassandra.tflores.test.service;

import com.db.cassandra.tflores.test.entity.Tutorial;

import java.util.List;
import java.util.UUID;

public interface TutorialService {
    List<Tutorial> findAll();
    Tutorial findOne(UUID idTuto);
    Tutorial save(Tutorial tuto);
    Tutorial update(UUID idTuto, Tutorial tuto);
    void delete(UUID idTuto);

}

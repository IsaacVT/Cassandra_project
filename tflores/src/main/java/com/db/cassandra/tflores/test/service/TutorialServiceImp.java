package com.db.cassandra.tflores.test.service;

import com.db.cassandra.tflores.test.entity.Tutorial;
import com.db.cassandra.tflores.test.repository.TutorialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Transactional
@Service
public class TutorialServiceImp implements TutorialService{

    @Autowired
    private TutorialRepo repo;

    @Override
    public List<Tutorial> findAll() {
        List<Tutorial> tutorials = new ArrayList<>();
        repo.findAll().forEach(tutorials::add);
        return tutorials;
    }

    @Override
    public Tutorial findOne(UUID idTuto) {
        return repo.findById(idTuto).orElse(null);
    }

    @Override
    public Tutorial save(Tutorial tuto) {
        tuto.setId(UUID.randomUUID());
        return repo.save(tuto);
    }

    @Override
    public Tutorial update(UUID idTuto, Tutorial tuto) {
        Tutorial tutorial = repo.findById(idTuto).orElse(null);
        if (tutorial != null) {
            tutorial = tuto;
            return repo.save(tutorial);
        }

        return null;
    }

    @Override
    public void delete(UUID idTuto) {
        repo.findById(idTuto).ifPresent(tuto -> repo.deleteById(idTuto));
    }
}

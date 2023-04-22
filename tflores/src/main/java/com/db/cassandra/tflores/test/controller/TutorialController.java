package com.db.cassandra.tflores.test.controller;

import com.db.cassandra.tflores.test.entity.Tutorial;
import com.db.cassandra.tflores.test.service.TutorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class TutorialController {

    @Autowired
    private TutorialService service;

    @GetMapping("/tutorial/getAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/tutorial/create")
    public ResponseEntity<?> save(@RequestBody Tutorial tuto) {
        service.save(tuto);
        return ResponseEntity.ok(tuto);
    }

    @PutMapping("/tutorial/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Tutorial tuto) {
        Tutorial tutorial = service.update(id, tuto);
        return ResponseEntity.ok(tutorial);
    }

    @DeleteMapping("/tutorial/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}

package com.aws.cass.example.controller;

import com.aws.cass.example.model.Company;
import com.aws.cass.example.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/company")
public class CompanyController {

    private final CompanyService service;

    @Autowired
    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Company>> findAll() {
        List<Company> direcciones = service.getAll();
        return ResponseEntity.ok().body(direcciones);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Company> findById(@PathVariable String id) {
        Company dir = service.getCompanyById(id);
        return ResponseEntity.ok().body(dir);
    }

    @PostMapping(value = "")
    public ResponseEntity<Company> save(@RequestBody Company direccion) {
        Company nuevaDir = service.newCompany(direccion);
        return ResponseEntity.ok().body(nuevaDir);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Company> update(@PathVariable String id, @RequestBody Company direccion) {
        Company dirActualizada = service.updateCompany(id, direccion);
        return ResponseEntity.ok().body(dirActualizada);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) {
        String msg = service.deteleCompany(id);
        return ResponseEntity.ok().body(msg);
    }

}

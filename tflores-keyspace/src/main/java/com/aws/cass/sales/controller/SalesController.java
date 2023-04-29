package com.aws.cass.sales.controller;

import com.aws.cass.sales.model.Sales;
import com.aws.cass.sales.service.SaleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping(value = "/sales")
public class SalesController {

    private final SaleService service;

    @Autowired
    public SalesController(SaleService service) {
        this.service = service;
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Sales>> findAll() {
        List<Sales> salesList = service.getAll();
        return ResponseEntity.ok().body(salesList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Sales> findById(@PathVariable UUID id) {
        Sales sale = service.getSaleById(id);
        return ResponseEntity.ok().body(sale);
    }

    @PostMapping(value = "")
    public ResponseEntity<Sales> save(@RequestBody Sales newSales) throws JsonProcessingException {
        Sales newSale = service.newSale(newSales);
        return ResponseEntity.ok().body(newSale);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Sales> update(@PathVariable UUID id, @RequestBody Sales sale) throws JsonProcessingException {
        Sales newSale = service.updateSale(id, sale);
        return ResponseEntity.ok().body(newSale);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id) {
        String msg = service.deteleSale(id);
        return ResponseEntity.ok().body(msg);
    }
}
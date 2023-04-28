package com.aws.cass.inventory.controller;

import com.aws.cass.inventory.model.Inventory;
import com.aws.cass.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/inventory")
public class InventoryController {

    private final InventoryService service;

    @Autowired
    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Inventory>> findAll() {
        List<Inventory> inventoryList = service.getAll();
        return ResponseEntity.ok().body(inventoryList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Inventory> findById(@PathVariable UUID id) {
        Inventory inventory = service.getInventoryById(id);
        return ResponseEntity.ok().body(inventory);
    }

    @PostMapping(value = "")
    public ResponseEntity<Inventory> save(@RequestBody Inventory newInventory) {
        Inventory inventory = service.newInventory(newInventory);
        return ResponseEntity.ok().body(inventory);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Inventory> update(@PathVariable UUID id, @RequestBody Inventory newInventory) {
        Inventory inventory = service.updateInventory(id, newInventory);
        return ResponseEntity.ok().body(inventory);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id) {
        String msg = service.deteleInventory(id);
        return ResponseEntity.ok().body(msg);
    }
}

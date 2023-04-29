package com.aws.cass.shopping.controller;

import com.aws.cass.shopping.model.Shopping;
import com.aws.cass.shopping.service.ShoppingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", methods= {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE
})
@RequestMapping(value = "/shopping")
public class ShoppingController {

    private final ShoppingService service;

    @Autowired
    public ShoppingController(ShoppingService service) {
        this.service = service;
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Shopping>> findAll() {
        List<Shopping> shoppingList = service.getAll();
        return ResponseEntity.ok().body(shoppingList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Shopping> findById(@PathVariable UUID id) {
        Shopping shopping = service.getShoppingById(id);
        return ResponseEntity.ok().body(shopping);
    }

    @PostMapping(value = "")
    public ResponseEntity<Shopping> save(@RequestBody Shopping newShopping) throws JsonProcessingException {
        Shopping newSale = service.newShopping(newShopping);
        return ResponseEntity.ok().body(newSale);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Shopping> update(@PathVariable UUID id, @RequestBody Shopping shopping) throws JsonProcessingException {
        Shopping newSale = service.updateShopping(id, shopping);
        return ResponseEntity.ok().body(newSale);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id) {
        String msg = service.deteleShopping(id);
        return ResponseEntity.ok().body(msg);
    }
}

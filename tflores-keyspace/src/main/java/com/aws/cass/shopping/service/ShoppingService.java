package com.aws.cass.shopping.service;

import com.aws.cass.shopping.model.Shopping;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.UUID;

public interface ShoppingService {
    List<Shopping> getAll();
    Shopping getShoppingById(UUID id);
    Shopping newShopping (Shopping sale) throws JsonProcessingException;
    Shopping updateShopping(UUID id, Shopping sale) throws JsonProcessingException;
    String deteleShopping(UUID id);
}

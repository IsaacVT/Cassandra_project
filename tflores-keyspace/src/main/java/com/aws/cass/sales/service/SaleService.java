package com.aws.cass.sales.service;

import com.aws.cass.sales.model.Sales;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.UUID;

public interface SaleService {
    List<Sales> getAll();
    Sales getSaleById(UUID id);
    Sales newSale (Sales sale) throws JsonProcessingException;
    Sales updateSale(UUID id, Sales sale) throws JsonProcessingException;
    String deteleSale(UUID id);
}
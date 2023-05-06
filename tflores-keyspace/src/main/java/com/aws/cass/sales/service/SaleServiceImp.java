package com.aws.cass.sales.service;

import com.aws.cass.QueryOptions;
import com.aws.cass.inventory.model.Inventory;
import com.aws.cass.inventory.service.InventoryService;
import com.aws.cass.sales.model.Sales;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.EntityWriteResult;
import org.springframework.data.cassandra.core.query.Query;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.cassandra.core.query.Criteria.where;

@Service
public class SaleServiceImp implements SaleService {

    private final QueryOptions queryOptions;
    private final CassandraOperations template;
    private final InventoryService inventoryService;
    private final ObjectMapper mapper;
    private List<Inventory> listProds;

    @Autowired
    public SaleServiceImp(QueryOptions queryOptions, CassandraOperations template, InventoryService inventoryService, ObjectMapper mapper) {
        this.queryOptions = queryOptions;
        this.template = template;
        this.mapper = mapper;
        this.inventoryService = inventoryService;
    }

    private BigDecimal getTotalFromJSON(String prodJSON) throws JsonProcessingException {
        listProds = mapper.readValue(prodJSON, new TypeReference<>() {});

        BigDecimal total = BigDecimal.ZERO;
        for (Inventory prod : listProds) {
            BigDecimal amount = BigDecimal.valueOf(prod.getAmount());
            BigDecimal price = prod.getPrice();
            BigDecimal prodTotal = amount.multiply(price);
            total = total.add(prodTotal);
        }

        return total;
    }

    @Override
    public List<Sales> getAll() {
        return template.select(Query.empty(), Sales.class);
    }

    @Override
    public Sales getSaleById(UUID id) {
        Sales oneSale = template.selectOne(Query.query(where("sale_id").is(id)), Sales.class);

        if (oneSale != null) {
            return oneSale;
        }

        return new Sales();
    }

    @Override
    public Sales newSale(Sales newSale) throws JsonProcessingException {
        newSale.setSale_id(UUID.randomUUID());
        newSale.setSale_date(Timestamp.valueOf(LocalDateTime.now()));
        newSale.setTotal(getTotalFromJSON(newSale.getProducts().toString()));

        EntityWriteResult<Sales> saleInsert = template.insert(newSale, queryOptions.insertOptions());

        inventoryService.subtractInInventory(listProds);
        return saleInsert.getEntity();
    }

    @Override
    public Sales updateSale(UUID id, Sales sale) throws JsonProcessingException {
        Sales existSale = template.selectOne(Query.query(where("sale_id").is(id)), Sales.class);

        if (existSale != null) {
            existSale.setSale_date(Timestamp.valueOf(LocalDateTime.now()));
            existSale.setClient_name(sale.getClient_name());
            existSale.setProducts(sale.getProducts());
            existSale.setTotal(getTotalFromJSON(sale.getProducts().toString()));

            EntityWriteResult<Sales> updateSale = template.update(existSale, queryOptions.updateOptions());
            return updateSale.getEntity();
        }

        return new Sales();
    }

    @Override
    public String deteleSale(UUID id) {
        Sales sale = template.selectOne(Query.query(where("sale_id").is(id)), Sales.class);

        if (sale != null) {
            template.delete(sale, queryOptions.deleteOptions());
            return "Sale deleted success";
        }

        return new Sales().toString();
    }
}

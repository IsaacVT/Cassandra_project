package com.aws.cass.shopping.service;

import com.aws.cass.QueryOptions;
import com.aws.cass.inventory.model.Inventory;
import com.aws.cass.shopping.model.Shopping;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.EntityWriteResult;
import org.springframework.data.cassandra.core.query.Query;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.cassandra.core.query.Criteria.where;

public class ShoppingServiceImp implements ShoppingService {
    private final QueryOptions queryOptions;
    private final CassandraOperations template;
    private final ObjectMapper mapper;

    @Autowired
    public ShoppingServiceImp(QueryOptions queryOptions, CassandraOperations template, ObjectMapper mapper) {
        this.queryOptions = queryOptions;
        this.template = template;
        this.mapper = mapper;
    }

    private BigDecimal getTotalFromJSON(String prodJSON) throws JsonProcessingException {
        List<Inventory> listProds = mapper.readValue(prodJSON, new TypeReference<>() {});

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
    public List<Shopping> getAll() {
        return template.select(Query.empty(), Shopping.class);
    }

    @Override
    public Shopping getShoppingById(UUID id) {
        Shopping shopping = template.selectOne(Query.query(where("purchase_id").is(id)), Shopping.class);

        if (shopping != null) {
            return shopping;
        }

        return new Shopping();
    }

    @Override
    public Shopping newShopping(Shopping shopping) throws JsonProcessingException {
        shopping.setPurchase_id(UUID.randomUUID());
        shopping.setPurchase_date(Timestamp.valueOf(LocalDateTime.now()));
        shopping.setTotal(getTotalFromJSON(shopping.getProducts().toString()));

        EntityWriteResult<Shopping> result = template.insert(shopping, queryOptions.insertOptions());

        return result.getEntity();
    }

    @Override
    public Shopping updateShopping(UUID id, Shopping sale) throws JsonProcessingException {
        Shopping shopping = template.selectOne(Query.query(where("purchase_id").is(id)), Shopping.class);
        if(shopping != null) {
            shopping.setProducts(sale.getProducts());
            shopping.setTotal(getTotalFromJSON(sale.getProducts().toString()));
            shopping.setPurchase_date(Timestamp.valueOf(LocalDateTime.now()));
            EntityWriteResult<Shopping> result = template.insert(shopping, queryOptions.insertOptions());
            return result.getEntity();
        }
        return new Shopping();
    }

    @Override
    public String deteleShopping(UUID id) {
        Shopping shopping = template.selectOne(Query.query(where("purchase_id").is(id)), Shopping.class);
        if(shopping != null) {
            template.delete(shopping, queryOptions.deleteOptions());
            return "Deleted";
        }
        return new Shopping().toString();
    }
}

package com.aws.cass.inventory.service;

import com.aws.cass.QueryOptions;
import com.aws.cass.inventory.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.EntityWriteResult;
import org.springframework.data.cassandra.core.query.Query;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.cassandra.core.query.Criteria.where;

@Service
public class InventoryServiceImp implements InventoryService {

    private final QueryOptions queryOptions;
    private final CassandraOperations template;

    @Autowired
    public InventoryServiceImp(QueryOptions queryOptions, CassandraOperations template) {
        this.queryOptions = queryOptions;
        this.template = template;
    }

    @Override
    public List<Inventory> getAll() {
        return template.select(Query.empty(), Inventory.class);
    }

    @Override
    public Inventory getInventoryById(UUID id) {
        Inventory product = template.selectOne(Query.query(where("product_id").is(id)), Inventory.class);

        if (product != null) {
            return product;
        }

        return new Inventory();
    }

    @Override
    public Inventory newInventory(Inventory product) {
        product.setProduct_id(UUID.randomUUID());
        EntityWriteResult<Inventory> newProd = template.insert(product, queryOptions.insertOptions());
        return newProd.getEntity();
    }

    @Override
    public Inventory updateInventory(UUID id, Inventory product) {
        Inventory prodExists = template.selectOne(Query.query(where("product_id").is(id)), Inventory.class);

        if (prodExists != null) {
            prodExists.setName(product.getName());
            prodExists.setAmount(product.getAmount());
            prodExists.setPrice(product.getPrice());
            prodExists.setCover(product.getCover());
            prodExists.setDescription(product.getDescription());

            EntityWriteResult<Inventory> updateProd = template.update(prodExists, queryOptions.updateOptions());
            return updateProd.getEntity();
        }

        return new Inventory();
    }

    @Override
    public void addInInventory(List<Inventory> prods) {
        for (Inventory prod : prods) {
            Inventory product = template.selectOne(Query.query(where("name").is(prod.getName())).withAllowFiltering(), Inventory.class);

            if (product != null) {
                int subtractAmount = prod.getAmount();
                int actualAmount = product.getAmount();
                int newAmount = actualAmount + subtractAmount;
                product.setAmount(newAmount);

                template.update(product, queryOptions.updateOptions());
            }
        }
    }

    @Override
    public void subtractInInventory(List<Inventory> prods) {
        for (Inventory prod : prods) {
            Inventory product = template.selectOne(Query.query(where("name").is(prod.getName())).withAllowFiltering(), Inventory.class);

            if (product != null) {
                int subtractAmount = prod.getAmount();
                int actualAmount = product.getAmount();
                int newAmount = Math.max(0, actualAmount - subtractAmount);
                product.setAmount(newAmount);

                template.update(product, queryOptions.updateOptions());
            }
        }
    }

    @Override
    public String deteleInventory(UUID id) {
        Inventory prodExists = template.selectOne(Query.query(where("product_id").is(id)), Inventory.class);

        if (prodExists != null) {
            template.delete(prodExists, queryOptions.deleteOptions());
            return "Product removed from inventory";
        }

        return new Inventory().toString();
    }
}

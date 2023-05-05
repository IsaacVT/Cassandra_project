package com.aws.cass.inventory.model;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.math.BigDecimal;
import java.util.UUID;

@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Inventory {
    @PrimaryKey
    private UUID product_id;
    private String name;
    private Integer amount;
    private BigDecimal price;
    private String cover;
}
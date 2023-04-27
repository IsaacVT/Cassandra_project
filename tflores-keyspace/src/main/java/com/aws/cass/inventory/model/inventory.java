package com.aws.cass.inventory.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
@AllArgsConstructor
@Getter
@Setter
@ToString
public class inventory {
    @PrimaryKey
    private final String productId;
    private String name;
    private Integer amount;
    private Float price;
}
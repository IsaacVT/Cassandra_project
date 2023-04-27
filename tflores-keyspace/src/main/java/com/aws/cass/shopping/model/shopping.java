package com.aws.cass.shopping.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.sql.Timestamp;
import java.util.Map;

@Table
@AllArgsConstructor
@Getter
@Setter
@ToString
public class shopping {
    @PrimaryKey
    private final String purchaseId;
    private Timestamp purchaseDate;
    private String providerName;
    private Map<String,Integer> products;
    private Float total;
}

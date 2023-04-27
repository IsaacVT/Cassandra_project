package com.aws.cass.sales.model;

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
public class sales {
    @PrimaryKey
    private final String saleId;
    private Timestamp saleDate;
    private String clientName;
    private Map<String,Integer> products;
    private Float total;
}

package com.aws.cass.shopping.model;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Shopping {
    @PrimaryKey
    private UUID purchase_id;
    private Timestamp purchase_date;
    private String provider_name;
    private Set<String> products;
    private BigDecimal total;
}

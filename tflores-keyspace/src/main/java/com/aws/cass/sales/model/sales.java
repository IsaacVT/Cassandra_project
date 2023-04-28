package com.aws.cass.sales.model;

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
public class Sales {
    @PrimaryKey
    private UUID sale_id;
    private Timestamp sale_date;
    private String client_name;
    private Set<String> products;
    private BigDecimal total;
}
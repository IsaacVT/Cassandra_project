package com.aws.cass.example.model;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Company {

    @PrimaryKey private final String companyId;
    private String companyName;
    private String uniqueBusinessIdentifier;
}

package com.db.cassandra.tflores.test.entity;

import lombok.*;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Data
@Table("tutorialtable")
public class Tutorial {

    @PrimaryKey
    @CassandraType(type = CassandraType.Name.UUID )
    private UUID id;

    @Column("name")
    private String name;

    @Column("age")
    private Integer age;

    @Column("email")
    private String email;
}
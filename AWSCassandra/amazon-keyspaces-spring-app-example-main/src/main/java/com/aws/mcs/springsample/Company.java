// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

package com.aws.mcs.springsample;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
public class Company {

    @PrimaryKey private final String companyId;

    private String companyName;
    private String uniqueBusinessIdentifier;


    public Company(String companyId, String companyName, String uniqueBusinessIdentifier) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.uniqueBusinessIdentifier = uniqueBusinessIdentifier;
    }

    public String getCompanyId() {
        return companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getUniqueBusinessIdentifier() {
        return uniqueBusinessIdentifier;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setUniqueBusinessIdentifier(String uniqueBusinessIdentifier) {
        this.uniqueBusinessIdentifier = uniqueBusinessIdentifier;
    }

    @Override
    public String toString() {
        return "Company{" +
                "companyId='" + companyId + '\'' +
                ", companyName='" + companyName + '\'' +
                ", business identifier='" + uniqueBusinessIdentifier + '\'' +
                '}';
    }
}

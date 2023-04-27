package com.aws.mcs.springsample.repository;

import com.datastax.oss.driver.api.core.ConsistencyLevel;
import org.springframework.data.cassandra.core.*;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyRepository {
    public InsertOptions insertOptions() {
        return InsertOptions.builder().
                consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
                build();
    }

    public UpdateOptions updateOptions() {
        return UpdateOptions.builder().
                consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
                build();
    }

    public DeleteOptions deleteOptions() {
        return DeleteOptions.builder().
                consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
                build();
    }
}

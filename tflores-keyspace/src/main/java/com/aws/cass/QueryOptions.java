package com.aws.cass;

import com.datastax.oss.driver.api.core.ConsistencyLevel;
import org.springframework.data.cassandra.core.*;

@org.springframework.stereotype.Repository
public class QueryOptions {
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
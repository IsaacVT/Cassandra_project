// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

package com.aws.mcs.springsample;

import com.datastax.oss.driver.api.core.ConsistencyLevel;
import com.datastax.oss.driver.api.core.CqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.cassandra.core.*;
import org.springframework.data.cassandra.core.query.Query;

import java.security.NoSuchAlgorithmException;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.springframework.data.cassandra.core.query.Criteria.where;

@SpringBootApplication
public class KeyspacesSpringApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(KeyspacesSpringApplication.class);

	private static Company addCompany(String companyName, String uniqueBusinessIdentifier) {
		return new Company(UUID.randomUUID().toString(), companyName, uniqueBusinessIdentifier);
	}

	private static Company updateCompany(String companyName, String uniqueBusinessIdentifier, Company company) {
		company.setCompanyName(companyName);
		company.setUniqueBusinessIdentifier(uniqueBusinessIdentifier);
		return company;
	}

	public static void main(String[] args) throws NoSuchAlgorithmException {

		SpringApplication.run(KeyspacesSpringApplication.class, args);
		// use Java-based bean metadata to register an instance of a com.datastax.oss.driver.api.core.CqlSession
		CqlSession cqlSession = new AppConfig().session();

		// You can also configure additional options such as TTL, consistency level, and lightweight transactions when using InsertOptions and UpdateOptions
		InsertOptions insertOptions = org.springframework.data.cassandra.core.InsertOptions.builder().
				consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
				build();

		UpdateOptions updateOptions = org.springframework.data.cassandra.core.UpdateOptions.builder().
				consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
				build();

		DeleteOptions deleteOptions = org.springframework.data.cassandra.core.DeleteOptions.builder().
				consistencyLevel(ConsistencyLevel.LOCAL_QUORUM).
				build();

		// The CqlTemplate can be used within a DAO implementation through direct instantiation with a SessionFactory reference or be configured in
		// the Spring container and given to DAOs as a bean reference. CqlTemplate is a foundational building block for CassandraTemplate
		CassandraOperations template = new CassandraTemplate(cqlSession);

		EntityWriteResult<Company> company = template.insert(addCompany("Movistar", "25-004-1596"), insertOptions);

		Company findById = template.selectOne(Query.query(where("companyId").is("4570d1f4-6540-4c2c-bc5c-60f653886866")), Company.class);
		LOGGER.info(findById.toString());

		List<Company> selectAll = template.select(Query.empty(), Company.class);
		LOGGER.info(selectAll.toString());

		template.update(updateCompany("Twitter","25-004-1596", findById), updateOptions);
		Company update = template.selectOne(Query.query(where("companyId").is(findById.getCompanyId())), Company.class);
		LOGGER.info(update.toString());

		Company deleteComp = template.selectOne(Query.query(where("companyId").is("323eb88c-0042-4020-bc57-f97975873b6c")), Company.class);
		template.delete(Objects.requireNonNull(deleteComp), deleteOptions);

		cqlSession.close();
		System.exit(0);
	}

}


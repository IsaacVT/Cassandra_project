package com.aws.mcs.springsample.service;

import com.aws.mcs.springsample.model.Company;

import java.util.List;

public interface CompanyService {
    List<Company> getAll();
    Company getCompanyById(String name);
    Company newCompany (Company company);
    Company updateCompany(String id, Company company);
    String deteleCompany(String id);
}

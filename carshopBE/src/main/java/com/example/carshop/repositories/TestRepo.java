package com.example.carshop.repositories;

import com.example.carshop.entity.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface TestRepo extends JpaRepository<TestEntity, BigInteger> {
}

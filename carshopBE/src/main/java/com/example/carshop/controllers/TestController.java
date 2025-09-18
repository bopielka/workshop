package com.example.carshop.controllers;

import com.example.carshop.entity.TestEntity;
import com.example.carshop.repositories.TestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;

@RestController
public class TestController {

    private final TestRepo testRepo;

    @Autowired
    public TestController(TestRepo testRepo) {
        this.testRepo = testRepo;
    }

    @GetMapping("/test")
    public TestEntity getTest() {
        return testRepo.findById(BigInteger.ONE).orElseThrow(() -> new RuntimeException("Twoja stara exception"));
    }
}

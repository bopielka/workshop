package com.example.carshop.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.carshop.domain.entity.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Long> {
  List<CarEntity> findTop12ByOrderByIdDesc();

  List<CarEntity> findTop12ByIsDraftFalseOrderByPriceDesc();

  Page<CarEntity> findAllByIsDraftFalse(Pageable pageable);

  @Query("SELECT c FROM CarEntity c WHERE c.isDraft = false AND (LOWER(c.model) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.make) LIKE LOWER(CONCAT('%', :search, '%')))")
  Page<CarEntity> searchPublished(@Param("search") String search, Pageable pageable);

  @Query("SELECT c FROM CarEntity c WHERE LOWER(c.model) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.make) LIKE LOWER(CONCAT('%', :search, '%'))")
  Page<CarEntity> searchAll(@Param("search") String search, Pageable pageable);
}

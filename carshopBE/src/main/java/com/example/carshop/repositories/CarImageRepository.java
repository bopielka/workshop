package com.example.carshop.repositories;

import com.example.carshop.domain.entity.CarImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarImageRepository extends JpaRepository<CarImageEntity, Long> {

    List<CarImageEntity> findByCarId(Long carId);

    @Modifying
    @Query("UPDATE CarImageEntity img SET img.isMain = false WHERE img.car.id = :carId")
    void clearMainForCar(@Param("carId") Long carId);

    @Modifying
    @Query("UPDATE CarImageEntity img SET img.isMain = true WHERE img.id = :imageId")
    void setAsMain(@Param("imageId") Long imageId);
}

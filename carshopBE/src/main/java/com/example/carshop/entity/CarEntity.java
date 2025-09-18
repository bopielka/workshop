package com.example.carshop.entity;

import jakarta.persistence.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "car")
public class CarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;

    @Column
    private String model;

    @Column
    private String make;

    @Column
    private Date yearOfProduction;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderColumn(name = "position")
    private List<CarImageEntity> images = new ArrayList<>();

    public void addImage(CarImageEntity img) {
        img.setCar(this);
        images.add(img);
    }

    public void removeImage(CarImageEntity img) {
        images.remove(img);
        img.setCar(null);
    }

    public CarEntity() {
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public Date getYearOfProduction() {
        return yearOfProduction;
    }

    public void setYearOfProduction(Date yearOfProduction) {
        this.yearOfProduction = yearOfProduction;
    }

    public List<CarImageEntity> getImages() {
        return images;
    }

    public void setImages(List<CarImageEntity> images) {
        this.images = images;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CarEntity carEntity = (CarEntity) o;
        return Objects.equals(id, carEntity.id) && Objects.equals(model, carEntity.model) && Objects.equals(make, carEntity.make) && Objects.equals(yearOfProduction, carEntity.yearOfProduction) && Objects.equals(images, carEntity.images);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, model, make, yearOfProduction, images);
    }
}

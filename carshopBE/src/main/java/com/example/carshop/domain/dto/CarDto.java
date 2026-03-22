package com.example.carshop.domain.dto;

import java.math.BigDecimal;
import java.util.List;

import com.example.carshop.domain.enums.BodyType;
import com.example.carshop.domain.enums.FuelType;
import com.example.carshop.domain.enums.GearboxType;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CarDto {

  private Long id;
  private String model;
  private String make;
  private Integer yearOfProduction;
  private Integer mileage;
  private FuelType fuelType;
  private Integer power;
  private Integer capacity;
  private Integer doorCount;
  private GearboxType gearboxType;
  private BodyType bodyType;
  private String description;
  private BigDecimal price;
  private boolean isDraft;
  private List<CarImageDto> images;

  public CarDto() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
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

  public Integer getYearOfProduction() {
    return yearOfProduction;
  }

  public void setYearOfProduction(Integer yearOfProduction) {
    this.yearOfProduction = yearOfProduction;
  }

  public Integer getMileage() {
    return mileage;
  }

  public void setMileage(Integer mileage) {
    this.mileage = mileage;
  }

  public FuelType getFuelType() {
    return fuelType;
  }

  public void setFuelType(FuelType fuelType) {
    this.fuelType = fuelType;
  }

  public Integer getPower() {
    return power;
  }

  public void setPower(Integer power) {
    this.power = power;
  }

  public Integer getCapacity() {
    return capacity;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass())
      return false;

    CarDto carDto = (CarDto) o;
    return isDraft == carDto.isDraft && id.equals(carDto.id) && model.equals(carDto.model)
        && make.equals(carDto.make) && yearOfProduction.equals(carDto.yearOfProduction)
        && mileage.equals(carDto.mileage) && fuelType == carDto.fuelType
        && power.equals(carDto.power) && capacity.equals(carDto.capacity)
        && doorCount.equals(carDto.doorCount) && gearboxType == carDto.gearboxType
        && bodyType == carDto.bodyType && description.equals(carDto.description)
        && price.equals(carDto.price) && images.equals(carDto.images);
  }

  @Override
  public int hashCode() {
    int result = id.hashCode();
    result = 31 * result + model.hashCode();
    result = 31 * result + make.hashCode();
    result = 31 * result + yearOfProduction.hashCode();
    result = 31 * result + mileage.hashCode();
    result = 31 * result + fuelType.hashCode();
    result = 31 * result + power.hashCode();
    result = 31 * result + capacity.hashCode();
    result = 31 * result + doorCount.hashCode();
    result = 31 * result + gearboxType.hashCode();
    result = 31 * result + bodyType.hashCode();
    result = 31 * result + description.hashCode();
    result = 31 * result + price.hashCode();
    result = 31 * result + Boolean.hashCode(isDraft);
    result = 31 * result + images.hashCode();
    return result;
  }

  public void setCapacity(Integer capacity) {
    this.capacity = capacity;
  }

  public Integer getDoorCount() {
    return doorCount;
  }

  public void setDoorCount(Integer doorCount) {
    this.doorCount = doorCount;
  }

  public GearboxType getGearboxType() {
    return gearboxType;
  }

  public void setGearboxType(GearboxType gearboxType) {
    this.gearboxType = gearboxType;
  }

  public BodyType getBodyType() {
    return bodyType;
  }

  public void setBodyType(BodyType bodyType) {
    this.bodyType = bodyType;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  @JsonProperty("isDraft")
  public boolean isDraft() {
    return isDraft;
  }

  public void setDraft(boolean isDraft) {
    this.isDraft = isDraft;
  }

  public List<CarImageDto> getImages() {
    return images;
  }

  public void setImages(List<CarImageDto> images) {
    this.images = images;
  }
}

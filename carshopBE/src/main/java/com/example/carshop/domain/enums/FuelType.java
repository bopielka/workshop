package com.example.carshop.domain.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum FuelType {
  @JsonProperty("gasoline")
  GASOLINE, @JsonProperty("diesel")
  DIESEL, @JsonProperty("gas")
  GAS
}

package com.example.carshop.domain.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum GearboxType {
  @JsonProperty("manual")
  MANUAL, @JsonProperty("automatic")
  AUTOMATIC
}

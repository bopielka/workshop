package com.example.carshop.domain.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum BodyType {
    @JsonProperty("coupe")     COUPE,
    @JsonProperty("cabriolet") CABRIOLET,
    @JsonProperty("minivan")   MINIVAN,
    @JsonProperty("sedan")     SEDAN,
    @JsonProperty("suv")       SUV,
    @JsonProperty("bus")       BUS,
    @JsonProperty("limousine") LIMOUSINE,
    @JsonProperty("combi")     COMBI,
    @JsonProperty("hatchback") HATCHBACK
}

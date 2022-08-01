package com.sky.getyourway.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class WeatherData {

    @JsonProperty("name")
    public String location;

    @JsonProperty("weather")
    public List<Weather> weather;
};


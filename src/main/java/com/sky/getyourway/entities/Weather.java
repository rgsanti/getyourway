package com.sky.getyourway.entities;

import lombok.Data;

@Data
public class Weather {

    private String description;
    private String icon;

    public Weather() {
    }

    public Weather(String description, String icon) {
    }
}
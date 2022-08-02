package com.sky.getyourway.entities;

import lombok.Data;

@Data
public class Weather {

    private String description;
    private String icon;

    private double temp;

    private String date;

    public Weather(String description, String iconLink, String date, double temp) {
        this.icon = iconLink;
        this.description = description;
        this.date = date;
        this.temp = temp;
    }
}

package com.sky.getyourway.entities;

import lombok.Data;

@Data
public class Weather {

    private String description;
    private String icon;

    public Weather(String description, String iconLink) {
        this.icon = iconLink;
        this.description = description;
    }
}

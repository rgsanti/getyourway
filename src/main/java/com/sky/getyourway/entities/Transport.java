package com.sky.getyourway.entities;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Entity
@Data
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String origin;

    @NotNull
    private String destination;

    @NotNull
    @Digits(integer = 10, fraction = 2) // 10 digits, 2 decimals
    private double price;

    @NotNull
    private long time; // time since epoch

}

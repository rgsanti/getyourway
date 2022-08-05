package com.sky.getyourway.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@NoArgsConstructor
public abstract class Transport implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String origin;

    @NotNull
    private String destination;

    @Digits(integer = 10, fraction = 2) // 10 digits, 2 decimals
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    private Long time; // duration in seconds

    @NotNull
    private Integer journeyStepOrder;

    @CreationTimestamp
    @Column(name = "date_time_created", nullable = false)
    private LocalDateTime dateTimeCreated;
}

package com.sky.getyourway.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Inheritance
@Table(name = "train", schema = "getyourway")
public class Train extends Transport {

    private String routeNumber;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "journey_id", nullable = false)
    private Journey journey;
}

package com.sky.getyourway.entities;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
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

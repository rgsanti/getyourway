package com.sky.getyourway.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Inheritance
@Table(name = "flight", schema = "getyourway")
public class Flight extends Transport {

    private String flightNumber;

    @Column(name = "origin_location_code", nullable = false)
    private String originLocationCode;

    @Column(name = "destination_location_code", nullable = false)
    private String destinationLocationCode;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "passenger_count", nullable = false)
    private Integer passengerCount;

    @Column(name = "transfer_count", nullable = false)
    private Integer transferCount;

    @Column(name = "currency_code", nullable = false)
    private String currencyCode;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "journey_id", nullable = false)
    private Journey journey;
}

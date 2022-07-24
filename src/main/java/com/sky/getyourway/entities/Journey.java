package com.sky.getyourway.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "journey", schema = "getyourway")
@Builder(toBuilder = true)
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String origin;

    @NotNull
    private String destination;

    @NotNull
    @Digits(integer = 10, fraction = 2) // 10 digits, 2 decimals
    private double totalPrice;

    @NotNull
    private Long time; // total duration in seconds

    @CreationTimestamp
    @Column(name = "date_time_created", nullable = false)
    private LocalDateTime dateTimeCreated;

    @UpdateTimestamp
    @Column(name = "date_time_updated", nullable = false)
    private LocalDateTime dateTimeUpdated;

    @ToString.Exclude
    @OneToMany(mappedBy = "journey", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Flight> flightSteps = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "journey", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Train> trainSteps = new ArrayList<>();

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

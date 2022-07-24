package com.sky.getyourway.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", schema = "getyourway")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Size(min = 1, max = 50)
    @NotNull
    private String firstName;

    @Size(min = 1, max = 50)
    @NotNull
    private String lastName;

    @Column(name = "email_address", unique = true, nullable = false)
    private String email;

    @Size(min = 8)
    @Column(name = "password", nullable = false)
    private String password;

    // max 20 to cater for international numbers
    @Size(min = 11, max = 20)
    @NotNull
    private String phoneNumber;

    @Size(min = 5, max = 8)
    private String postcode;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @CreationTimestamp
    @Column(name = "date_time_created", nullable = false)
    private LocalDateTime dateTimeCreated;

    @CreationTimestamp
    @Column(name = "date_time_updated", nullable = false)
    private LocalDateTime dateTimeUpdated;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Journey> journeyList = new ArrayList<>();

}

package com.sky.getyourway.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 30)
    @NotNull
    private String firstName;

    @Size(min = 1, max = 30)
    @NotNull
    private String lastName;

    @Email
    @NotNull
    private String email;

    // TODO: Validation for password format?
    @NotNull
    private String password;

    @Size(min = 11, max = 11)
    @NotNull
    private String phoneNumber;

    @Size(min = 5, max = 8)
    private String postcode;
}

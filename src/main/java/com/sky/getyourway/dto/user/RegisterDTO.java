package com.sky.getyourway.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sky.getyourway.util.constraint.EmailUniqueConstraint;
import com.sky.getyourway.util.constraint.UsernameUniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO
{
    @UsernameUniqueConstraint
    @NotNull(message = "Username is required!")
    @Size(min = 5, max = 50, message = "Username must be between 5 and 50 characters!")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Username only accepts alphanumeric letters without any white space!")
    @JsonProperty(value = "username")
    private String username;

    @NotNull(message = "Firstname is required!")
    @Size(min = 1, max = 50, message = "Firstname must be between 1 and 50 characters!")
    @Pattern(regexp = "^[A-Za-z0-9\\-]+$", message = "Firstname only accepts alphanumeric letters without any white space!")
    @JsonProperty(value = "firstname")
    private String firstname;

    @NotNull(message = "Lastname is required!")
    @Size(min = 1, max = 50, message = "Lastname must be between 1 and 50 characters!")
    @Pattern(regexp = "^[A-Za-z0-9\\-]+$", message = "Lastname only accepts alphanumeric letters without any white space!")
    @JsonProperty(value = "lastname")
    private String lastname;

    @NotNull(message = "Phone number is required!")
    @Size(min = 11, max = 20, message = "Phone number must be at least 11 digits!")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Phone number accepts only digits!")
    @JsonProperty(value = "phoneNumber")
    private String phoneNumber;

    @NotNull(message = "Home Airport is required!")
    @Size(min = 3, max = 3)
    @Pattern(regexp = "^[A-Za-z]+$", message = "Home Airport only accepts characters!")
    @JsonProperty(value = "homeAirportCode")
    private String homeAirportCode;

    @NotNull(message = "Password is required!")
    @Size(min = 8, max = 80, message = "Password must be between 8 and 80 characters!")
    @Pattern(regexp = "[A-Za-z0-9]+$", message = "Password only accepts alphanumeric letters!")
    @JsonProperty(value = "password")
    private String password;

    @EmailUniqueConstraint
    @NotNull(message = "E-mail address is required!")
    @Email(message = "E-mail address is in incorrect format!")
    @JsonProperty(value = "email")
    private String email;
}

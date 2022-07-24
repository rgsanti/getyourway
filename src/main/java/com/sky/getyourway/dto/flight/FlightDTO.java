package com.sky.getyourway.dto.flight;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sky.getyourway.util.constraint.CurrencyCodeConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDTO {

    @JsonProperty(value = "id")
    private Long id;

    @NotNull(message = "Origin Location Code is required!")
    @Pattern(regexp = "^[A-Z]+$",
            message = "Origin Location Code accepts only alphabetic uppercase letters without any white space!")
    @Size(min = 2, max = 4, message = "Origin Location Code contains only 2-4 characters!")
    @JsonProperty(value = "originLocationCode")
    private String originLocationCode;

    @NotNull(message = "Destination Location Code is required!")
    @Pattern(regexp = "^[A-Z]+$",
            message = "Destination Location Code accepts only alphabetic uppercase letters without any white space!")
    @Size(min = 2, max = 4, message = "Destination Location Code contains only 2-4 characters!")
    @JsonProperty(value = "destinationLocationCode")
    private String destinationLocationCode;

    @NotNull(message = "Departure Date is required!")
    @JsonProperty(value = "departureDate")
    private LocalDate departureDate;

    @JsonProperty(value = "returnDate")
    private LocalDate returnDate;

    @Positive(message = "Passenger Count must be greater than zero!")
    @NotNull(message = "Passenger Count is required!")
    @JsonProperty(value = "passengerCount")
    private Integer passengerCount;

    @Positive(message = "Transfer Count must be greater than zero!")
    @NotNull(message = "Transfer Count is required!")
    @JsonProperty(value = "transferCount")
    private Integer transferCount;

    @CurrencyCodeConstraint(message = "Currency Code is required! Use GBP, USD, EUR, HRK only!")
    @NotEmpty(message = "Currency Code must not be empty!")
    @JsonProperty(value = "currencyCode")
    private String currencyCode;

    @Positive(message = "Price must be greater than zero!")
    @NotNull(message = "Price is required!")
    @JsonProperty(value = "price")
    private Double price;

    @JsonProperty(value = "time")
    private Long time;
}

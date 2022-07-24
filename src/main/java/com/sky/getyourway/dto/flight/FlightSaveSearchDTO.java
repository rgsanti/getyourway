package com.sky.getyourway.dto.flight;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sky.getyourway.util.constraint.CurrencyCodeConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightSaveSearchDTO {

    @JsonProperty(value = "originLocationCode")
    private String originLocationCode = "";

    @JsonProperty(value = "destinationLocationCode")
    private String destinationLocationCode = "";

    @JsonProperty(value = "departureDate")
    private LocalDate departureDate;

    @JsonProperty(value = "returnDate")
    private LocalDate returnDate;

    @Positive(message = "Passenger Count must be greater than zero!")
    @JsonProperty(value = "passengerCount")
    private Integer passengerCount = 1;

    @CurrencyCodeConstraint
    @JsonProperty(value = "currencyCode")
    private String currencyCode = "";
}

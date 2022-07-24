package com.sky.getyourway.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private String password;
    private String postcode;

    @JsonProperty(value = "username")
    private String username;

    @JsonProperty(value = "jwtToken")
    private String jwtToken;

    @JsonProperty(value = "airToken")
    private String airToken;

}

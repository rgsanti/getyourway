package com.sky.getyourway.dto.user;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
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
    private String homeAirportCode;
    private String username;
    private String jwtToken;
    private String airToken;

}

package com.sky.getyourway.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private String password;
    private String postcode;

    public UserDTO() {
        super();
    }
}

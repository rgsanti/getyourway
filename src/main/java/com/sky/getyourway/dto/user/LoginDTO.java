package com.sky.getyourway.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO
{
    @NotNull(message = "Username is required!")
    @JsonProperty(value = "username")
    private String username;

    @NotNull(message = "Password is required!")
    @JsonProperty(value = "password")
    private String password;
}

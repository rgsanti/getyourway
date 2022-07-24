package com.sky.getyourway.service;

import com.sky.getyourway.dto.user.LoginDTO;
import com.sky.getyourway.dto.user.RegisterDTO;
import com.sky.getyourway.dto.user.UserDTO;

public interface UserService
{
    UserDTO findCurrentUserAirToken(String jwt);

    UserDTO findCurrentUser();

    UserDTO login(LoginDTO loginDTO);

    UserDTO register(RegisterDTO registerDTO);
}

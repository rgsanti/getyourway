package com.sky.getyourway.util;

import com.sky.getyourway.dto.user.LoginDTO;
import com.sky.getyourway.dto.user.RegisterDTO;
import lombok.experimental.UtilityClass;

@UtilityClass
public class TestHelper {

    public static String USER_ONE_NAME = "first_user";
    public static String USER_FIRSTNAME = "jo";
    public static String USER_LASTNAME = "fredman";
    public static String USER_HOME_AIRPORT = "LHR";
    public static String USER_PHONE_NUMBER = "07123456789";
    public static String USER_ONE_EMAIL = "first_user@test.com";

    public static String USER_OTHER_NAME = "otheruser";
    public static String USER_OTHER_PASSWORD = "otheruser";
    public static String USER_OTHER_EMAIL = "otheruser@test.com";



    public static LoginDTO createLoginDTO_BadRequest()
    {
        return new LoginDTO();
    }

    public static LoginDTO createLoginDTO_Forbidden()
    {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername(USER_OTHER_NAME);
        loginDTO.setPassword(USER_OTHER_PASSWORD);

        return loginDTO;
    }

    public static RegisterDTO createRegisterDTO()
    {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setUsername(USER_OTHER_NAME);
        registerDTO.setFirstname(USER_FIRSTNAME);
        registerDTO.setLastname(USER_LASTNAME);
        registerDTO.setPhoneNumber(USER_PHONE_NUMBER);
        registerDTO.setHomeAirportCode(USER_HOME_AIRPORT);
        registerDTO.setEmail(USER_OTHER_EMAIL);
        registerDTO.setPassword(USER_OTHER_PASSWORD);

        return registerDTO;
    }

    public static RegisterDTO createRegisterDTO_BadRequest()
    {
        return new RegisterDTO();
    }

    public static RegisterDTO createRegisterDTO_BadRequest_UsernameAndEmailAlreadyInUse()
    {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setUsername(USER_ONE_NAME);
        registerDTO.setEmail(USER_ONE_EMAIL);
        registerDTO.setPassword(USER_OTHER_PASSWORD);

        return registerDTO;
    }

}
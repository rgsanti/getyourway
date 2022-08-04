package com.sky.getyourway.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sky.getyourway.dto.user.LoginDTO;
import com.sky.getyourway.dto.user.RegisterDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static com.sky.getyourway.util.TestHelper.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = { "movies.sky-originals.imdb-codes-list=" })
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;


    @Test
    @WithMockUser(username = "invaliduser")
    public void getCurrentUser_Unauthorized() throws Exception
    {
        this.mockMvc.perform(
                        get("/api/user")
                )
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void login_Forbidden() throws Exception{
        LoginDTO loginDTO = createLoginDTO_Forbidden();

        this.mockMvc.perform(
                        post("/api/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(loginDTO))
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    public void login_BadRequest_FailedValidation() throws Exception
    {
        LoginDTO loginDTO = createLoginDTO_BadRequest();

        this.mockMvc.perform(
                        post("/api/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(loginDTO))
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    public void register() throws Exception
    {
        RegisterDTO registerDTO = createRegisterDTO();

        this.mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(registerDTO))
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk());
    }

    @Test
    public void register_BadRequest() throws Exception
    {
        RegisterDTO registerDTO = createRegisterDTO_BadRequest();

        this.mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(registerDTO))
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    public void register_BadRequest_UsernameAndEmailAlreadyInUse() throws Exception
    {
        RegisterDTO registerDTO = createRegisterDTO_BadRequest_UsernameAndEmailAlreadyInUse();

        this.mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(mapper.writeValueAsString(registerDTO))
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isBadRequest());
    }

}
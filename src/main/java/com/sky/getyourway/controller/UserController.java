package com.sky.getyourway.controller;

import com.sky.getyourway.dto.user.LoginDTO;
import com.sky.getyourway.dto.user.RegisterDTO;
import com.sky.getyourway.dto.user.UserDTO;
import com.sky.getyourway.service.UserService;
import com.sky.getyourway.util.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api")
public class UserController
{
    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser()
    {
        UserDTO userDTO = userService.findCurrentUser();
        log.info("User info:" + userDTO);

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/airtoken")
    public ResponseEntity<?> getAirApiToken(@RequestHeader("authorization") String jwt)
    {
        UserDTO userDTO = userService.findCurrentUserAirToken(jwt.split(" ")[1]);
        log.info("User Air Api Token info: " + userDTO);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO, Errors errors)
    {
        if(errors.hasErrors()) throw new BadRequestException(errors);

        UserDTO userDTO = userService.login(loginDTO);
        log.info("User Login Info: " + userDTO);

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO, Errors errors)
    {
        if(errors.hasErrors()) throw new BadRequestException(errors);

        UserDTO userDTO = userService.register(registerDTO);
        log.info("User Created: " + userDTO);

        return ResponseEntity.ok("Registration successful! You can now login!");
    }
}

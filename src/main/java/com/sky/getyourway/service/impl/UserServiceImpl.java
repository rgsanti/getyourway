package com.sky.getyourway.service.impl;

import com.sky.getyourway.dto.user.LoginDTO;
import com.sky.getyourway.dto.user.RegisterDTO;
import com.sky.getyourway.dto.user.UserDTO;
import com.sky.getyourway.entities.User;
import com.sky.getyourway.persistence.UserRepo;
import com.sky.getyourway.security.jwt.JwtTokenProvider;
import com.sky.getyourway.service.UserService;
import com.sky.getyourway.util.converter.ConverterUtil;
import com.sky.getyourway.util.exception.UnauthorizedRequestException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService
{
    private final UserRepo userRepository;

    private final ConverterUtil<User, UserDTO> converterUtil;
    private final ModelMapper modelMapper;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO findCurrentUserAirToken(String jwt)
    {
        UserDTO userDTO = converterUtil.convertToDTO(getCurrentUser());
        userDTO.setAirToken(jwtTokenProvider.extractAirApiTokenFromJwt(jwt));

        return userDTO;
    }

    @Override
    public UserDTO findCurrentUser()
    {
        return converterUtil.convertToDTO(getCurrentUser());
    }

    @Override
    public UserDTO login(LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        String token = jwtTokenProvider.generateToken(authentication);

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(loginDTO.getUsername());
        userDTO.setJwtToken(token);

        return userDTO;
    }

    @Override
    public UserDTO register(RegisterDTO registerDTO)
    {
        User user = convertRegisterDTOToUser(registerDTO);
        user = userRepository.save(user);

        return converterUtil.convertToDTO(user);
    }

    private User convertRegisterDTOToUser(RegisterDTO registerDTO)
    {
        User user = modelMapper.map(registerDTO, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return user;
    }

    public User getCurrentUser()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return userRepository.findOneByUsername(authentication.getName()).orElseThrow(() -> {
            throw new UnauthorizedRequestException("Unauthorized Request!");
        });
    }
}

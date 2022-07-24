package com.sky.getyourway.util.converter.impl;


import com.sky.getyourway.dto.user.UserDTO;
import com.sky.getyourway.entities.User;
import com.sky.getyourway.util.converter.ConverterUtil;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Qualifier("UserConverter")
public class UserConverterImpl implements ConverterUtil<User, UserDTO>
{
    private final ModelMapper modelMapper;

    @Override
    public UserDTO convertToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public User convertToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }
}
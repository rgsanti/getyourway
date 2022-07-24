package com.sky.getyourway.util.constraint.validator;

import com.sky.getyourway.entities.User;
import com.sky.getyourway.persistence.UserRepo;
import com.sky.getyourway.util.constraint.UsernameUniqueConstraint;
import lombok.AllArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

@AllArgsConstructor
public class UsernameUniqueValidator implements ConstraintValidator<UsernameUniqueConstraint, String>
{
    private final UserRepo userRepository;

    @Override
    public void initialize(UsernameUniqueConstraint username) { }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext ctx)
    {
        User user = userRepository.findOneByUsername(username).orElse(null);

        return Objects.isNull(user);
    }
}

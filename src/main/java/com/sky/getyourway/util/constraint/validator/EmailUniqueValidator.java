package com.sky.getyourway.util.constraint.validator;

import com.sky.getyourway.entities.User;
import com.sky.getyourway.persistence.UserRepo;
import com.sky.getyourway.util.constraint.EmailUniqueConstraint;
import lombok.AllArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

@AllArgsConstructor
public class EmailUniqueValidator implements ConstraintValidator<EmailUniqueConstraint, String>
{
    private final UserRepo userRepository;

    @Override
    public void initialize(EmailUniqueConstraint email) { }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext ctx)
    {
        User user = userRepository.findOneByEmail(email).orElse(null);

        if (Objects.isNull(user)) return true;

        return false;
    }
}
package com.sky.getyourway.util.constraint;

import com.sky.getyourway.util.constraint.validator.UsernameUniqueValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UsernameUniqueValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UsernameUniqueConstraint
{
    String message() default "Username already taken!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

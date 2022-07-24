package com.sky.getyourway.util.constraint;

import com.sky.getyourway.util.constraint.validator.EmailUniqueValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EmailUniqueValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailUniqueConstraint
{
    String message() default "E-mail address already taken!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

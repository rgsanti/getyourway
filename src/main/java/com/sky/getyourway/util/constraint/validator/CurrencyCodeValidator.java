package com.sky.getyourway.util.constraint.validator;

import com.sky.getyourway.util.constraint.CurrencyCodeConstraint;
import lombok.AllArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

@AllArgsConstructor
public class CurrencyCodeValidator implements ConstraintValidator<CurrencyCodeConstraint, String> {
    @Override
    public void initialize(CurrencyCodeConstraint constraintAnnotation) {

    }

    @Override
    public boolean isValid(String currencyCode, ConstraintValidatorContext constraintValidatorContext) {
        return Arrays.asList("", "GBP", "USD", "EUR", "HRK").contains(currencyCode);
    }
}

package com.sky.getyourway.util.exception;

import org.springframework.validation.Errors;

public class BadRequestException extends RuntimeException
{
    private Errors errors;

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(Errors errors){
        this.errors = errors;
    }

    public Errors getErrors() {
        return errors;
    }
}

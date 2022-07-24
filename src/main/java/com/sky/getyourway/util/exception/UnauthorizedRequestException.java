package com.sky.getyourway.util.exception;

public class UnauthorizedRequestException extends RuntimeException
{
    public UnauthorizedRequestException(String message) {
        super(message);
    }
}

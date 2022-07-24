package com.sky.getyourway.util.converter;

public interface ConverterUtil<E, D>
{
    D convertToDTO(E entity);
    E convertToEntity(D dto);
}
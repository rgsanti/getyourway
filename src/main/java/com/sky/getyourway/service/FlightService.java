package com.sky.getyourway.service;

import com.sky.getyourway.dto.flight.FlightDTO;
import com.sky.getyourway.dto.flight.FlightSaveSearchDTO;
import com.sky.getyourway.dto.flight.FlightSearchDTO;

import java.util.List;

public interface FlightService {

    List<FlightDTO> findAllSave();

    List<FlightDTO> search(String token, FlightSearchDTO searchDTO);

    List<FlightDTO> searchSave(FlightSaveSearchDTO searchDTO);

    FlightDTO save(FlightDTO flightDTO);

    void deleteSaveById(Long id);
}

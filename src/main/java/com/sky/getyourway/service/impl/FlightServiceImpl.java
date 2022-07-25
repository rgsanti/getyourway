package com.sky.getyourway.service.impl;

import com.sky.getyourway.dto.flight.FlightDTO;
import com.sky.getyourway.dto.flight.FlightSearchDTO;
import com.sky.getyourway.entities.Flight;
import com.sky.getyourway.entities.Journey;
import com.sky.getyourway.persistence.FlightRepo;
import com.sky.getyourway.persistence.JourneyRepo;
import com.sky.getyourway.service.AirApiService;
import com.sky.getyourway.service.FlightService;
import com.sky.getyourway.util.converter.ConverterUtil;
import com.sky.getyourway.util.exception.UnauthorizedRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class FlightServiceImpl implements FlightService
{
    private final AirApiService airApiService;

    private final FlightRepo flightRepository;
    private final JourneyRepo journeyRepo;
    private final UserServiceImpl userServiceImpl;

    private final ConverterUtil<Flight, FlightDTO> converterUtil;

    @Override
    public List<FlightDTO> findAllSave()
    {
        List<Flight> flightList = flightRepository.findAllByUserId(userServiceImpl.getCurrentUser().getId());

        return flightList.stream().map(converterUtil::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FlightDTO> search(String jwt, FlightSearchDTO searchDTO)
    {
        return airApiService.requestFlightOffersSearch(jwt, searchDTO);
    }

    @Override
    public FlightDTO save(FlightDTO flightDTO)
    {
        Flight flight = converterUtil.convertToEntity(flightDTO);
        flight.setId(null);

        /*          ------------
         FIXME: hard-coded step order and journey */
        flight.setJourneyStepOrder(1);
        Journey journey = Journey.builder().origin(flightDTO.getOriginLocationCode())
                .destination(flightDTO.getDestinationLocationCode())
                .totalPrice(flightDTO.getPrice())
                .time(flight.getTime())
                .user(userServiceImpl.getCurrentUser())
                .build();
        journeyRepo.saveAndFlush(journey);
        flight.setJourney(journey);
        /*          ------------         */

        flight = flightRepository.save(flight);

        return converterUtil.convertToDTO(flight);
    }

    @Override
    public void deleteSaveById(Long id)
    {
        Flight flight = flightRepository.findByIdAndUserId(id, userServiceImpl.getCurrentUser().getId());

        // if no flight returned - throw an error to the user:
        //     it means the flight entry is not associated with the current user / the session timed-out
        //     or, it had already been deleted
        if (flight == null){
            throw new UnauthorizedRequestException("Flight deletion not allowed!");
        }

        Journey journey = flight.getJourney();

        flightRepository.delete(flight);
        flightRepository.flush();

        // TODO: this would go away once UI supports multiple flights per journey
        journeyRepo.delete(journey);
    }
}

package com.sky.getyourway.controller;

import com.sky.getyourway.dto.flight.FlightDTO;
import com.sky.getyourway.dto.flight.FlightSearchDTO;
import com.sky.getyourway.dto.user.UserDTO;
import com.sky.getyourway.service.FlightService;
import com.sky.getyourway.service.UserService;
import com.sky.getyourway.util.exception.BadRequestException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/flight")
public class FlightController
{
    private final FlightService flightService;
    private final UserService userService;

    @GetMapping("/save")
    public ResponseEntity<?> getAllSave()
    {
        log.debug("Retrieving saved flights for the current user's journey");
        return ResponseEntity.ok(flightService.findAllSave());
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@Valid @RequestBody FlightDTO flightDTO, Errors errors)
    {
        if (errors.hasErrors()) throw new BadRequestException(errors);

        flightDTO = flightService.save(flightDTO);
        log.debug("Saved a Flight Offer: " + flightDTO);

        return ResponseEntity.ok("Flight Offer Saved");
    }

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestHeader("authorization") String jwt,
                                    @Valid @RequestBody FlightSearchDTO searchDTO,
                                    Errors errors)
    {
        if (errors.hasErrors()) throw new BadRequestException(errors);
        log.debug(searchDTO.toString());

        log.debug("Retrieving flight offers from Air Api Search!");
        UserDTO userDTO = userService.findCurrentUserAirToken(jwt.split(" ")[1]);

        List<FlightDTO> flightDTOList = flightService.search(userDTO.getAirToken(), searchDTO);
        return ResponseEntity.ok(flightDTOList);
    }

    @DeleteMapping("/save/{id}")
    public ResponseEntity<?> deleteSaveById(@PathVariable("id") Long id)
    {
        log.debug("Deleting saved Flight Offer");
        flightService.deleteSaveById(id);
        return ResponseEntity.ok("Deleted a saved Flight Offer!");
    }
}

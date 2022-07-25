package com.sky.getyourway.persistence;

import com.sky.getyourway.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Long>
{
    @Query(value = "SELECT distinct f.* FROM getyourway.flight f " +
            "INNER JOIN getyourway.journey j ON j.id = f.journey_id " +
            "INNER JOIN getyourway.user u ON u.id = j.user_id " +
            "WHERE u.id = :userId " +
            "AND f.id = :id",
            nativeQuery = true)
    Flight findByIdAndUserId(Long id, Long userId);

    @Query(value = "SELECT distinct f.* FROM getyourway.flight f " +
            "INNER JOIN getyourway.journey j ON j.id = f.journey_id " +
            "INNER JOIN getyourway.user u ON u.id = j.user_id " +
            "WHERE u.id = :id " +
            "ORDER BY f.departure_date ASC, f.date_time_created ASC",
            nativeQuery = true)
    List<Flight> findAllByUserId(@Param("id") Long id);

    Flight save(Flight flight);
}

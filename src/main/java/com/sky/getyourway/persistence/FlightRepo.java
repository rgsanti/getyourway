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

    @Query(value = "SELECT distinct f.* FROM getyourway.flight f " +
            "INNER JOIN getyourway.journey j ON j.id = f.journey_id " +
            "INNER JOIN getyourway.user u ON u.id = j.user_id " +
            "WHERE u.id = :id AND " +
            "UPPER(f.origin_location_code) LIKE UPPER(CONCAT('%',:origin_location_code,'%')) AND " +
            "UPPER(f.destination_location_code) LIKE UPPER(CONCAT('%',:destination_location_code,'%')) AND " +
            "f.passenger_count >= :passenger_count AND " +
            "(:departure_date = '' OR f.departure_date = DATE(:departure_date)) AND " +
            "(:return_date = '' OR f.return_date = DATE(:return_date)) AND " +
            "(:currency_code = '' OR f.currency_code = :currency_code) " +
            "ORDER BY f.price ASC", nativeQuery = true)
    List<Flight> findAllByParam(@Param("id") Long userId,
                                @Param("origin_location_code") String originLocationCode,
                                @Param("destination_location_code") String destinationLocationCode,
                                @Param("departure_date") String departureDate,
                                @Param("return_date") String returnDate,
                                @Param("passenger_count") Integer passenger_count,
                                @Param("currency_code") String currency_code);

    Flight save(Flight flight);
}

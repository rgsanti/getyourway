package com.sky.getyourway.persistence;

import com.sky.getyourway.entities.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyRepo extends JpaRepository<Journey, Long> {

}

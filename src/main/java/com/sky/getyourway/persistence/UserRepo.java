package com.sky.getyourway.persistence;

import com.sky.getyourway.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findOneByEmail(String email);
    Optional<User> findOneByUsername(String username);

    User save(User user);
}

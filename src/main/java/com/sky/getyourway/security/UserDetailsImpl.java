package com.sky.getyourway.security;

import com.sky.getyourway.entities.User;
import com.sky.getyourway.persistence.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsImpl implements UserDetailsService
{
    private final UserRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        final User user = userRepository.findOneByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User does not exists!"));

        return new UserDetails(user);
    }
}

package com.sky.getyourway.controller;

import com.sky.getyourway.client.MovieApiClient;
import com.sky.getyourway.dto.movie.MovieDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/movie")
public class MovieController {


    private final MovieApiClient movieApiClient;

    private final String[] skyOriginalsImdbCodesList;
    private final List<MovieDTO> skyOriginalsCache;

    MovieController(MovieApiClient movieApiClient,
                    @Value("${movies.sky-originals.imdb-codes-list}")
                    String[] skyOriginalsImdbCodesList) {
        this.movieApiClient = movieApiClient;
        this.skyOriginalsImdbCodesList = skyOriginalsImdbCodesList;
        this.skyOriginalsCache = getSkyOriginalsUncached();
    }

    @GetMapping(value="/sky-originals")
    public List<MovieDTO> getSkyOriginals() {
        return this.skyOriginalsCache;
    }

    private List<MovieDTO> getSkyOriginalsUncached() {
        return movieApiClient.getAsMovieDTOList(List.of(skyOriginalsImdbCodesList));
    }
}
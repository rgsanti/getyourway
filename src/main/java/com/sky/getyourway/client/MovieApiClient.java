package com.sky.getyourway.client;

import com.sky.getyourway.dto.movie.MovieCollectionDTO;
import com.sky.getyourway.dto.movie.MovieDTO;
import com.sky.getyourway.util.exception.BadRequestException;
import com.sky.getyourway.util.exception.InternalServerErrorException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MovieApiClient {
    @Value("${client.movie.api.token}")
    private String token;
    @Value("${client.movie.api.url}")
    private String url;

    private final WebClient.Builder webClientBuilder;
    private final WebClient webClient;

    public MovieApiClient(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
        this.webClient = webClientBuilder.exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs()
                                .maxInMemorySize(16 * 1024 * 1024)).build())
                .build();
    }

    public Mono<MovieCollectionDTO> getMovie(String imdbCode) {
        Mono<MovieCollectionDTO> response = webClient
                .get()
                .uri(buildUri(imdbCode))
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError,
                        clientResponse -> clientResponse.bodyToMono(String.class).map(
                                body -> new BadRequestException(body)
                        )
                )
                .onStatus(HttpStatus::is5xxServerError,
                        clientResponse -> clientResponse.bodyToMono(String.class).map(
                                body -> new InternalServerErrorException(body)
                        )
                )
                .bodyToMono(MovieCollectionDTO.class);

        return response;
    }

    public Flux<MovieCollectionDTO> getMovie(List<String> imdbCodesList) {
        return Flux.fromIterable(imdbCodesList)
                .flatMap(this::getMovie);
    }

    public List<MovieDTO> getAsMovieDTOList(List<String> imdbCodesList) {
        return getMovie(imdbCodesList).collectList().block()
                .stream()
                .map(res -> res.getData().getMovies().get(0))
                .collect(Collectors.toList());
    }

    public URI buildUri(String imdbCode) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        uriBuilder.queryParam("token", token);
        uriBuilder.queryParam("idIMDB", imdbCode);

        return uriBuilder.build().toUri();
    }
}

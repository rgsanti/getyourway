package com.sky.getyourway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Value("${client.weather.api.token}")
    private String token;
    @Value("${client.weather.api.url}")
    private String url;

    @GetMapping(value="/forecast")
    public String getWeather(@RequestParam double lon, @RequestParam double lat) {
        String uri = buildUri(lon, lat).toString();
        RestTemplate rt = new RestTemplate();
        return rt.getForObject(uri, String.class);
    }

    private URI buildUri(double lon, double lat)
    {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        uriBuilder.queryParam("lon", lon);
        uriBuilder.queryParam("lat", lat);
        uriBuilder.queryParam("appid", token);

        return uriBuilder.build().toUri();
    }
}


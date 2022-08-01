package com.sky.getyourway.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sky.getyourway.entities.Weather;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    @Value("${client.weather.api.token}")
    private String token;
    @Value("${client.weather.api.url}")
    private String url;

    @GetMapping(value="/weather")
    private String getWeather() throws JsonProcessingException, ParseException {
        String uri = buildUri("london").toString();
        RestTemplate rt = new RestTemplate();
        String jsonString = rt.getForObject(uri, String.class);
        JSONObject jo = new JSONObject(jsonString);

        JSONObject ja = (JSONObject) jo.getJSONArray("weather").get(0);

        String description = ja.getString("description");
        String icon = ja.getString("icon");
        String iconLink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

        Weather w1 = new Weather(description, iconLink);

        return w1.toString();
    }

    public URI buildUri(String location)
    {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        uriBuilder.queryParam("q", location);
        uriBuilder.queryParam("appid", token);

        return uriBuilder.build().toUri();
    }
}


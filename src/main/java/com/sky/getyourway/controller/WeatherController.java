package com.sky.getyourway.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sky.getyourway.entities.Weather;
import org.apache.tomcat.util.json.ParseException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;


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

        JSONArray days = jo.getJSONArray("list");
        List<Weather> weatherList = new ArrayList<Weather>();

        for (int i = 0; i < days.length(); i +=8 ) {
            JSONObject day = (JSONObject) days.get(i);
            JSONObject weather = (JSONObject) day.getJSONArray("weather").get(0);

            String description = weather.getString("description");
            String icon = weather.getString("icon");
            String iconLink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            String date = day.getString("dt_txt");


            JSONObject main = day.getJSONObject("main");
            System.out.println(main);
            double temp = main.getInt("temp_max") - 273.00;
            Weather w1 = new Weather(description, iconLink, date, temp);
            System.out.println(w1);
            weatherList.add(w1);
        }

        return weatherList.toString();
    }

    public URI buildUri(String location)
    {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        uriBuilder.queryParam("q", location);
        uriBuilder.queryParam("appid", token);

        return uriBuilder.build().toUri();
    }
}


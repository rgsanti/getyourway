package com.sky.getyourway.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sky.getyourway.entities.Weather;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;


@RestController
@RequestMapping("api/weather")
public class WeatherController {
    @GetMapping(value="/weather")
    private String getWeather() throws JsonProcessingException, ParseException {
        String uri = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=ece83a11b6898ea50ca69822f63cd546";        RestTemplate rt = new RestTemplate();
        String jsonString = rt.getForObject(uri, String.class);
        JSONObject jo = new JSONObject(jsonString);

        JSONObject ja = (JSONObject) jo.getJSONArray("weather").get(0);

        String description = ja.getString("description");
        String icon = ja.getString("icon");
        String iconLink = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

        Weather w1 = new Weather(description, iconLink);
        System.out.println(jo);
        System.out.println(ja);
        System.out.println(description);
        System.out.println(icon);

        return w1.toString();
    }
}


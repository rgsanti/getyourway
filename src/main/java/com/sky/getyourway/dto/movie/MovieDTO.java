package com.sky.getyourway.dto.movie;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDTO {
    private ArrayList<String> languages;
    private String urlIMDB;
    private int year;
    private String releaseDate;
    private ArrayList<MovieDirector> directors;
    private String rating;
    private int runtime;
    private ArrayList<FilmingLocation> filmingLocations;
    private ArrayList<MovieWriter> writers;
    private ArrayList<String> countries;
    private String type;
    private String title;
    private String idIMDB;
    private String rated;
    private String plot;
    private String simplePlot;
    private String votes;
    private String metascore;
    private String urlPoster;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class MovieDirector {
        private String id;
        private String name;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class MovieWriter {
        private String name;
        private String id;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FilmingLocation {
        private String location;
    }

}

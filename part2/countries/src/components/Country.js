import React, { useEffect } from "react";

const Country = ({ country, weather, getWeather }) => {
    useEffect(() => getWeather(country.capital), []);
    return (
        <>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
                {country.languages.map(language => (
                    <li key={language.iso639_2}>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} alt="country flag" width="200" />

            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.temperature}</p>
            <img src={weather.weather_icons[0]} alt="" />
            <p>
                Wind: {weather.wind_speed} kph direction {weather.wind_dir}
            </p>
        </>
    );
};

export default Country;

import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [weather, setWeather] = useState({
        temperature: 0,
        weather_icons: [],
        wind_speed: 0,
        wind_dir: 0
    });

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data));
    }, []);

    const getWeather = capital => {
        axios
            .get(
                "http://api.weatherstack.com/current?access_key=d563bd8ecbde9bce0634c7172687d947&query=" +
                    capital
            )
            .then(response => setWeather(response.data.current));
    };

    const handleInput = event => {
        setFiltered(
            countries.filter(country =>
                country.name.toLowerCase().includes(event.target.value)
            )
        );
    };

    let content = "";

    if (filtered.length > 10) {
        content = <p>Too many matches, specify another filter</p>;
    } else if (filtered.length === 1) {
        content = (
            <Country
                country={filtered[0]}
                weather={weather}
                getWeather={getWeather}
            ></Country>
        );
    } else {
        content = filtered.map(country => (
            <p key={country.name}>
                {country.name}
                <button onClick={() => setFiltered([country])}>Show</button>
            </p>
        ));
    }

    return (
        <div>
            <div>
                <p>
                    Search countries by name: <input onChange={handleInput} />
                </p>
            </div>
            <div>{content}</div>
        </div>
    );
};

export default App;

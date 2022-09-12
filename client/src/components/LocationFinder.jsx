import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
    setChosenCountry,
    setChosenCity,
    setIsCountryFilterNotVisible,
    setIsCityFilterVisible,
    setIsCityFilterNotVisible,
    setIsRestaurantTypeFilterVisible,
    setFoundCity,
    setFoundCountry,
    setLat,
    setLng
} from "../redux/filtersSlice";

export default function LocationFinder() {
    let {
        availableCountries,
        availableCities,
        foundCity,
        foundCountry,
        lat,
        lng,
    } = useSelector((state) => state.filters);

    const dispatch = useDispatch();

    // If the found country is in the list of available countries, dispatch it, switch the visible filters and afterwords remove it (to avoid issues wth manually changing it later)
    useEffect(() => {
        if (
            foundCountry.length > 0 &&
            availableCountries.includes(foundCountry)
        ) {
            // console.log("setting found Country");
            dispatch(setChosenCountry(foundCountry));
            dispatch(setIsCountryFilterNotVisible());
            dispatch(setIsCityFilterVisible());
            dispatch(setFoundCountry(""));
        }
    }, [foundCountry.length > 0 && foundCountry !== "unavailable"]);

    // If the found city is in the list of available cities, dispatch it, switch the visible filters and afterwords remove it (to avoid issues wth manually changing it later)

    useEffect(() => {
        // console.log("Lat in useE", lat, availableCities, foundCity);
        if (availableCities.includes(foundCity)) {
            // console.log('in if');
            dispatch(setChosenCity(foundCity));
            dispatch(setIsCityFilterNotVisible());
            dispatch(setIsRestaurantTypeFilterVisible());
            dispatch(setFoundCity(""));
        } else if (lat !== "" && foundCity != "") {
            // console.log('in else if');
            fetch(`/getnearestcity/${lat}/${lng}`)
                .then((res) => res.json())
                .then((result) => {
                    dispatch(setChosenCountry(result.foundCountry));
                    dispatch(setChosenCity(result.foundCity));
                    dispatch(setIsCityFilterNotVisible());
                    dispatch(setIsRestaurantTypeFilterVisible());
                    dispatch(setFoundCountry(""));
                    dispatch(setFoundCity(""));
                });
        }
    }, [availableCities.length > 0 && foundCity.length > 0 && lat.length > 0]);

    const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    };

    // Extract the gps information, if successful

    function success(pos) {
        const crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        dispatch(setLat(crd.latitude));
        dispatch(setLng(crd.longitude));

        // Fetch the nearest settlement from the external API

        fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${crd.latitude}&longitude=${crd.longitude}`
        )
            .then((res) => res.json())
            .then(({ countryName, city }) => {
                // console.log(countryName, city);

                // If a country was found, dispatch it as the chosen Country

                countryName
                    ? dispatch(setFoundCountry(countryName))
                    : dispatch(setFoundCountry("unavailable"));
                // console.log(availableCities);

                // If a city was found, dispatch it as the chosen city

                city
                    ? dispatch(setFoundCity(city))
                    : dispatch(setFoundCity("unavailable"));
            });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    //Start the location finding process, after user clicked the button

    function getLocation() {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return (
        <>
            <button onClick={() => getLocation()}>
                {" "}
                <img
                    src="/marker-with-white-middle.png"
                    alt=""
                    className="marker-in-button"
                />
                <p>Use my location</p>
            </button>
            {foundCountry && foundCity && (
                <p>
                    You are in {foundCity}, {foundCountry}
                </p>
            )}
        </>
    );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
    setChosenCountry,
    setChosenCity,
    setIsCountryFilterVisible,
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
        chosenCountry,
        chosenCity,
        foundCity,
        foundCountry,
        lat,
        lng
    } = useSelector((state) => state.filters);

    const dispatch = useDispatch();


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
    }, [foundCountry.length > 0 && foundCountry != "unavailable"]);

    // useEffect(() => {
    //     // console.log("test", availableCities, foundCity);
    //     if (foundCity.length > 0 && availableCities.includes(foundCity)) {
    //         dispatch(setChosenCity(foundCity))
    //         dispatch(setIsCityFilterNotVisible());
    //         dispatch(setIsRestaurantTypeFilterVisible());
    //         dispatch(setFoundCity(""));
    //     } else
    // }, [chosenCountry.length > 0 && foundCity.length > 0 && foundCity != "unavailable"])

    useEffect(() => {
        console.log("Lat in useE", lat, availableCities, foundCity);
        if (availableCities.includes(foundCity)) {
            console.log('in if');
            dispatch(setChosenCity(foundCity));
            dispatch(setIsCityFilterNotVisible());
            dispatch(setIsRestaurantTypeFilterVisible());
            dispatch(setFoundCity(""));
        } else if (lat != "") {
            console.log('in else if');
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

    function success(pos) {
        const crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        dispatch(setLat(crd.latitude));
        dispatch(setLng(crd.longitude));

        fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        )
            .then((res) => res.json())
            .then(({ countryName, city }) => {
                console.log(countryName, city);
                countryName
                    ? dispatch(setFoundCountry(countryName))
                    : dispatch(setFoundCountry("unavailable"));
                console.log(availableCities);
                city
                    ? dispatch(setFoundCity(city))
                    : dispatch(setFoundCity("unavailable"));
            });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

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

import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setChosenCountry, setChosenCity, setIsCountryFilterVisible, setIsCountryFilterNotVisible, setIsCityFilterVisible, setIsCityFilterNotVisible, setIsRestaurantTypeFilterVisible, setFoundCity, setFoundCountry } from "../redux/filtersSlice";


export default function LocationFinder() {

    let { availableCountries, availableCities, chosenCountry, chosenCity, foundCity, foundCountry } = useSelector((state) => state.filters);

    const dispatch = useDispatch();
    let [lat, setLat] = useState("");
    let [lng, setLng] = useState("");
    
    useEffect(() => {
        if (foundCountry.length > 0 && availableCountries.includes(foundCountry)) {
            // console.log("setting found Country");
            dispatch(setChosenCountry(foundCountry))
            dispatch(setIsCountryFilterNotVisible());
            dispatch(setIsCityFilterVisible())
            dispatch(setFoundCountry(""));
        } 
    }, [foundCountry.length > 0 && foundCountry != "unavailable"])
    
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
        console.log("useE lat", lat, lng);
            fetch(`/getnearestcity/${lat}/${lng}`)
                .then(res => res.json())
                .then((result) => {
                    console.log("result from calc", result);
                })
    
    }, [lat])


    function getLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            console.log(lat, lng);
        });
    
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
            .then(res => res.json())
            .then(({countryName, city}) => {
                console.log(countryName, city);
                countryName ? dispatch(setFoundCountry(countryName)) : dispatch(setFoundCountry("unavailable"));
                console.log(availableCities);
                city ? dispatch(setFoundCity(city)) : dispatch(setFoundCity("unavailable"));
            })
        
    }

    return(
        <>
            <button onClick={() => getLocation()}> <img src="/marker-with-white-middle.png" alt="" className="marker-in-button" /><p>Use my location</p></button>
            {foundCountry && foundCity && <p>You are in {foundCity}, {foundCountry}</p> }
        </>
    )
}

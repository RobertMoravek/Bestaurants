import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setChosenCountry, setChosenCity, setIsCountryFilterVisible, setIsCountryFilterNotVisible, setIsCityFilterVisible, setIsCityFilterNotVisible, setIsRestaurantTypeFilterVisible, setFoundCity } from "../redux/filtersSlice";


export default function LocationFinder() {
    let [foundCountry, setFoundCountry] = useState("");

    
    let { availableCountries, availableCities, chosenCountry, chosenCity, foundCity } = useSelector((state) => state.filters);

    const dispatch = useDispatch();
    let lat;
    let lng;
    
    useEffect(() => {
        if (foundCountry.length > 0 && availableCountries.includes(foundCountry)) {
            // console.log("setting found Country");
            dispatch(setChosenCountry(foundCountry))
            dispatch(setIsCountryFilterNotVisible());
            dispatch(setIsCityFilterVisible())
            setTimeout(() => {
                // console.log("hmmmm", availableCities);
            }, 1000);
        } 
    }, [foundCountry.length > 0])
    
    useEffect(() => {
        // console.log("test", availableCities, foundCity);
        if (foundCity.length > 0 && availableCities.includes(foundCity)) {
            dispatch(setChosenCity(foundCity))
            dispatch(setIsCityFilterNotVisible());
            dispatch(setIsRestaurantTypeFilterVisible());
        } 
    }, [foundCity])


    function getLocation() {
        // console.log('getting location');
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        });
    
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
            .then(res => res.json())
            .then(({countryName, city}) => {
                // console.log(countryName, city);
                dispatch(setFoundCity(city));
                countryName ? setFoundCountry(countryName) : setFoundCountry("unavailable");
                
            })
        
    }

    return(
        <>
            <button onClick={() => getLocation()}> <img src="/marker-with-white-middle.png" alt="" className="marker-in-button" /><p>Use my location</p></button>
            {foundCountry && foundCity && <p>You are in {foundCity}, {foundCountry}</p> }
        </>
    )
}

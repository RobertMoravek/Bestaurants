import React from "react";
import { useDispatch } from "react-redux";
import { setChosenCountry, setChosenCity } from "../redux/filtersSlice";


export default function LocationFinder() {
    const dispatch = useDispatch();
    let lat;
    let lng;
    
    function getLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        });
    
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
            .then(res => res.json())
            .then(({countryName, city}) => {
                console.log(countryName, city);
                countryName && dispatch(setChosenCountry(countryName));
                city && dispatch(setChosenCity(city));
                console.log('done');
            })
        
    }

    return(
        <>
            <button onClick={getLocation}>Use my location</button>
        </>
    )
}

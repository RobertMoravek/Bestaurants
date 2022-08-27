import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { setChosenCountry, setChosenCity } from "../redux/filtersSlice";


export default function LocationFinder() {
    let [foundCountry, setFoundCountry] = useState("");
    let [foundCity, setFoundCity] = useState("");
    
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
                countryName ? setFoundCountry(countryName) : setFoundCountry("unavailable");
                city ? setFoundCity(city) : setFoundCity("unavailable");
                setTimeout(() => {
                    countryName && dispatch(setChosenCountry(countryName));
                city && dispatch(setChosenCity(city));
                }, 1500);
                
            })
        
    }

    return(
        <>
            <button onClick={getLocation}> <img src="/marker-with-white-middle.png" alt="" className="marker-in-button" /><p>Use my location</p></button>
            {foundCountry && foundCity && <p>You are in {foundCity}, {foundCountry}</p> }
        </>
    )
}

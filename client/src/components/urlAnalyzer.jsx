import React from "react";
import { useLocation } from "react-router-dom"
import { setChosenCountry, setChosenCity, setChosenTypeOfRestaurant, setIsCountryFilterNotVisible, setIsCityFilterNotVisible, setIsRestaurantTypeFilterNotVisible, setIsFiltersNotVisible, setIsUrlAnalyzerActive } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsResultsVisible } from "../redux/resultsSlice";

export default function URLAnalyzer () {

    const dispatch = useDispatch();

    let {availableTypesOfRestaurants, availableCountries, availableCities} = useSelector((state) => state.filters);

    // Dispatch the extracted city, if it's included in the available Cities

    React.useEffect(() => {
        if (availableCities.includes(url[4])) {
            dispatch(setChosenCity(url[4]))
        }
    }, [availableCities])
    
    // Dispatch the extracted type of Restaurant, if it's included in the available Restaurants

    React.useEffect(() => {
        // console.log('this', chosenCountry, chosenCity);
        if (availableTypesOfRestaurants.includes(url[1])) {
            dispatch(setChosenTypeOfRestaurant(url[1]));
            dispatch(setIsCityFilterNotVisible());
            dispatch(setIsCountryFilterNotVisible());
            dispatch(setIsRestaurantTypeFilterNotVisible());
            dispatch(setIsFiltersNotVisible());
            dispatch(setIsResultsVisible());
            dispatch(setIsUrlAnalyzerActive(false));
        }
    }, [availableTypesOfRestaurants])


    // Get the URL and split it into its relevant parts 

    let location = useLocation();
    let url = location.pathname.slice(1).split("-");

    if (url.length === 6 && url[0] === "top10" ) {
        url[1] = ((url[1].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        url[4] = ((url[4].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        url[5] = ((url[5].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        // console.log(url);

        // Dispatch the extracted country, if it's included in the available Countries

        if(availableCountries.includes(url[5])) {
            
            dispatch(setChosenCountry(url[5]));
        }

    }

    


    return (
        <></>
    )
}
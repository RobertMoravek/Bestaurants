import React from "react";
import { useLocation } from "react-router-dom"
import { setChosenCountry, setAvailableCities, setChosenCity, setChosenTypeOfRestaurant, setIsCountryFilterNotVisible, setIsCityFilterNotVisible, setIsRestaurantTypeFilterNotVisible, setIsFiltersNotVisible, setAvailableTypesOfRestaurants, setIsUrlAnalyzerActive } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsResultsVisible } from "../redux/resultsSlice";

export default function URLAnalyzer () {



    const dispatch = useDispatch();

    let {chosenCountry, chosenCity, availableTypesOfRestaurants, availableCountries, availableCities} = useSelector((state) => state.filters);

    React.useEffect(() => {
        if (availableCities.includes(url[4])) {
            dispatch(setChosenCity(url[4]))
        }
    }, [availableCities])
    
    React.useEffect(() => {
        console.log('this', chosenCountry, chosenCity);
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




    let location = useLocation();
    let url = location.pathname.slice(1).split("-");

    if (url.length === 6 && url[0] === "top10" ) {

        url[1] = ((url[1].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        url[4] = ((url[4].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        url[5] = ((url[5].split("+")).map((item) => item = item[0].toUpperCase()+item.slice(1))).join(" ") 
        console.log(url);

        if(availableCountries.includes(url[5])) {
            
            dispatch(setChosenCountry(url[5]));
        }

    }

    


    return (
        <></>
    )
}
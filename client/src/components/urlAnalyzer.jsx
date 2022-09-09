import React from "react";
import { useLocation } from "react-router-dom"
import { setChosenCountry, setAvailableCities, setChosenCity, setChosenTypeOfRestaurant, setIsCountryFilterNotVisible, setIsCityFilterNotVisible, setIsRestaurantTypeFilterNotVisible, setIsFiltersNotVisible, setAvailableTypesOfRestaurants, setIsUrlAnalyzerActive } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsResultsVisible } from "../redux/resultsSlice";

export default function URLAnalyzer () {



    const dispatch = useDispatch();

    let {chosenCountry, chosenCity, availableTypesOfRestaurants, availableCountries, availableCities} = useSelector((state) => state.filters);

    React.useEffect(() => {
        if (  chosenCity.length > 0 && chosenCountry.length > 0 && url.length === 6 && url[0] === "top10") {
            fetch("/searchoptionscities/" + chosenCountry)
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setAvailableCities(data));
                });
            fetch("/searchoptionsrestaurants/" + chosenCountry + "/" + chosenCity)
                .then((res) => res.json())
                .then((data) => {
                    console.log("searchoptionsrestaurants", data);
                    dispatch(setAvailableTypesOfRestaurants(data));
                    // dispatch(setIsCityFilterVisible());
                });
        }
    }, [chosenCity, chosenCountry])

    React.useEffect(() => {
        if (availableTypesOfRestaurants.length > 0 && url.length === 6 && url[0] === "top10") {
            console.log(url[1]);
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

        if(url[1].length > 0 && url[4].length > 0 && url[5].length > 0) {
            dispatch(setChosenCountry(url[5]));
            dispatch(setChosenCity(url[4]));
        }

    }

    


    return (
        <></>
    )
}
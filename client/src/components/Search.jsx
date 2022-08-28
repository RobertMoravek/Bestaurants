import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAvailableCountries,
    setAvailableCities,
    setAvailableTypesOfRestaurants,
    setChosenCountry,
    setChosenCity,
    setChosenTypeOfRestaurant,
    setMin50Box,
    setIsFiltersVisible,
    setIsCountryFilterVisible,
    setIsCityFilterVisible,
    setIsRestaurantTypeFilterVisible,
} from "../redux/filtersSlice";
import { setRestaurantList } from "../redux/resultsSlice";
import LocationFinder from "./LocationFinder";
import Results from "./Results";
import Filters from "./filters";
import { useState } from "react";
import OptionsBar from "./OptionsBar";

export default function Search() {
    const dispatch = useDispatch();

    const { restaurantList, filteredRestaurantList } = useSelector(
        (state) => state.results
    );


    return (
        <>
            <Filters/>

            {restaurantList.length > 0 && <Results />}
        </>
    );
}

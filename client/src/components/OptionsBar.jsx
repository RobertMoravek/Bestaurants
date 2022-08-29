import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
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
    setToggleFiltersVisible,
} from "../redux/filtersSlice";
import { setIsResultsNotVisible } from "../redux/resultsSlice";

export default function OptionsBar() {
    const dispatch = useDispatch();
    const {
        availableCountries,
        chosenCountry,
        availableCities,
        chosenCity,
        availableTypesOfRestaurants,
        chosenTypeOfRestaurant,
        min50Box,
        isCountryFilterVisible,
        isCityFilterVisible,
        isRestaurantFilterVisible,
    } = useSelector((state) => state.filters);
    const { restaurantList, filteredRestaurantList } = useSelector((state) => state.results);


    return (
        <div className="options-bar">
            <div className="chosen-options">
                {chosenCountry.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setIsResultsNotVisible());
                            dispatch(setToggleFiltersVisible());
                            dispatch(setIsCountryFilterVisible());

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCountry}
                    </p>
                )}
                {chosenCity.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setIsResultsNotVisible());
                            dispatch(setToggleFiltersVisible());
                            dispatch(setIsCityFilterVisible());
                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCity}
                    </p>
                )}
                {chosenTypeOfRestaurant.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setIsResultsNotVisible());
                            dispatch(setToggleFiltersVisible());
                            dispatch(setIsRestaurantTypeFilterVisible());
                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenTypeOfRestaurant}
                    </p>
                )}
            </div>
            {chosenTypeOfRestaurant.length > 0 && (
                <div className="min50box">
                    <label htmlFor="min50reviews">50+ reviews only  </label>
                    <input
                        type="checkbox"
                        name="min50reviews"
                        id="min50reviews"
                        onChange={() => dispatch(setMin50Box())}
                    />
                </div>
            )}
        </div>
    )
}
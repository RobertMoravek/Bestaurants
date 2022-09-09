import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    setIsFiltersVisible,
    setIsCountryFilterVisible,
    setIsCityFilterVisible,
    setIsRestaurantTypeFilterVisible,
    setIsCityFilterNotVisible,
    setIsRestaurantTypeFilterNotVisible,
    setIsCountryFilterNotVisible,
    setSelectedPriceLevel,
    setIsUrlAnalyzerActive,
} from "../redux/filtersSlice";
import {setNotMap, setNotList } from "../redux/resultsSlice";

export default function OptionsBar() {
    const dispatch = useDispatch();
    const {
        chosenCountry,
        chosenCity,
        chosenTypeOfRestaurant,
        selectedPriceLevel,
    } = useSelector((state) => state.filters);


    return (
        <div className="options-bar">
                        <a href="/"><img src="/bestaurants-logo-big.png" alt="" className="logo-corner splash transparent"/></a>
            <div className="chosen-options">
                {chosenCountry.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCountryFilterVisible());
                            dispatch(setIsUrlAnalyzerActive(false))
                            // dispatch(setIsCityFilterVisible())

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCountry}
                    </p>
                )}
                {chosenCity.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCityFilterVisible());
                            // dispatch(setAvailableTypesOfRestaurants());
                            dispatch(setIsUrlAnalyzerActive(false));

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCity}
                    </p>
                )}
                </div>
                <div className="chosen-options">
                {chosenTypeOfRestaurant.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterVisible());
                            dispatch(setIsUrlAnalyzerActive(false));

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenTypeOfRestaurant}
                    </p>
                )}
            </div>
        </div>
    )
}
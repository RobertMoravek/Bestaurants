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
    setIsUrlAnalyzerActive,
    setErrorResults,
} from "../redux/filtersSlice";
import {setNotMap, setNotList } from "../redux/resultsSlice";

// Top bar displaying the chosen country, city and type of restaurant

export default function OptionsBar() {
    const dispatch = useDispatch();
    const {
        chosenCountry,
        chosenCity,
        chosenTypeOfRestaurant,
    } = useSelector((state) => state.filters);


    return (
        <div className="options-bar">
                        <a href="/"><img src="/bestaurants-logo-big.png" alt="" className="logo-corner splash transparent"/></a>
            <div className="chosen-options">
                {/* If a country was chosen, display it */}
                {chosenCountry.length > 0 && (
                    <p
                        onClick={() => {
                            // Switch views from results to filters
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCountryFilterVisible());
                            dispatch(setIsUrlAnalyzerActive(false));
                            dispatch(setErrorResults(false))
                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCountry}
                    </p>
                )}
                {/* If a cityy was chosen, display it */}
                {chosenCity.length > 0 && (
                    <p
                        onClick={() => {
                            // Switch views from results to filters
                            
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCityFilterVisible());
                            // dispatch(setAvailableTypesOfRestaurants());
                            dispatch(setIsUrlAnalyzerActive(false));
                            dispatch(setErrorResults(false))

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCity}
                    </p>
                )}
                </div>
                <div className="chosen-options">
                {/* If a type of restaurant was chosen, display it */}

                {chosenTypeOfRestaurant.length > 0 && (
                    <p
                        onClick={() => {
                            // Switch views from results to filters
                            dispatch(setNotMap());
                            
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterVisible());
                            dispatch(setIsUrlAnalyzerActive(false));
                            dispatch(setErrorResults(false));
 
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
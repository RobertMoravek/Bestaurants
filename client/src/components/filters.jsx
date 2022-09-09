import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAvailableCountries,
    setAvailableCities,
    setAvailableTypesOfRestaurants,
    setChosenCountry,
    setChosenCity,
    setChosenTypeOfRestaurant,
    setIsCountryFilterNotVisible,
    setIsCityFilterVisible,
    setIsCityFilterNotVisible,
    setIsRestaurantTypeFilterVisible,
    setIsRestaurantTypeFilterNotVisible,
    setIsFiltersNotVisible,
} from "../redux/filtersSlice";
import { setIsResultsVisible, setRestaurantList, setlist } from "../redux/resultsSlice";
import LocationFinder from "./LocationFinder";


export default function Filters() {
    const dispatch = useDispatch();
    const {
        availableCountries,
        chosenCountry,
        availableCities,
        chosenCity,
        availableTypesOfRestaurants,
        chosenTypeOfRestaurant,
        isCountryFilterVisible,
        isCityFilterVisible,
        isRestaurantTypeFilterVisible,
        isFiltersVisible,
    } = useSelector((state) => state.filters);




    React.useEffect(() => {
        fetch("/searchoptionscountries")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                dispatch(setAvailableCountries(data));
            });
    }, []);

    React.useEffect(() => {
        console.log(availableCountries.includes(chosenCountry));
        if (chosenCountry == "" || !availableCountries.includes(chosenCountry)) {
            return}

        fetch("/searchoptionscities/" + chosenCountry)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setAvailableCities(data));
                setTimeout(() => {
                    
                    // console.log(availableCities);
                }, 1500);
                // dispatch(setIsCountryFilterVisible());
                // dispatch(setIsCityFilterVisible());
            });
    }, [chosenCountry]);

    React.useEffect(() => {
        console.log("about to fetch restaurant types", chosenCountry, chosenCity);
        chosenCity !== "" &&
            (availableCities.includes(chosenCity) &&
            fetch(
                "/searchoptionsrestaurants/" + chosenCountry + "/" + chosenCity
            )
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    dispatch(setAvailableTypesOfRestaurants(data));
                    // dispatch(setIsCityFilterVisible());
                }));
    }, [chosenCountry.length > 0 && availableCities.length > 0 && chosenCity.length > 0]);

    React.useEffect(() => {
        console.log('im ue');
        chosenTypeOfRestaurant !== "" &&
            (availableTypesOfRestaurants.includes(chosenTypeOfRestaurant) &&
            fetch(
                "/searchoptionsresults/" +
                    chosenCountry +
                    "/" +
                    chosenCity +
                    "/" +
                    chosenTypeOfRestaurant
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log("Liste der Restaurants", data);
                    dispatch(setRestaurantList(JSON.parse(data)));
                    // dispatch(setIsRestaurantTypeFilterVisible());
                }));
    }, [chosenTypeOfRestaurant.length > 0 && availableTypesOfRestaurants.length > 0, chosenTypeOfRestaurant]);

    return (
        <>
            {isFiltersVisible && 
                <div className="filters">
                    {isCountryFilterVisible && availableCountries.length > 0 &&
                        <div className="country-filters">
                            <LocationFinder/>
                            {availableCountries.map((item) => {
                                return <button key={item} onClick={() => {
                                    dispatch(setIsCountryFilterNotVisible());
                                    dispatch(setChosenCountry(item));
                                    dispatch(setChosenCity(""));
                                    dispatch(setChosenTypeOfRestaurant(""))
                                    dispatch(setAvailableTypesOfRestaurants([]))
                                    dispatch(setIsCityFilterVisible());
                                    
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                    {isCityFilterVisible && availableCities.length > 0 &&
                        <div className="city-filters">
                            <LocationFinder/>
                            {availableCities.map((item) => {
                                return <button key={item} onClick={() => {
                                    dispatch(setChosenCity(item));
                                    dispatch(setIsCityFilterNotVisible());
                                    dispatch(setChosenTypeOfRestaurant(""));
                                    dispatch(setIsRestaurantTypeFilterVisible());
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                    {isRestaurantTypeFilterVisible && availableTypesOfRestaurants.length > 0 &&
                        <div className="restaurant-type-filters">
                            {availableTypesOfRestaurants.map((item) => {
                                return <button key={item} onClick={() => {
                                    dispatch(setChosenTypeOfRestaurant(item));
                                    dispatch(setIsResultsVisible());
                                    dispatch(setlist());
                                    dispatch(setIsRestaurantTypeFilterNotVisible());
                                    dispatch(setIsFiltersNotVisible())
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                </div> }
        </>
    );
}

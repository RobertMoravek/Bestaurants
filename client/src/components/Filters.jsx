import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAvailableData,
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
    setErrorMessage,
    setSelectedPriceLevel,
    setSelectedMinReviews,
} from "../redux/filtersSlice";
import { setIsResultsVisible, setRestaurantList, setlist } from "../redux/resultsSlice";
import LocationFinder from "./LocationFinder";


export default function Filters() {
    const dispatch = useDispatch();
    const {
        availableData,
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



    // On mount fetch the object of available data from the backend and generate/dispatch a list of available countries out of it
    React.useEffect(() => {
    
        fetch("/availabledata")
            .then((res) => res.json())
            .then((data) => {

                if (Object.keys(data).length > 0) {
                    dispatch(setAvailableData(data));
                    let tempfoundCountries = [];
                    Object.keys(data).map((item) => {tempfoundCountries.push(item)})
                    dispatch(setAvailableCountries(tempfoundCountries));
                } else {
                    dispatch(setErrorMessage(true))
                }
            });
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            document.querySelector(".app").scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            }); 
            
        }, 200);
    }, [isCountryFilterVisible, isCityFilterVisible, isRestaurantTypeFilterVisible])

    // If a country was chosen and it's in the available countries list, then generate the list of available cities out of the original oject and dispatch it
    React.useEffect(() => {
        // console.log(availableCountries.includes(chosenCountry));
        if (chosenCountry == "" || !availableCountries.includes(chosenCountry)) {
            return}
        let tempfoundCities = [];
        Object.keys(availableData[chosenCountry]).map((item) => {tempfoundCities.push(item)})
        dispatch(setAvailableCities(tempfoundCities));

    }, [chosenCountry]);

    // If a city was chosen and it's in the available cities list, then generate the list of available types of Restaurants out of the original oject and dispatch it

    React.useEffect(() => {
        if (chosenCity == "" || !availableCities.includes(chosenCity)) {
            return}
        let tempfoundRestaurantTypes = [];
        Object.keys(availableData[chosenCountry][chosenCity]).map((item) => {
            tempfoundRestaurantTypes.push(item.slice(0, -5));
        });
        dispatch(setAvailableTypesOfRestaurants(tempfoundRestaurantTypes));
    }, [chosenCity]);

    // If a type of restaurant was chosen and it's in the list of available types of restaurants, then fetch the results from the backend and dispatch them
    React.useEffect(() => {
        // console.log('im ue');
        chosenTypeOfRestaurant !== "" &&
            (availableTypesOfRestaurants.includes(chosenTypeOfRestaurant) &&
            fetch(`/searchoptionsresults/${chosenCountry}/${chosenCity}/${chosenTypeOfRestaurant}`)
                .then((res) => res.json())
                .then((data) => {
                    if (Object.keys(data).length > 0) {
                        dispatch(setRestaurantList(JSON.parse(data)));
                    } else {
                        dispatch(setErrorMessage(true))
                    }
                }));
    }, [chosenTypeOfRestaurant]);


    return (
        <>
            {/* If the filters are visible... */}
            {isFiltersVisible && 
                <div className="filters" id="filters">
                    {/* ...and the available country list is populated and visible... */}
                    {isCountryFilterVisible && availableCountries.length > 0 &&
                        <div className="country-filters">
                            {/* Show the location finder button... */}
                            <LocationFinder/>
                            {/* ... and a button for each country */}
                            {availableCountries.map((item) => {
                                return <button key={item} onClick={() => {
                                    // When clicked, dispatch the user's choice, delete all nested choices and switch visible filters
                                    dispatch(setIsCountryFilterNotVisible());
                                    dispatch(setChosenCountry(item));
                                    dispatch(setChosenCity(""));
                                    dispatch(setChosenTypeOfRestaurant(""))
                                    dispatch(setAvailableTypesOfRestaurants([]))
                                    dispatch(setIsCityFilterVisible());
                                    dispatch(setSelectedPriceLevel(null));
                                    dispatch(setSelectedMinReviews(10));
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                    {/* ...and the available city list is populated and visible... */}
                    {isCityFilterVisible && availableCities.length > 0 &&
                        <div className="city-filters">
                            {/* Show the location finder button... */}
                            <LocationFinder/>
                            {/* ... and a button for each city */}
                            {availableCities.map((item) => {
                                return <button key={item} onClick={() => {
                                    // When clicked, dispatch the user's choice, delete all nested choices and switch visible filters
                                    dispatch(setChosenCity(item));
                                    dispatch(setIsCityFilterNotVisible());
                                    dispatch(setChosenTypeOfRestaurant(""));
                                    dispatch(
                                        setIsRestaurantTypeFilterVisible()
                                    );
                                    dispatch(setSelectedPriceLevel(null));
                                    dispatch(setSelectedMinReviews(10));
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                    {/* ...and the available city list is populated and visible... */}
                    {isRestaurantTypeFilterVisible && availableTypesOfRestaurants.length > 0 &&
                        <div className="restaurant-type-filters">
                            {/* Show a button for each type of restaurant */}
                            {availableTypesOfRestaurants.map((item) => {
                                return <button key={item} onClick={() => {
                                    // When clicked, dispatch the user's choice and hide all filters to make space for the results
                                    dispatch(setChosenTypeOfRestaurant(item));
                                    dispatch(setIsResultsVisible());
                                    dispatch(setlist());
                                    dispatch(setIsRestaurantTypeFilterNotVisible());
                                    dispatch(setIsFiltersNotVisible())
                                    dispatch(setSelectedPriceLevel(null));
                                    dispatch(setSelectedMinReviews(10));
                                }}>{item}</button>
                            }
                            )}
                        </div> }
                </div> }
        </>
    );
}

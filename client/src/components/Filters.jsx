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




    React.useEffect(() => {
        fetch("/availabledata")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                dispatch(setAvailableData(data));
                let tempfoundCountries = [];
                Object.keys(data).map((item) => {tempfoundCountries.push(item)})
                dispatch(setAvailableCountries(tempfoundCountries));
            });
    }, []);

    // React.useEffect(() => {
    //     fetch("/searchoptionscountries")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             // console.log(data);
    //             dispatch(setAvailableCountries(data));
    //         });
    // }, []);

    React.useEffect(() => {
        // console.log(availableCountries.includes(chosenCountry));
        if (chosenCountry == "" || !availableCountries.includes(chosenCountry)) {
            return}
        let tempfoundCities = [];
        Object.keys(availableData[chosenCountry]).map((item) => {tempfoundCities.push(item)})
        dispatch(setAvailableCities(tempfoundCities));

    }, [chosenCountry]);

    React.useEffect(() => {
        if (chosenCity == "" || !availableCities.includes(chosenCity)) {
            return}
        let tempfoundRestaurantTypes = [];
        Object.keys(availableData[chosenCountry][chosenCity]).map((item) => {
            tempfoundRestaurantTypes.push(item.slice(0, -5));
        });
        dispatch(setAvailableTypesOfRestaurants(tempfoundRestaurantTypes));
    }, [chosenCity]);

    React.useEffect(() => {
        // console.log('im ue');
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
                    // console.log("Liste der Restaurants", data);
                    dispatch(setRestaurantList(JSON.parse(data)));
                    // dispatch(setIsRestaurantTypeFilterVisible());
                }));
    }, [chosenTypeOfRestaurant]);

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

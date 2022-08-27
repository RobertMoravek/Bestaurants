import React from "react";
import {useSelector, useDispatch} from "react-redux"
import {
    setAvailableCountries,
    setAvailableCities,
    setAvailableTypesOfRestaurants,
    setChosenCountry,
    setChosenCity,
    setChosenTypeOfRestaurant
} from "../redux/filtersSlice";
import { setRestaurantList } from "../redux/resultsSlice";
import {useNavigate} from "react-router-dom";
import LocationFinder from "./LocationFinder";
import Results from "./Results";
import { useState } from "react";


export default function Search () {

    const dispatch = useDispatch();
    const { availableCountries,
        chosenCountry,
        availableCities,
        chosenCity,
        availableTypesOfRestaurants,
        chosenTypeOfRestaurant} = useSelector(state => state.filters);
    const { restaurantList, filteredRestaurantList } = useSelector(state => state.results)

    let [isCountryFilterVisible, setIsCountryFilterVisible] = useState(true);
    let [isCityFilterVisible, setIsCityFilterVisible] = useState(true);
    let [isRestaurantFilterVisible, setIsRestaurantFilterVisible] = useState(true);

    React.useEffect(() => {
        fetch("/searchoptionscountries")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableCountries(data))

            });
    }, []);

    React.useEffect(() => {
        chosenCountry != "" && availableCountries.includes(chosenCountry) &&
        fetch("/searchoptionscities/" + chosenCountry)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableCities(data));
                setIsCountryFilterVisible(false);
            });
    }, [chosenCountry]);

    React.useEffect(() => {
    chosenCity != "" && availableCities.includes(chosenCity) &&
        fetch("/searchoptionsrestaurants/" + chosenCountry + "/" + chosenCity)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableTypesOfRestaurants(data));
                setIsCityFilterVisible(false)
            });
    }, [chosenCity]);

    React.useEffect(() => {
    chosenTypeOfRestaurant != "" && availableTypesOfRestaurants.includes(chosenTypeOfRestaurant) &&
        fetch("/searchoptionsresults/" + chosenCountry + "/" + chosenCity + "/" + chosenTypeOfRestaurant)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setRestaurantList(JSON.parse(data)));
                setIsRestaurantFilterVisible(false);
            });
    }, [chosenTypeOfRestaurant]);


    return (
        <>  
            {isCountryFilterVisible && <LocationFinder/>}    
            <div className="filters">
                <div className="chosen-options" >
                    {!isCountryFilterVisible && <p onClick={() => {setIsCountryFilterVisible(true); setIsCityFilterVisible(false); setIsRestaurantFilterVisible(false)}}>› {chosenCountry}</p>}
                    {!isCityFilterVisible && <p onClick={() => {setIsCountryFilterVisible(false); setIsCityFilterVisible(true); setIsRestaurantFilterVisible(false)}}>› {chosenCity}</p>}
                    {!isRestaurantFilterVisible && <p onClick={() => {setIsCountryFilterVisible(false); setIsCityFilterVisible(false); setIsRestaurantFilterVisible(true)}}>› {chosenTypeOfRestaurant}</p>}
                </div>
                <div className="countries-filter">
                    {availableCountries.length > 0 && isCountryFilterVisible && availableCountries.map(item => chosenCountry== item? <button value={item} key={item} onClick={e => dispatch(setChosenCountry(e.currentTarget.value))} className="chosen-filter-button">{item}</button> : <button value={item} key={item} onClick={e => dispatch(setChosenCountry(e.currentTarget.value))}>{item}</button>)}       
                </div>
                <div className="cities-filter">   
                    {availableCities.length > 0 && isCityFilterVisible && availableCities.map(item => chosenCity==item? <button value={item} key={item} onClick={e => dispatch(setChosenCity(e.currentTarget.value))}  className="chosen-filter-button">{item}</button> : <button value={item} key={item} onClick={e => dispatch(setChosenCity(e.currentTarget.value))}>{item}</button>)}       
                </div>
                <div className="types-filter"> 
                    {availableTypesOfRestaurants.length > 0 && isRestaurantFilterVisible && availableTypesOfRestaurants.map(item => chosenTypeOfRestaurant == item ? <button value={item} key={item} onClick={e => dispatch(setChosenTypeOfRestaurant(e.currentTarget.value))}  className="chosen-filter-button">{item}</button> : <button value={item} key={item} onClick={e => dispatch(setChosenTypeOfRestaurant(e.currentTarget.value))}>{item}</button>)}
                </div>
            </div>
            
            {restaurantList.length > 0 && <Results/>}
        </>
    );

}


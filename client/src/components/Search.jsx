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


export default function Search () {

    const dispatch = useDispatch();
    const { availableCountries,
        chosenCountry,
        availableCities,
        chosenCity,
        availableTypesOfRestaurants,
        chosenTypeOfRestaurant} = useSelector(state => state.filters)

    React.useEffect(() => {
        fetch("/searchoptionscountries")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableCountries(data))

            });
    }, []);

    React.useEffect(() => {
        chosenCountry != "" &&
        fetch("/searchoptionscities/" + chosenCountry)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableCities(data));
            });
    }, [chosenCountry]);

    React.useEffect(() => {
    chosenCity != "" &&
        fetch("/searchoptionsrestaurants/" + chosenCountry + "/" + chosenCity)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(setAvailableTypesOfRestaurants(data));
            });
    }, [chosenCity]);

    React.useEffect(() => {
    chosenTypeOfRestaurant != "" &&
        fetch("/searchoptionsresults/" + chosenCountry + "/" + chosenCity + "/" + chosenTypeOfRestaurant)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setRestaurantList(JSON.parse(data)));
            });
    }, [chosenTypeOfRestaurant]);

    let navigate = useNavigate();
    chosenTypeOfRestaurant != "" && navigate("/results")

    return (
        <>     
            {availableCountries.length > 0 && availableCountries.map(item => <button value={item} key={item} onClick={e => dispatch(setChosenCountry(e.currentTarget.value))}>{item}</button>)}       
            {availableCities.length > 0 && availableCities.map(item => <button value={item} key={item} onClick={e => dispatch(setChosenCity(e.currentTarget.value))}>{item}</button>)}       
            {availableTypesOfRestaurants.length > 0 && availableTypesOfRestaurants.map(item => <button value={item} key={item} onClick={e => dispatch(setChosenTypeOfRestaurant(e.currentTarget.value))}>{item}</button>)}
        </>
    );

}


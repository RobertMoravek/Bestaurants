import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";
import { useNavigate} from "react-router-dom";
import Map from "./Map";
import ResultsList from "./ResultsList";
import ViewSelector from "./ViewSelector";
import PriceSelector from "./PriceSelector";



export default function Results() {
    const { restaurantList, isResultsVisible, listView } = useSelector((state) => state.results);
    const { min50Box, chosenCountry, chosenCity, chosenTypeOfRestaurant, selectedPriceLevel } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

        React.useEffect(() => {
            console.log('selectedPrizeLevel in Results', typeof selectedPriceLevel);
            if (restaurantList.length > 0) {
                if (min50Box) {
                    if (selectedPriceLevel) {
                        dispatch(setFilteredRestaurantList(((restaurantList.filter(item => item.user_ratings_total > 50)).filter(item => String(item.price_level) == selectedPriceLevel)).slice(0, 10)))
                        
                    } else {
                        dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 50)).slice(0, 10)))
                    }
                } else {
                    console.log(selectedPriceLevel);
                    if (selectedPriceLevel) {
                        dispatch(setFilteredRestaurantList(((restaurantList.filter(item => item.user_ratings_total > 5)).filter(item => String(item.price_level) == selectedPriceLevel)).slice(0, 10))) 
                    } else {
                        dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 5)).slice(0, 10)))
                    }
                }
        }
                    let chosenCountryLC = ((chosenCountry.split(" ")).map((item) => item = item.toLowerCase())).join("+")
                    let chosenCityLC = ((chosenCity.split(" ")).map((item) => item = item.toLowerCase())).join("+")
                    let chosenTypeOfRestaurantLC = ((chosenTypeOfRestaurant.split(" ")).map((item) => item = item.toLowerCase())).join("+")
                    navigate(`/top10-${chosenTypeOfRestaurantLC}-restaurants-in-${chosenCityLC}-${chosenCountryLC}`)
                    
                
        },
        [restaurantList, min50Box, selectedPriceLevel]);

    return (
        <>  
            {isResultsVisible && 
                <div className="results">
                    <Map/>
                    { listView && <ResultsList/>}
                    <ViewSelector/>
                    <PriceSelector/>
                </div>}

        </>
    );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";
import { useNavigate, useLocation} from "react-router-dom";
import Map from "./Map";
import ResultsList from "./ResultsList";
import ViewSelector from "./ViewSelector";
import { setChosenTypeOfRestaurant } from "../redux/filtersSlice";


export default function Results() {
    const { restaurantList, filteredRestaurantList, mapView, isResultsVisible, listView } = useSelector((state) => state.results);
    const { min50Box, chosenCountry, chosenCity, chosenTypeOfRestaurant } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const myApiKey = "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow";

        React.useEffect(() => {
            restaurantList.length > 0 && (
                !min50Box ? 
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 5)).slice(0, 10))) :
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 50)).slice(0, 10)))
                    )
                    let chosenCountryLC = ((chosenCountry.split(" ")).map((item) => item = item[0].toLowerCase()+item.slice(1))).join("+")
                    let chosenCityLC = ((chosenCity.split(" ")).map((item) => item = item[0].toLowerCase()+item.slice(1))).join("+")
                    let chosenTypeOfRestaurantLC = ((chosenTypeOfRestaurant.split(" ")).map((item) => item = item[0].toLowerCase()+item.slice(1))).join("+")
                    navigate(`/top10-${chosenTypeOfRestaurantLC}-restaurants-in-${chosenCityLC}-${chosenCountryLC}`)
                    
                
        },
        [restaurantList, min50Box]);

    return (
        <>  
            {isResultsVisible && <div className="results">

            <Map/>
            { listView && <ResultsList/>}
                <ViewSelector/>
            </div>}

        </>
    );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import ResultsList from "./ResultsList";
import ViewSelector from "./ViewSelector";

export default function Results() {
    const { restaurantList, filteredRestaurantList, mapView, isResultsVisible } = useSelector((state) => state.results);
    const { min50Box } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate;


    const myApiKey = "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM";

        React.useEffect(() => {
            restaurantList.length > 0 && (
                !min50Box ? 
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 5)).slice(0, 10))) :
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 50)).slice(0, 10)))

            )
                
        },
        [restaurantList, min50Box]);

    return (
        <>  
            {isResultsVisible && <div className="results">

            <Map/>
            { !mapView && <ResultsList/>}
                <ViewSelector/>
            </div>}

        </>
    );
}

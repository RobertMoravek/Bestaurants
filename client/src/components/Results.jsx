import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import ResultsList from "./ResultsList";
import ViewSelector from "./ViewSelector";

export default function Results() {
    const { restaurantList, filteredRestaurantList, mapView } = useSelector((state) => state.results);
    const { min50Box } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate;


    const myApiKey = "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM";


    return (
        <>  
            <div className="results">

            <Map/>
            { !mapView && <ResultsList/>}
            <ViewSelector/>
            </div>

        </>
    );
}

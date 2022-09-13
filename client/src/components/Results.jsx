import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";
import { useNavigate} from "react-router-dom";
import Map from "./Map";
import ResultsList from "./ResultsList";
import ViewSelector from "./MapViewSelector";
import PriceSelector from "./PriceSelector";
import ReviewNumSelector from "./ReviewNumSelector";



export default function Results() {
    const { restaurantList, isResultsVisible, listView } = useSelector((state) => state.results);
    const { chosenCountry, chosenCity, chosenTypeOfRestaurant, selectedPriceLevel, selectedMinReviews } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate();

        React.useEffect(() => {

            // Create a filtered list of restaurants according to the selected (or not selected) values
            if (restaurantList.length > 0) {
                if (selectedPriceLevel) {
                    dispatch(setFilteredRestaurantList(((restaurantList.filter(item => item.user_ratings_total > selectedMinReviews)).filter(item => String(item.price_level) == selectedPriceLevel)).slice(0, 10)))
                } else {
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > selectedMinReviews)).slice(0, 10)))
                }

            }

            // Create the url from the chosen variables and push them into the history
            let chosenCountryLC = ((chosenCountry.split(" ")).map((item) => item = item.toLowerCase())).join("+")
            let chosenCityLC = ((chosenCity.split(" ")).map((item) => item = item.toLowerCase())).join("+")
            let chosenTypeOfRestaurantLC = ((chosenTypeOfRestaurant.split(" ")).map((item) => item = item.toLowerCase())).join("+")
            navigate(`/top10-${chosenTypeOfRestaurantLC}-restaurants-in-${chosenCityLC}-${chosenCountryLC}`)
        },
        [restaurantList, selectedMinReviews, selectedPriceLevel]);

    return (
        <>  
            {/* If the results are visible... */}
            {isResultsVisible && 
                <div className="results">
                    {/* Display the map component (even if it's invisibleat first), since it needs to be initialized for some reason  */}
                    <Map/>
                    {/* If the listview is active, show a list of the results */}
                    { listView && <ResultsList/>}
                    <ViewSelector/>
                    <PriceSelector/>
                    <ReviewNumSelector/>
                </div>}

        </>
    );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantList, setFilteredRestaurantList } from "../redux/resultsSlice";
import { setChosenTypeOfRestaurant } from "../redux/filtersSlice"
import { useNavigate } from "react-router-dom";
import Home from "./Map";

export default function Results() {
    const { restaurantList, filteredRestaurantList } = useSelector((state) => state.results);
    const { chosenCountry, chosenCity, chosenTypeOfRestaurant } = useSelector(
        (state) => state.filters
    );
    const dispatch = useDispatch();
    const navigate = useNavigate;

    const [min50Box, setMin50Box] = React.useState(false);

    React.useEffect(() => {
            restaurantList.length > 0 && (
                !min50Box ? 
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 5)).slice(0, 10))) :
                    dispatch(setFilteredRestaurantList((restaurantList.filter(item => item.user_ratings_total > 50)).slice(0, 10)))

            )
                
        },
        [restaurantList, min50Box]);


    filteredRestaurantList.length > 0 && console.log(filteredRestaurantList);


    return (
        <>
            <h1>
                Results for {chosenTypeOfRestaurant} in {chosenCity},{" "}
                {chosenCountry}
            </h1>
            <Home/>
            <label htmlFor="min50reviews">Only show restaurants with more than 50 reviews</label>
            <input type="checkbox" name="min50reviews" id="min50reviews" onChange={() => setMin50Box(!min50Box)} />
            <ol>
                {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item) => {
                        return (
                            <li key={item.place_id}>
                                <div className="restaurant-container">
                                    <h2>{item.name}</h2>
                                    <p>rating: {item.rating}</p>
                                    <p>
                                        Number of ratings:{" "}
                                        {item.user_ratings_total}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
            </ol>
        </>
    );
}

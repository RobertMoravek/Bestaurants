import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurantList, setFilteredRestaurantList } from "../redux/resultsSlice";
import { setChosenTypeOfRestaurant } from "../redux/filtersSlice"
import { useNavigate } from "react-router-dom";
import Map from "./Map";

export default function Results() {
    const { restaurantList, filteredRestaurantList } = useSelector((state) => state.results);
    const { chosenCountry, chosenCity, chosenTypeOfRestaurant } = useSelector(
        (state) => state.filters
    );
    const dispatch = useDispatch();
    const navigate = useNavigate;

    const [min50Box, setMin50Box] = React.useState(false);

    const myApiKey = "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM";

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
            <Map/>
            <label htmlFor="min50reviews">Only show restaurants with more than 50 reviews</label>
            <input type="checkbox" name="min50reviews" id="min50reviews" onChange={() => setMin50Box(!min50Box)} />
            <ol>
                {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item) => {
                        let encodedName = encodeURIComponent(item.name);
                        let imgUrl= item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${item.photos[0].photo_reference}&key=${myApiKey}` : "";
                        let linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${item.place_id}`;
                        let routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${item.place_id}`;

                        return (
                            <li key={item.place_id}>
                                <div className="restaurant-container">
                                    {imgUrl.length > 0 && <img src={imgUrl} alt="" />}
                                    <h2>{item.name}</h2>
                                    <p>rating: <div className="rating-star">{item.rating}</div></p>
                                    <p>Number of reviews: {item.user_ratings_total}
                                    <p>{item.formatted_address}</p>
                                    <a href={linkUrl}>Link</a>
                                    <a href={routeUrl}>Route</a>
                                    </p>
                                </div>
                            </li>
                        );
                    })}
            </ol>
        </>
    );
}

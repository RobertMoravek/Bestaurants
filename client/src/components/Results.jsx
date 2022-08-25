import React from "react";
import { useSelector } from "react-redux";

export default function Results() {
    const { restaurantList } = useSelector((state) => state.results);
    const { chosenCountry, chosenCity, chosenTypeOfRestaurant } = useSelector(
        (state) => state.filters
    );
    const [filteredRestaurantList, setFilteredRestaurantList] = React.useState([]);
    const [filteredRestaurantList, setFilteredRestaurantList] = React.useState([]);

    React.useEffect(() => {
            restaurantList.length > 0 &&
                setFilteredRestaurantList(restaurantList.slice(0, 10));
        },
        [restaurantList]);


    filteredRestaurantList.length > 0 && console.log(filteredRestaurantList);
    return (
        <>
            <h1>
                Results for {chosenTypeOfRestaurant} in {chosenCity},{" "}
                {chosenCountry}
            </h1>
            <input type="checkbox" name="min50reviews" id="min50reviews" onChange={(e) => {e.target.checked && console.log("checked")}} />
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

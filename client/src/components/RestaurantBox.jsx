import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedMarker,
} from "../redux/resultsSlice";



export default function RestaurantBox() {
    const {filteredRestaurantList, selectedMarker } =
        useSelector((state) => state.results);
    
    const dispatch = useDispatch();

    return (
        <>
            {/* If a marker was selected and there is a list of results, show the restaurant info box */}
            {selectedMarker &&
                filteredRestaurantList.map((item, index) => {
                    let num = filteredRestaurantList.indexOf(item) + 1;
                    if (selectedMarker === num) {
                        // Encode the name for linking and create the links to google maps
                        let encodedName = encodeURIComponent(item.name);
                        let linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${item.place_id}`;
                        let routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${item.place_id}`;

                        return (
                            <div className="restaurant-box" key={index}>
                                <span
                                    className="restaurant-box-closer"
                                    // Reset the selected marker, when you close the restaurant box
                                    onClick={() => {
                                        dispatch(setSelectedMarker(null));
                                    }}
                                >
                                    +
                                </span>
                                {/* Display the restaurant data and links */}
                                <h2 className="restaurant-hl">
                                    {num}. {item.name}
                                </h2>
                                <div className="restaurant-info">
                                    <div className="restaurant-left">
                                        <div className="rating-star">
                                            {item.rating}
                                        </div>
                                        <p>{item.user_ratings_total} reviews</p>
                                    </div>
                                    <div className="restaurant-right">
                                        {item.formatted_address
                                            .split(",")
                                            .map((item) => (
                                                <p>{item}</p>
                                            ))}
                                    </div>
                                </div>
                                <div className="restaurant-links">
                                    <a href={linkUrl} target="new">
                                        <button className="link-button">
                                            <img
                                                src="/reviews.png"
                                                alt="Route"
                                                className="route-icon"
                                            />
                                            <p>Reviews</p>
                                        </button>
                                    </a>
                                    <a href={routeUrl}>
                                        <button className="link-button">
                                            <img
                                                src="/route.png"
                                                alt="Route"
                                                className="route-icon"
                                            />
                                            <p>Route</p>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        );
                    }
                })}
        </>
    );
}

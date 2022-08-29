import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFilteredRestaurantList,
    setSelectedMarker,
} from "../redux/resultsSlice";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import ViewSelector from "./ViewSelector";

export default function RestaurantBox() {
    const { restaurantList, filteredRestaurantList, mapView, selectedMarker } =
        useSelector((state) => state.results);
    const { min50Box } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const navigate = useNavigate;

    const myApiKey = "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow";

    React.useEffect(() => {
        restaurantList.length > 0 &&
            (!min50Box
                ? dispatch(
                      setFilteredRestaurantList(
                          restaurantList
                              .filter((item) => item.user_ratings_total > 5)
                              .slice(0, 10)
                      )
                  )
                : dispatch(
                      setFilteredRestaurantList(
                          restaurantList
                              .filter((item) => item.user_ratings_total > 50)
                              .slice(0, 10)
                      )
                  ));
    }, [restaurantList, min50Box]);


    return (
        <>
            {selectedMarker &&
                filteredRestaurantList.map((item) => {
                    let num = filteredRestaurantList.indexOf(item) + 1;
                    if (selectedMarker == num) {
                        let encodedName = encodeURIComponent(item.name);
                        let imgUrl = item.photos
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${item.photos[0].photo_reference}&key=${myApiKey}`
                            : "";
                        let linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${item.place_id}`;
                        let routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${item.place_id}`;

                        return (
                            <div className="restaurant-box" key={item.place_id}>
                                <span
                                    className="restaurant-box-closer"
                                    onClick={() => {
                                        dispatch(setSelectedMarker(null));
                                    }}
                                >
                                    +
                                </span>
                                {/* {imgUrl.length > 0 && <img src={imgUrl} alt="" className="restaurant-title-pic"/>} */}
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

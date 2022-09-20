import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {setFilteredRestaurantList} from "../redux/resultsSlice";

export default function ResultsList() {
    const { filteredRestaurantList, mapView } = useSelector((state) => state.results);
    const dispatch = useDispatch();


    let apiKey;
    if (process.env.NODE_ENV == "production") {
        apiKey = process.env.apiKeyPlaces;
    } else {
        apiKey = require("./secrets.json").apiKeyPlaces;
    }

    return (

                <div className="results-list">
                    {/* For every restaurant in the filtered list... */}
                    {!mapView && filteredRestaurantList.length > 0 &&
                        filteredRestaurantList.map((item, index) => {
                            // Encode the name for linking and create the links to google maps
                            let encodedName = encodeURIComponent(item.name);
                            let imgUrl= item.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${item.photos[0].photo_reference}&key=AIzaSyAvzBYUNfveCKoCxAsz9tPRlI2D3OUpCEI` : "";
                            let linkUrl = `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${item.place_id}`;
                            let routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${item.place_id}`;
                            let num = filteredRestaurantList.indexOf(item)+1;
                            let coinUrl = "/coin" + item.price_level + ".png";

                            return (
                                // Display the restaurant data and links
                                <div className="restaurant-container" key={item.place_id}>
                                    {imgUrl.length > 0 && <img src={imgUrl} alt="" className="restaurant-title-pic"/>}
                                    <h2 className="restaurant-hl">{num}. {item.name} <img src={coinUrl} alt={item.price_level} className="coin-img"/></h2>
                                    <div className="restaurant-info">
                                        <div className="restaurant-left">
                                            <div className="rating-star">{item.rating}</div>
                                            <p>{item.user_ratings_total} Reviews</p>
                                        </div>
                                        <div className="restaurant-right">
                                            {item.formatted_address.split(",").map((item, index) => <p key={index}>{item}</p>)}
                                        </div>
                                    </div>
                                    <div className="restaurant-links">
                                        <a href={linkUrl} target="new"><button className="link-button"><img src="/reviews.png" alt="Route" className="route-icon" /><p>Reviews</p></button></a>
                                        <a href={routeUrl} target="new"><button className="link-button"><img src="/route.png" alt="Route" className="route-icon" /><p>Route</p></button></a>
                                    </div>

                                    
                                </div>
                            )
                        })}

                </div>

    );
}

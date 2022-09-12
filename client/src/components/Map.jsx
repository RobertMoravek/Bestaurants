import React from "react";
import {
    GoogleMap,
    MarkerF,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import RestaurantBox from "./RestaurantBox";
import { setSelectedMarker } from "../redux/resultsSlice";
import { useDispatch } from "react-redux";


// Styling for the Map object (has to be here, instead of css)
const containerStyle = {
    width: "100%",
    height: "100%",
};

// Default psoition for Map to show
const center = {
    lat: 52.000,
    lng: 13.300,
};


export default function Map() {

    const { filteredRestaurantList, mapView, selectedMarker } = useSelector((state) => state.results);
    const dispatch = useDispatch();
    
    // Seems to initialize the Maps API
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow",
    });


    const [map, setMap] = React.useState(null);


    // Even though the code is virtually the same, 
    React.useEffect(() => {        
        // Creates new bounds for the Map
        window.google && (function () {
            const bounds = new window.google.maps.LatLngBounds();

        // Goes through each result and extends the bounds with the coordinates of that result
        filteredRestaurantList.length > 0 &&
            filteredRestaurantList.map((item) => {
                const latLng = new window.google.maps.LatLng(item.geometry.location);
                bounds.extend(latLng);
                map.fitBounds(bounds);
                setMap(map);
            });
        })();
        
    }, [filteredRestaurantList, mapView, selectedMarker])

        
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();

        filteredRestaurantList.length > 0 && filteredRestaurantList.map(item => {
            const latLng = new window.google.maps.LatLng(item.geometry.location);
            bounds.extend(latLng);
            // console.log("bounds", bounds);        
            map.fitBounds(bounds);
                setMap(map);
        })
            // const bounds = new window.google.maps.LatLngBounds(center);
            // map.fitBounds(bounds);
            // setMap(map);


    }, [filteredRestaurantList, selectedMarker]);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div className={mapView ? "map-box" : "invisible"}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true

                }}
            >
                {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item, index) => {
                        return (
                            <>
                                {index + 1 === selectedMarker && (
                                    <MarkerF
                                        // key={item.place_id}
                                        position={item.geometry.location}
                                        title="Test"
                                        onClick={() => {
                                            dispatch(
                                                setSelectedMarker(index + 1)
                                            );
                                        }}
                                        icon={{
                                            strokeColor: "#ffffff",
                                            strokeWeight: 3,
                                            scaledSize:
                                                new window.google.maps.Size(
                                                    42,
                                                    56
                                                ),
                                            url: `/marker${index + 1}.png`,
                                            fillColor: "#003952",
                                            fillOpacity: 1.0,
                                        }}
                                    />
                                )}
                                {index + 1 !== selectedMarker && (
                                    <MarkerF
                                        // key={index+1}
                                        position={item.geometry.location}
                                        title={item.name}
                                        onClick={() => {
                                            dispatch(
                                                setSelectedMarker(index + 1)
                                            );
                                        }}
                                        icon={{
                                            strokeColor: "#ffffff",
                                            strokeWeight: 3,
                                            scaledSize:
                                                new window.google.maps.Size(
                                                    30,
                                                    40
                                                ),
                                            url: `/marker${index + 1}.png`,
                                            fillColor: "#003952",
                                            fillOpacity: 1.0,
                                        }}
                                    />
                                )}
                            </>
                        );
                    })}
            </GoogleMap>
            {selectedMarker && <RestaurantBox />}
        </div>
    ) : (
        <></>
    );


}

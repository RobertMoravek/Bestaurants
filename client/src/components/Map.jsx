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


let apiKey = "AIzaSyDcicvAKbdM9K8rnN3vKUSziYzhKAcySgo";


// Styling for the Map object (has to be here, instead of css)zz
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
        googleMapsApiKey: apiKey,
    });


    const [map, setMap] = React.useState(null);


    // Even though the code is virtually the same, this seems to be neccessary to get the map to center and zoom on the markers
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

    // This does everything except the centering and zooming. Why?
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();

        filteredRestaurantList.length > 0 && filteredRestaurantList.map(item => {
            const latLng = new window.google.maps.LatLng(item.geometry.location);
            bounds.extend(latLng);
            // console.log("bounds", bounds);        
            map.fitBounds(bounds);
                setMap(map);
        })
    }, [filteredRestaurantList, selectedMarker]);


    // When component unmounts, set Map to null
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        // Component can't be unmounted when switching to list view, or it will not work properly, when switching back. Making it invisible instead.
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
                {/* Create a marker for every restaurant */}
                {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item, index) => {
                        return (
                            <>
                                {/* If it's the selected marker... */}
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
                                            // ... make it bigger 
                                            scaledSize:
                                                new window.google.maps.Size(42,56),
                                            // Every marker has its own image
                                            url: `/marker${index + 1}.png`,
                                            fillColor: "#003952",
                                            fillOpacity: 1.0,
                                        }}
                                    />
                                )}
                                {/* If it's not the selected marker */}
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

            {/* If you selected a marker, show the corresponding info in a component */}
            {selectedMarker && <RestaurantBox />}
        </div>
    ) : (
        <></>
    );


}

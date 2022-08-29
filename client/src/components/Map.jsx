import React from "react";
import { useMemo } from "react";
import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import RestaurantBox from "./RestaurantBox";
import { setSelectedMarker } from "../redux/resultsSlice";
import { useDispatch } from "react-redux";


const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 52.000,
    lng: 13.300,
};


export default function Map() {

    const { filteredRestaurantList, mapView, selectedMarker } = useSelector((state) => state.results);
    const { min50Box } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM",
    });


    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        
        window.google && (function () {
            const bounds = new window.google.maps.LatLngBounds();

        filteredRestaurantList.length > 0 &&
            filteredRestaurantList.map((item) => {
                const latLng = new window.google.maps.LatLng(
                    item.geometry.location
                );
                bounds.extend(latLng);
                console.log("bounds", bounds);
                map.fitBounds(bounds);
                setMap(map);
            });
        })();
        
    }, [filteredRestaurantList, mapView, min50Box])

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();

        filteredRestaurantList.length > 0 && filteredRestaurantList.map(item => {
            const latLng = new window.google.maps.LatLng(item.geometry.location);
            bounds.extend(latLng);
            console.log("bounds", bounds);        
            map.fitBounds(bounds);
                setMap(map);
        })
            // const bounds = new window.google.maps.LatLngBounds(center);
            // map.fitBounds(bounds);
            // setMap(map);


    }, [filteredRestaurantList]);

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
            
        >
            
            {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item) => {
                        let num = filteredRestaurantList.indexOf(item)+1;
                        return (
                            
                            <div className="marker" key={item.place_id}>
                                <MarkerF
                                    position={item.geometry.location}
                                    title={item.name}
                                    onClick={() => {dispatch(setSelectedMarker(num))}}
                                    icon={{
                                        strokeColor: "#ffffff",
                                        strokeWeight: 3,
                                        // path: "m230.7 147.5c-8.7 67.5-70.6 122.4-93.3 175.8-3.2 7.5-13.5 7.4-16.7 0-24.4-57.5-94.3-116.7-94.3-191.5 0-57 46.4-103.1 103.5-102.7 61.9 0.5 108.7 57 100.8 118.4z",
                                        scaledSize: new window.google.maps.Size(30, 40),
                                        url: (`/marker${num}.png`),
                                        fillColor: "#003952",
                                        fillOpacity: 1.0,
                                    }}
                                />

                            </div>

                            
                        );
                    })}
        </GoogleMap>
        {selectedMarker && <RestaurantBox/>}
        
        </div>
    ) : (
        <></>
    );


}

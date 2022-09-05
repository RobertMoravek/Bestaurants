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
        googleMapsApiKey: "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow",
    });


    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        console.log(filteredRestaurantList);
        
        window.google && (function () {
            const bounds = new window.google.maps.LatLngBounds();

        filteredRestaurantList.length > 0 &&
            filteredRestaurantList.map((item) => {
                const latLng = new window.google.maps.LatLng(
                    item.geometry.location
                );
                bounds.extend(latLng);
                // console.log("bounds", bounds);
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
            
        >
            
            {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item, index) => {
                        console.log(selectedMarker, index+1, selectedMarker == index+1);

                            return (
                                <>
                                {index+1 == selectedMarker &&
                                    
                                        <MarkerF
                                            position={item.geometry.location}
                                            title="Test"
                                            onClick={() => {dispatch(setSelectedMarker(index+1))}}
                                            icon={{
                                                strokeColor: "#ffffff",
                                                strokeWeight: 3,
                                                scaledSize: new window.google.maps.Size(42, 56),
                                                url: (`/marker${index+1}.png`),
                                                fillColor: "#003952",
                                                fillOpacity: 1.0,
                                            }}
                                        />
                                    
                                
                                }

                                
                                    <MarkerF
                                        position={item.geometry.location}
                                        title={item.name}
                                        onClick={() => {dispatch(setSelectedMarker(index+1))}}
                                        icon={{
                                            strokeColor: "#ffffff",
                                            strokeWeight: 3,
                                            scaledSize: new window.google.maps.Size(30, 40),
                                            url: (`/marker${index+1}.png`),
                                            fillColor: "#003952",
                                            fillOpacity: 1.0,
                                        }}
                                    />

                                
                                </>
                                
                            );


                                

                        

                    })}
        </GoogleMap>
        {selectedMarker && <RestaurantBox/>}
        
        </div>
    ) : (
        <></>
    );


}

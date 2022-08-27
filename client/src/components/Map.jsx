import React from "react";
import { useMemo } from "react";
import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";


const containerStyle = {
    width: "100vw",
    height: "100vh",
};

const center = {
    lat: 52.000,
    lng: 13.300,
};


export default function Map() {

    const { filteredRestaurantList, mapView } = useSelector((state) => state.results);
    
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
        
    }, [filteredRestaurantList, mapView])

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
                            <>
                                <MarkerF
                                    position={item.geometry.location}
                                    title={item.name}
                                    onClick={(e) => console.log(e)}
                                    icon={{
                                        strokeColor: "#ffffff",
                                        strokeWeight: 3,
                                        path: "m230.7 147.5c-8.7 67.5-70.6 122.4-93.3 175.8-3.2 7.5-13.5 7.4-16.7 0-24.4-57.5-94.3-116.7-94.3-191.5 0-57 46.4-103.1 103.5-102.7 61.9 0.5 108.7 57 100.8 118.4z",
                                        fillColor: "#003952",
                                        fillOpacity: 1.0,
                                        scale: 0.15,
                                    }}
                                />
                                {/* <InfoWindowF
                                    position={item.geometry.location}
                                >
                                    <div>
                                        <h1>InfoWindow</h1>
                                    </div>
                                </InfoWindowF> */}
                            </>
                        );
                    })}
        </GoogleMap></div>
    ) : (
        <></>
    );


}

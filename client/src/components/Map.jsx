import React from "react";
import { useMemo } from "react";
import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    InfoWindowF,
    useJsApiLoader,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: 52.000,
    lng: 13.300,
};


export default function Home() {

    const { filteredRestaurantList } = useSelector((state) => state.results);
    
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
        
    }, [filteredRestaurantList])

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
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item) => {
                        let num = filteredRestaurantList.indexOf(item);
                        console.log(num);
                        return (
                            <>
                                <MarkerF
                                    position={item.geometry.location}
                                    title={num}
                                    label={num}
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
            <></>
        </GoogleMap>
    ) : (
        <></>
    );


}

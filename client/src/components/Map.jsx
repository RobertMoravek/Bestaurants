import React from "react";
import { useMemo } from "react";
import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    InfoWindowF,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

export default function Home() {
    console.log("Maps Component");
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}


function Map() {
    const center = useMemo(() => ({ lat: 52.5, lng: 13.4 }), []);

    const { filteredRestaurantList } = useSelector((state) => state.results);


    return (
        <>
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
            >
                {filteredRestaurantList.length > 0 &&
                    filteredRestaurantList.map((item) => {
                        return (
                            <>
                                <MarkerF
                                    position={item.geometry.location}
                                    title={item.name}
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
            </GoogleMap>
        </>
    );
}

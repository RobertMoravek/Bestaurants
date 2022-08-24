import React from "react";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

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

    return (
        <GoogleMap
            zoom={11}
            center={center}
            mapContainerClassName="map-container"
        >
            <MarkerF position={{ lat: 44, lng: -80 }} />
        </GoogleMap>
    );
}

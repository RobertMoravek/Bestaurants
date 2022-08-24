import { useMemo } from "react";


export default function Map() {
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return (
        <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
        >
            <Marker position={center} />
        </GoogleMap>
    );
}

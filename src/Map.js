import React, { useRef, useState, useEffect, useCallback } from 'react';

const Map = ({ style }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();
    const markerPos = marker?.getPosition();

    const onClick = useCallback((e) => {
        const position = e.latLng;
        const newMarker = new window.google.maps.Marker({ position, map });

        marker && marker.setMap(null);
        setMarker(newMarker);
    }, [map, marker]);

    useEffect(() => {
        if (ref.current && !map) {
            const mapInstance = new window.google.maps.Map(ref.current, {
                center: { lat: 47.0105, lng: 28.8638 },
                zoom: 14
            });
    
            navigator.geolocation?.getCurrentPosition(position => {
                const currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                const defaultMarker = new window.google.maps.Marker({
                    position: currentPosition,
                    map: mapInstance
                });

                mapInstance.setCenter(currentPosition);
                setMarker(defaultMarker);
            });
            
            setMap(mapInstance);
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            window.google.maps.event.clearListeners(map, 'click');
            map.addListener("click", onClick);
        }
    }, [map, onClick]);

    useEffect(() => {
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    return (
        <>
            <div ref={ref} style={style}></div>
            {marker && (
                <p>
                    lat: {markerPos.lat()}, lng: {markerPos.lng()}
                </p>
            )}
        </>
    );
};

export default Map;
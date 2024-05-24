import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef } from 'react';

const Map = ({ center }) => {
    const ref = useRef();

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            minZoom: 17,
            maxZoom: 18,
            zoom: 17,
            mapTypeControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
            streetViewControl: false,
        });

        new google.maps.Marker({
            position: center,
            map,
            title: "Hello World!",
        });
    });

    return <div ref={ref} id="map" />;
}

const Location = ({ coordinates }) => {

    return (
        <section className='location'>
            <h6>
                Localización de la incidencia
            </h6>

            <Wrapper apiKey={'AIzaSyDVtVe6rL5Jq-4Jsg3192pvi3IbRR-p8lY'}>
                <Map center={{ lat: parseFloat(coordinates.lat), lng: parseFloat(coordinates.lng) }} />
            </Wrapper>
        </section>
    );
}

export default Location;

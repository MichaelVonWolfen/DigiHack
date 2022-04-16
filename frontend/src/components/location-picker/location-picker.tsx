import { useEffect, useRef } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_MAPS_STYLE } from '../../common/google-maps-styles';

const GOOGLE_API_KEY = "AIzaSyByFU02ULot1qvCYYJcCs8EAFd_w7FZEjY";

export interface LocationPickerProps {
  setLocation: (lat: number, lng: number) => void;
}

export function LocationPicker(props: LocationPickerProps) {
  return (
    <>
      <Wrapper apiKey={GOOGLE_API_KEY}>
        <MapComponent
          initialPosition={{
            lat: 44.43, lng: 26.09
          }}
          zoom={15}
          setLocation={(lat: number, lng: number) => props.setLocation(lat, lng)}
        />
      </Wrapper>
    </>
  );
}

export interface MapComponentProps {
  initialPosition: google.maps.LatLngLiteral;
  zoom: number;
  setLocation: (lat: number, lng: number) => void
}

function MapComponent({ initialPosition, zoom, setLocation }: MapComponentProps) {
  const ref = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current!, {
      center: initialPosition,
      zoom: zoom,
      styles: GOOGLE_MAPS_STYLE
    });

    const marker = new google.maps.Marker({
      position: initialPosition,
      map,
      title: "Hello World!",
    });

    map.addListener('click', (e: any) => {
      marker.setPosition(e.latLng);
      setLocation(e.latLng.lat, e.latLng.lng);
    });
  });

  return <div ref={ref} id="map" style={{ height: 400, width: 400 }} />;
}

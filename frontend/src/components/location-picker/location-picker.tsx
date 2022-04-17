import { useEffect, useRef } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import { GOOGLE_MAPS_STYLE } from '../../common/google-maps-styles';
import { GeoCoordinates } from '../../common/animal-listing';

const GOOGLE_API_KEY = "AIzaSyByFU02ULot1qvCYYJcCs8EAFd_w7FZEjY";

export interface LocationPickerProps {
  setLocation: (lat: number, lng: number) => void;
  width: number;
  height: number;
  initialPosition: GeoCoordinates;
}

export function LocationPicker(props: LocationPickerProps) {
  return (
    <>
      <Wrapper apiKey={GOOGLE_API_KEY}>
        <MapComponent
          initialPosition={props.initialPosition}
          zoom={15}
          setLocation={(lat: any, lng: any) => props.setLocation(lat, lng)}
          width={props.width}
          height={props.height}
        />
      </Wrapper>
    </>
  );
}

export interface MapComponentProps {
  initialPosition: google.maps.LatLngLiteral;
  zoom: number;
  setLocation: (lat: () => number, lng: () => number) => void;
  width: number;
  height: number;
}

function MapComponent({ initialPosition, zoom, setLocation, width, height }: MapComponentProps) {
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
    setLocation(() => {
      return 0
    }, () => {
      return 0
    });
    map.addListener('click', (e: any) => {
      marker.setPosition(e.latLng);
      setLocation(e.latLng.lat(), e.latLng.lng());
    });
  });

  return <div ref={ref} id="map" style={{ height: height, width: width }} />;
}

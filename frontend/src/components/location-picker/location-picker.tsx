import { useState } from 'react'
import MapPicker from 'react-google-map-picker'


const GOOGLE_API_KEY = "AIzaSyByFU02ULot1qvCYYJcCs8EAFd_w7FZEjY";

export interface LocationPickerProps {
  setLocation: (lat: number, lng: number) => void;
}

export function LocationPicker(props: LocationPickerProps) {
  const [location, setLocation] = useState({ lat: 10, lng: 106 });
  const [zoom, setZoom] = useState<number>(15);

  function handleChangeLocation(lat: number, lng: number) {
    console.log(lat, lng);
    setLocation({ lat, lng });
    props.setLocation(lat, lng)
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  return (
    <>
      <MapPicker
        defaultLocation={location}
        zoom={zoom}
        style={{ height: "500px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={GOOGLE_API_KEY}
      />
    </>
  );
}

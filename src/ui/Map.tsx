import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import { Switch } from "@mantine/core";

import { env } from "../env/client.mjs";
import { useState } from "react";

const center = { lat: 52.52, lng: 13.405 };

export default function Map() {
  const [value, setValue] = useState(true);
  return (
    <>
      <Switch checked={value} onChange={() => setValue((v) => !v)} />
      <LoadScript googleMapsApiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={center}
          mapContainerClassName="w-[600px] h-[600px] mx-auto"
          zoom={14}
        >
          {value && <MarkerF position={center} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

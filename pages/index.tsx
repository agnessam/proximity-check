import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo } from "react";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  useEffect(() => {
    console.log(isLoaded);
  }, [isLoaded]);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        />
      )}
    </div>
  );
};

const IndexPage = () => {
  return <Map />;
};

export default IndexPage;

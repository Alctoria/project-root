import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ products, center }) => {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
        {products.map((product) => (
          <Marker
            key={product._id}
            position={{
              lat: product.location.coordinates[1],
              lng: product.location.coordinates[0],
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
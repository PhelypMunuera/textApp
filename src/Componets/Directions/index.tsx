import React from "react";
import MapViewDirections, { MapViewDirectionsProps } from "react-native-maps-directions";
import { LatLng } from "react-native-maps";

type DirectionProps = {
  destination: LatLng;
  origin: LatLng;
  onReady?: MapViewDirectionsProps["onReady"];
  apikey: string; 
};

const Direction: React.FC<DirectionProps> = ({ destination, origin, onReady, apikey }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey= "AIzaSyB8dZANe2f_Tu37jvyitU6DgI0FdiZPMEQ" 
    strokeWidth={3}
    strokeColor="#0B2934"
  />
);

export default Direction;

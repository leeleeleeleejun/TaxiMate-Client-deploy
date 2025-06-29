import {Location} from "@/types";

const toLocation = (coords: GeolocationCoordinates): Location => ({
  lat: coords.latitude,
  lng: coords.longitude,
})

export default toLocation;
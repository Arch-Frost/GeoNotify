import * as Location from "expo-location";

const BACKGROUND_LOCATION_TASK = "BACKGROUND-LOCATION-TASK";
const BACKGROUND_GEOFENCING_TASK = "BACKGROUND-GEOFENCING-TASK";

export async function requestLocationPermissionsAsync() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  console.log("Foreground permissions: ", status);
  if (status === "granted") {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    console.log("Background permissions: ", status);
    if (status === "granted") {
      return true;
    }
  }
  return false;
}

export function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export async function startLocationUpdatesAsync() {
  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.Highest,
  });
}

export async function stopLocationUpdatesAsync() {
  await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
}

export async function hasLocationUpdatesStartedAsync() {
  return await Location.hasStartedLocationUpdatesAsync(
    BACKGROUND_LOCATION_TASK
  );
}

export function getDistanceFromCoords(location1, location2) {
  const distance = getDistance(
    location1.latitude,
    location1.longitude,
    location2.latitude,
    location2.longitude
  );
  return distance;
}

export async function getDistanceFromCurrentLocationAsync(location) {
  const currentLocation = await Location.getCurrentPositionAsync();
  const distance = getDistance(currentLocation.coords.latitude, currentLocation.coords.longitude, location.latitude, location.longitude);
  return distance;
}

export async function addLocationToGeofenceAsync(locationId, location, radius) {
  await Location.startGeofencingAsync(BACKGROUND_GEOFENCING_TASK, [
    {
      identifier: locationId,
      latitude: location.latitude,
      longitude: location.longitude,
      radius: radius,
      notifyOnEnter: true,
      notifyOnExit: true,
    },
  ]);
  console.log("Started monitoring geofence for: ", locationId);
}

export async function removeLocationFromGeofenceAsync(locationId) {
  await Location.stopGeofencingAsync(BACKGROUND_GEOFENCING_TASK, [locationId]);
  console.log("Stopped monitoring geofence for: ", locationId);
}

export async function updateLocationInGeofenceAsync(
  locationId,
  location,
  radius
) {
  await removeLocationFromGeofenceAsync(locationId);
  await addLocationToGeofenceAsync(locationId, location, radius);
  console.log("Updated monitoring geofence for: ", locationId);
}

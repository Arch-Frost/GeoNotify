import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocationAsync = async () => {
    try {
      // Check if the location permission is granted
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      // Get the current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (e) {
      setError(e.message || 'Error while fetching location');
    }
  };

  useEffect(() => {
    // Fetch the location when the component mounts
    getLocationAsync();
  }, []);

  return { location, error };
};

export default useCurrentLocation;

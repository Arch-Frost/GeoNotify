import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function LocationMapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);

  const mapViewRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      // Handle permission denied case
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync();
    setLocation(currentLocation);
    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.00421,
      longitudeDelta: 0.00421,
    });
  };

  const centerMapOnUser = () => {
    if (location && region) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      mapViewRef.current.animateToRegion(newRegion, 2000);
    }
  };

  const handleSelectionButtonPress = () => {
    if (markerLocation) {
      console.log("Marker location:", markerLocation);
      // Perform any desired action with the marker location here
      navigation.goBack();
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
  };

  const isButtonDisabled = !markerLocation;

  return (
    <>
      <View style={styles.container}>
        {region && (
          <MapView
            ref={mapViewRef}
            style={styles.map}
            region={region}
            onPress={handleMapPress}
            showsUserLocation={true}
            showsMyLocationButton={false}
          >
            {markerLocation && <Marker coordinate={markerLocation} />}
          </MapView>
        )}

        <TouchableOpacity style={styles.fabContainer} onPress={centerMapOnUser}>
          <View style={styles.fabButton}>
            <MaterialIcons name="my-location" size={24} color="#008080" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.selectButton,
          isButtonDisabled && { backgroundColor: "gray" },
        ]}
        onPress={handleSelectionButtonPress}
        disabled={isButtonDisabled}
      >
        <Text style={styles.selectText}>SELECT THIS LOCATION</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    // overflow: "hidden",
  },
  fabButton: {
    backgroundColor: "#fff", // Teal
    width: 56,
    height: 56,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  selectButton: {
    backgroundColor: "#008080", // Teal
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  selectText: {
    fontSize: 14,
    color: "#fff",
  },
});

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import * as LocationUtils from "../utils/LocationManager";
import { MaterialIcons } from "@expo/vector-icons";

export default function LocationMapScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [region, setRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);

  const [locationNameModalVisible, setLocationNameModalVisible] =
    useState(false);

  const mapViewRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getPreviousScreenName = () => {
    const routes = navigation.getState().routes;
    const name = routes[routes.length - 2].name;

    return name;
  };

  const getLocation = async () => {
    if (!(await LocationUtils.requestLocationPermissionsAsync())) {
      alert("You must grant location permissions in order to use this feature");
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
      mapViewRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const handleSelectionButtonPress = () => {
    setLocationNameModalVisible(true);
  };

  const save = () => {
    if (markerLocation) {
      console.log("Marker location:", markerLocation);

      const previousScreenName = getPreviousScreenName();
      if (previousScreenName === "New Task") {
        navigation.navigate("New Task", {
          location: markerLocation,
          locationName: locationName,
        });
      } else if (previousScreenName === "Edit Task") {
        navigation.navigate("Edit Task", {
          location: markerLocation,
          locationName: locationName,
          task: route.params.task,
        });
      }
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
    setLocationName(
      "Location (" + coordinate.latitude + ", " + coordinate.longitude + ")"
    );
  };

  const handleOKButtonPress = () => {
    if (!locationName) {
      alert("Please enter a location name");
      return;
    }
    setLocationNameModalVisible(!locationNameModalVisible);
    save();
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
            showsPointsOfInterest={true}
            provider={PROVIDER_GOOGLE}
          >
            {markerLocation && (
              <Marker coordinate={markerLocation} title={locationName} />
            )}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={locationNameModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter a name for this location</Text>
            <TextInput
              style={styles.input}
              onChangeText={setLocationName}
              value={locationName}
              placeholder={"Location Name"}
            />
            <TouchableOpacity
              style={[
                styles.selectButton,
                {
                  marginTop: 10,
                  backgroundColor: "#008080",
                  width: "30%",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                },
              ]}
              onPress={handleOKButtonPress}
            >
              <Text style={styles.selectText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#008080",
    padding: 25,
    alignItems: "center",
    width: "90%",
    shadowColor: "#008080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#008080",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#008080",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000",
  },
});

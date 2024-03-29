import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import * as Location from "expo-location";
import { clearBadgeCount } from "../utils/NotificationManager";
import {
  getDistanceFromCoords,
  hasLocationUpdatesStartedAsync,
  startLocationUpdatesAsync,
  startAllRegisteredGeofencesAsync,
} from "../utils/LocationManager";

const auth = getAuth();
const db = getFirestore();

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const user = useAuthentication();

  // const tasks = [
  //   {
  //     id: "1",
  //     name: "Task 1",
  //     details: "Task 1 Details",
  //     location: "Location 1",
  //     distance: "2 km",
  //   },
  //   {
  //     id: "2",
  //     name: "Buy Bread",
  //     details: "Task 2 Details",
  //     location: "Location 2",
  //     distance: "5 km",
  //   },
  //   {
  //     id: "3",
  //     name: "Buy Milk",
  //     details: "Task 3 Details",
  //     location: "Location 3",
  //     distance: "5 km",
  //   },
  //   {
  //     id: "4",
  //     name: "Buy Gift",
  //     details: "Task 4 Details",
  //     location: "Location 4",
  //     distance: "5 km",
  //   },
  //   {
  //     id: "5",
  //     name: "Buy Markers",
  //     details: "Task 5 Details",
  //     location: "Location 5",
  //     distance: "5 km",
  //   },
  //   {
  //     id: "6",
  //     name: "Buy Paint",
  //     details: "Task 6 Details",
  //     location: "Location 6",
  //     distance: "5 km",
  //   },
  //   {
  //     id: "7",
  //     name: "Buy Paper",
  //     details: "Task 7 Details",
  //     location: "Location 7",
  //     distance: "5 km",
  //   },
  //   // Add more tasks here
  // ];

  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        const tasks = [];
        const query = collection(db, "users", auth.currentUser.uid, "tasks");
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
          tasks.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasks);
      };

      const fetchCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location);
      };

      const startLocationUpdates = async () => {
        if (!(await hasLocationUpdatesStartedAsync())) {
          await startLocationUpdatesAsync();
        }
      };

      fetchTasks();
      clearBadgeCount();
      fetchCurrentLocation();
      startLocationUpdates();
    }, [])
  );

  useEffect(() => {
    const startGeofences = async () => {
      await startAllRegisteredGeofencesAsync()
        .then(() => {
          console.log("Started monitoring all geofences");
        })
        .catch((err) => {
          console.log("Error starting geofences: ", err.message);
        });
    };
    startGeofences();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length === 0) {
      setIsSearching(false);
      setFilteredTasks([]);
      return;
    }
    setIsSearching(true);

    const filtered = tasks.filter((task) => {
      return task.taskName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredTasks(filtered);
  };

  const handleItemSelection = (item) => {
    setSelectedTask(item);
    // console.log(item);
    // Pass the selected task to the next screen
    navigation.navigate("Task Details", { task: item });
    // navigation.navigate("Task Details");
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskContainer]}
      onPress={() => {
        handleItemSelection(item);
      }}
    >
      <MaterialIcons name="location-on" size={34} color="red" />
      <View style={styles.taskDetails}>
        <Text style={styles.taskName}>{item.taskName}</Text>
        <Text style={styles.taskLocation}>{item.locationName}</Text>
      </View>
      <Text style={styles.taskDistance}>
        {convertDistanceToDisplay(
          Math.floor(
            getDistanceFromCoords(
              {
                latitude: item.location?.latitude,
                longitude: item.location?.longitude,
              },
              {
                latitude: currentLocation?.coords.latitude,
                longitude: currentLocation?.coords.longitude,
              }
            )
          )
        )}
      </Text>
    </TouchableOpacity>
  );

  const addTask = () => {
    navigation.navigate("New Task");
  };

  const convertDistanceToDisplay = (distance) => {
    if (distance < 1000) {
      return `${distance} m`;
    } else {
      return `${(distance / 1000).toFixed(1)} km`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {user?.displayName}!</Text>
      <TouchableOpacity style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder={"Search Tasks"}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <MaterialIcons
          name={isSearching ? "close" : "search"}
          size={24}
          color="#008080"
          onPress={() => {
            setIsSearching(false);
            setSearchQuery("");
            setFilteredTasks([]);
          }}
        />
      </TouchableOpacity>

      <FlatList
        style={{ flex: 1, borderRadius: 10, overflow: "hidden" }}
        data={isSearching ? filteredTasks : tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity style={styles.fabContainer} onPress={addTask}>
        <View style={styles.fabButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    // marginTop: 30,
    backgroundColor: "#fff",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  selectedTaskContainer: {
    backgroundColor: "#008080", // Teal
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderColor: "#008080", // Teal
    borderWidth: 2,
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 4,
    color: "#000",
  },
  taskDetails: {
    flex: 1,
    marginLeft: 8,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Gray
  },
  taskLocation: {
    fontSize: 14,
    color: "#000", // Gray
  },
  taskDistance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3", // Light Gray
    marginVertical: 4,
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    // overflow: "hidden",
  },
  fabButton: {
    backgroundColor: "#008080", // Teal
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
    textAlign: "center",
    padding: 10,
  },
});

export default HomeScreen;

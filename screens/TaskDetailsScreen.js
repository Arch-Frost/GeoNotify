import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TaskDetailsScreen = ({ navigation }) => {
  const [status, setStatus] = useState("Pending"); // ['Pending', 'Completed']
  const [buttonText, setButtonText] = useState("Mark as Completed"); // ['Mark as Completed', 'Mark as Pending']

  const handleStatusChange = () => {
    // Handle changing the task status
    if (status === "Pending") {
      setStatus("Completed");
      setButtonText("Reset");
    } else {
      setStatus("Pending");
      setButtonText("Mark as Completed");
    }
  };

  const handleEditTask = () => {
    navigation.navigate("Edit Task");
  }

  const handleDeleteTask = () => {
    // Handle deleting the task
    navigation.goBack();
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <>
    <View style={{height: 40, backgroundColor: '#ebca5c'}} />
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/placeholder-image.png")}
        style={styles.image}
      >
        <View
          style={styles.imageOverlay}
        >
          <View style={{flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",}}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialIcons name="arrow-back" size={30} color="#008080" />
            {/* <Text style={{ color: "#008080", paddingHorizontal: 8 }}>Back</Text> */}
          </TouchableOpacity>
          <Text style={{ color: "#008080", paddingHorizontal: 8, fontSize: 18, fontWeight: 'bold' }}>Task Details</Text>
          </View>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            
          }}>
            <TouchableOpacity
              onPress={handleEditTask}
              style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
            >
              <MaterialIcons name="edit" size={30} color="#008080" />
              {/* <Text style={{ color: "#008080", paddingHorizontal: 8 }}>Edit</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteTask}
              style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}
            >
              <MaterialIcons name="delete" size={30} color="#008080" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        
        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="description" size={24} color="#008080" style={styles.rowIcon} />
            <Text style={styles.infoText}>Pick up bread from the store</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="place" size={28} color="#008080" style={styles.rowIcon} />
            <View>
              <Text style={styles.infoText}>Within 75 m</Text>
              <Text style={[styles.infoText, {fontSize: 18}]}>Grocery Store</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="access-time" size={28} color="#008080" style={styles.rowIcon} />
            <View>
            <Text style={styles.infoText}>Anytime during the day</Text>
            <Text style={[styles.infoText, {fontSize: 18}]}>Monday, July 10 - present</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="alarm" size={28} color="#008080" style={styles.rowIcon} />
            <Text style={styles.infoText}>Alarm is on</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="repeat" size={28} color="#008080" style={styles.rowIcon} />
            <Text style={styles.infoText}>Does not repeat</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialIcons name="info-outline" size={28} color="#008080" style={styles.rowIcon} />
            <Text style={styles.infoText}>{status}</Text>
          </View>
        </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={handleStatusChange}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#D3D3D3',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
    padding: 16,
    paddingTop: 30,
  },
  section: {
    paddingBottom: 20,
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#008080", // Teal
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    paddingRight: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
    // textAlign: "center",
  },
  button: {
    backgroundColor: "#008080", // Teal
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TaskDetailsScreen;
